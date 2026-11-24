"use client"

import {
  CheckIcon,
  CopyIcon,
  NfcIcon,
  QrCodeIcon,
  ShareIcon,
} from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { encode } from "uqr"

import { SITE_INFO } from "@/config/site"
import { useSound } from "@/hooks/use-sound"
import { CLICK_SOFT_SOUND } from "@/lib/sounds"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Kbd } from "./ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

/**
 * Minimal typings for the Web NFC API. It only ships in Chrome on Android
 * (89+), so it is not part of the standard DOM lib yet.
 * https://developer.mozilla.org/en-US/docs/Web/API/NDEFReader
 */
type NDEFRecordInit = { recordType: string; data?: string }
type NDEFWriter = {
  write(
    message: { records: NDEFRecordInit[] },
    options?: { overwrite?: boolean; signal?: AbortSignal }
  ): Promise<void>
}
type NDEFReaderConstructor = new () => NDEFWriter

function getNDEFReader(): NDEFReaderConstructor | null {
  if (typeof window === "undefined") return null
  const ctor = (window as unknown as { NDEFReader?: NDEFReaderConstructor })
    .NDEFReader
  return ctor ?? null
}

type NfcState = "idle" | "waiting" | "written" | "error"

const SHARE_URL = SITE_INFO.url

export function ShareQr() {
  const [open, setOpen] = useState(false)
  const playClick = useSound(CLICK_SOFT_SOUND)

  const toggle = useCallback(() => {
    playClick(0.5)
    setOpen((v) => !v)
  }, [playClick])

  useHotkeys("s", toggle)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggle}>
            <QrCodeIcon className="relative after:absolute after:-inset-2" />
            <span className="sr-only">Share</span>
          </Button>
        </TooltipTrigger>

        <TooltipContent className="pr-2 pl-3">
          <div className="flex items-center gap-3">
            Share
            <Kbd>S</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="gap-5 p-5 sm:max-w-xs">
        <DialogHeader className="pr-6 text-left">
          <DialogTitle className="text-base">Share portfolio</DialogTitle>
          <DialogDescription>Scan to open on another device.</DialogDescription>
        </DialogHeader>

        {/* Always dark-on-light: inverted QR codes trip up some scanners. */}
        <div className="mx-auto w-full max-w-60 rounded-xl bg-[#f7f4ee] p-3 ring-1 ring-border">
          <QrSvg value={SHARE_URL} className="aspect-square w-full" />
        </div>

        <ShareActions url={SHARE_URL} />
      </DialogContent>
    </Dialog>
  )
}

function QrSvg({ value, className }: { value: string; className?: string }) {
  const { size, path } = useMemo(() => {
    const qr = encode(value, { ecc: "M", border: 0 })
    let d = ""
    qr.data.forEach((row, y) => {
      row.forEach((on, x) => {
        if (on) d += `M${x} ${y}h1v1h-1z`
      })
    })
    return { size: qr.size, path: d }
  }, [value])

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`QR code for ${value}`}
    >
      <path d={path} fill="#141210" />
    </svg>
  )
}

function ShareActions({ url }: { url: string }) {
  // Only ever rendered inside the open dialog (client-side, never SSR'd), so
  // feature detection can run in lazy initializers without hydration issues.
  const [canShare] = useState(
    () => typeof navigator !== "undefined" && "share" in navigator
  )
  const [canNfc] = useState(() => getNDEFReader() !== null)
  const [copied, setCopied] = useState(false)
  const [nfcState, setNfcState] = useState<NfcState>("idle")
  const [nfcError, setNfcError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  // The dialog unmounts this on close: stop waiting for a tag.
  useEffect(() => () => abortRef.current?.abort(), [])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be blocked (e.g. insecure context); nothing to do.
    }
  }, [url])

  const share = useCallback(async () => {
    try {
      await navigator.share({ title: SITE_INFO.name, url })
    } catch {
      // User dismissed the share sheet.
    }
  }, [url])

  const writeNfc = useCallback(async () => {
    const NDEFReader = getNDEFReader()
    if (!NDEFReader) return

    if (nfcState === "waiting") {
      abortRef.current?.abort()
      abortRef.current = null
      setNfcState("idle")
      return
    }

    const controller = new AbortController()
    abortRef.current = controller
    setNfcError(null)
    setNfcState("waiting")

    try {
      await new NDEFReader().write(
        { records: [{ recordType: "url", data: url }] },
        { signal: controller.signal }
      )
      setNfcState("written")
      setTimeout(() => setNfcState("idle"), 2500)
    } catch (err) {
      if (controller.signal.aborted) return
      const name = err instanceof DOMException ? err.name : ""
      setNfcError(
        name === "NotAllowedError"
          ? "NFC permission was denied."
          : name === "NotSupportedError"
            ? "NFC is turned off or unavailable on this device."
            : "Couldn't write to the tag. Try again."
      )
      setNfcState("error")
    } finally {
      if (abortRef.current === controller) abortRef.current = null
    }
  }, [nfcState, url])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 rounded-lg border border-edge py-1 pr-1 pl-3">
        <span className="flex-1 truncate font-mono text-sm text-muted-foreground">
          {url.replace(/^https?:\/\//, "")}
        </span>
        <Button
          size="icon-sm"
          variant="secondary"
          onClick={copy}
          aria-label="Copy link"
        >
          {copied ? (
            <CheckIcon className="size-3.5" strokeWidth={3} />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </Button>
      </div>

      {(canShare || canNfc) && (
        <div className={cn("grid gap-2", canShare && canNfc && "grid-cols-2")}>
          {canShare && (
            <Button variant="secondary" onClick={share}>
              <ShareIcon />
              Share…
            </Button>
          )}
          {canNfc && (
            <Button
              variant="secondary"
              onClick={writeNfc}
              aria-pressed={nfcState === "waiting"}
            >
              <NfcIcon
                className={cn(nfcState === "waiting" && "animate-pulse")}
              />
              {nfcState === "waiting"
                ? "Cancel"
                : nfcState === "written"
                  ? "Written!"
                  : "NFC tag"}
            </Button>
          )}
        </div>
      )}

      {canNfc && nfcState === "waiting" && (
        <p className="text-center text-xs text-muted-foreground">
          Hold an NFC tag or card to the back of your phone. Anyone who taps it
          later will open this link.
        </p>
      )}
      {canNfc && nfcState === "error" && nfcError && (
        <p className="text-center text-xs text-destructive">{nfcError}</p>
      )}
    </div>
  )
}
