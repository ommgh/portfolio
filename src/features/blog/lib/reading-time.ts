/**
 * Rough reading time for a post body.
 *
 * 200 wpm is the usual figure for technical prose. Code blocks are scanned
 * rather than read word by word, so they are stripped out before counting and
 * charged a flat few seconds per block instead — counting them as prose badly
 * overstates long listings.
 */
const WORDS_PER_MINUTE = 200
const SECONDS_PER_CODE_BLOCK = 12

export function getReadingTime(content: string): number {
  const codeBlocks = content.match(/```[\s\S]*?```/g) ?? []

  const prose = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_~`>[\]()]/g, " ")

  const words = prose.split(/\s+/).filter(Boolean).length
  const minutes =
    words / WORDS_PER_MINUTE + (codeBlocks.length * SECONDS_PER_CODE_BLOCK) / 60

  return Math.max(1, Math.round(minutes))
}
