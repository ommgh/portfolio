/**
 * Pulli kolam generator.
 *
 * A kolam is the line drawing made on South Indian thresholds at dawn: a grid of
 * dots (pulli) with a looping stroke (suzhi) drawn around them. The traditional
 * form obeys four rules, and this generator is built so that all four hold by
 * construction rather than by luck:
 *
 *   1. every orbit is closed
 *   2. every dot is encircled
 *   3. no two lines overlap over any finite length
 *   4. lines never bend at a right angle
 *
 * The construction is an arc-tile weave. Each cell of a square grid carries two
 * quarter-arcs of radius `cell / 2`, centred on opposite corners of the cell, in
 * one of two orientations:
 *
 *      type A              type B
 *      ╭───  ·               ·  ───╮
 *      │                           │
 *      ·   ───╮            ╭───   ·
 *
 * Arcs always meet at the midpoint of a cell edge, and every edge midpoint is
 * shared by exactly two cells, so each one is the junction of exactly two arcs.
 * A graph in which every node has degree two decomposes into disjoint cycles —
 * which is rule 1. Because every arc is centred on a lattice point, the stroke
 * always passes around the dots rather than through them (rule 2). Arcs meet
 * edge midpoints perpendicular to the edge, so a junction joins two arcs that
 * share a tangent — the curve stays smooth (rule 4) and never doubles back
 * along itself (rule 3).
 *
 * At the perimeter an edge midpoint would have only one adjacent cell, leaving a
 * loose end. Those are paired off with outward semicircles, which both closes
 * the orbits and produces the scalloped border a bordered kolam actually has.
 *
 * Tile orientation is drawn from a seeded hash mirrored across both axes, so the
 * result is twofold symmetric in each direction — kolams are symmetric — and
 * identical on server and client, which keeps it free of hydration mismatch.
 */

export interface KolamArc {
  /** Index of the node this arc starts at. */
  from: number
  /** Index of the node this arc ends at. */
  to: number
  cx: number
  cy: number
  radius: number
  /** SVG sweep-flag for traversal in the `from -> to` direction. */
  sweep: 0 | 1
}

export interface KolamLoop {
  /** `d` attribute for one closed orbit. */
  d: string
  /** Exact arc length, summed analytically so no DOM measurement is needed. */
  length: number
}

export interface KolamPoint {
  x: number
  y: number
}

export interface Kolam {
  loops: KolamLoop[]
  /** The pulli — the dot grid the stroke is drawn around. */
  dots: KolamPoint[]
  viewBox: string
  width: number
  height: number
}

export interface KolamOptions {
  /** Cells across. Rounded up to an even number so the border pairs off evenly. */
  cols?: number
  /** Cells down. Rounded up to an even number. */
  rows?: number
  /** Cell side in user units. */
  cell?: number
  /** Any string — the same seed always yields the same kolam. */
  seed?: string
}

/** FNV-1a, so tile choice is stable across server and client. */
function hash(seed: string, i: number, j: number): number {
  let h = 0x811c9dc5
  const key = `${seed}:${i}:${j}`

  for (let k = 0; k < key.length; k++) {
    h ^= key.charCodeAt(k)
    h = Math.imul(h, 0x01000193)
  }

  return (h >>> 0) / 0xffffffff
}

export function generateKolam({
  cols = 12,
  rows = 6,
  cell = 24,
  seed = "kolam",
}: KolamOptions = {}): Kolam {
  // Even counts let every perimeter midpoint find a partner.
  const nx = Math.max(2, Math.ceil(cols / 2) * 2)
  const ny = Math.max(2, Math.ceil(rows / 2) * 2)
  const r = cell / 2

  const nodes: KolamPoint[] = []
  const nodeIndex = new Map<string, number>()

  const nodeAt = (kind: "h" | "v", i: number, j: number): number => {
    const key = `${kind}:${i}:${j}`
    const existing = nodeIndex.get(key)
    if (existing !== undefined) return existing

    // Horizontal edges carry their midpoint half a cell along x, vertical along y.
    const point =
      kind === "h"
        ? { x: i * cell + r, y: j * cell }
        : { x: i * cell, y: j * cell + r }

    const index = nodes.length
    nodes.push(point)
    nodeIndex.set(key, index)
    return index
  }

  const arcs: KolamArc[] = []

  /**
   * Sweep flag for an arc from `p` to `q` about `c`. SVG's y axis points down,
   * so a positive cross product is a clockwise turn on screen, which is
   * sweep-flag 1. Only used for quarter-arcs, where the two radii are never
   * collinear; the semicircular border caps pass their sweep in explicitly.
   */
  const sweepFor = (p: KolamPoint, q: KolamPoint, c: KolamPoint): 0 | 1 => {
    const cross = (p.x - c.x) * (q.y - c.y) - (p.y - c.y) * (q.x - c.x)
    return cross > 0 ? 1 : 0
  }

  const addArc = (
    from: number,
    to: number,
    cx: number,
    cy: number,
    radius: number,
    sweep?: 0 | 1
  ) => {
    arcs.push({
      from,
      to,
      cx,
      cy,
      radius,
      sweep: sweep ?? sweepFor(nodes[from]!, nodes[to]!, { x: cx, y: cy }),
    })
  }

  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const top = nodeAt("h", i, j)
      const bottom = nodeAt("h", i, j + 1)
      const left = nodeAt("v", i, j)
      const right = nodeAt("v", i + 1, j)

      // Mirror one quadrant's hash outward. A mirror swaps the two tile
      // orientations, so an odd number of mirrors flips the tile.
      const qi = Math.min(i, nx - 1 - i)
      const qj = Math.min(j, ny - 1 - j)
      const mirrored = i >= nx / 2 !== j >= ny / 2
      const typeA = hash(seed, qi, qj) < 0.5 !== mirrored

      if (typeA) {
        // Arcs about the top-left and bottom-right corners.
        addArc(top, left, i * cell, j * cell, r)
        addArc(bottom, right, (i + 1) * cell, (j + 1) * cell, r)
      } else {
        // Arcs about the top-right and bottom-left corners.
        addArc(top, right, (i + 1) * cell, j * cell, r)
        addArc(bottom, left, i * cell, (j + 1) * cell, r)
      }
    }
  }

  // Close the perimeter with outward semicircles — the scalloped kolam border.
  for (let k = 0; k < nx; k += 2) {
    addArc(
      nodeAt("h", k, 0),
      nodeAt("h", k + 1, 0),
      (k + 1) * cell,
      0,
      r,
      1 // bulges up, above the grid
    )
    addArc(
      nodeAt("h", k, ny),
      nodeAt("h", k + 1, ny),
      (k + 1) * cell,
      ny * cell,
      r,
      0 // bulges down
    )
  }

  for (let k = 0; k < ny; k += 2) {
    addArc(
      nodeAt("v", 0, k),
      nodeAt("v", 0, k + 1),
      0,
      (k + 1) * cell,
      r,
      0 // bulges left
    )
    addArc(
      nodeAt("v", nx, k),
      nodeAt("v", nx, k + 1),
      nx * cell,
      (k + 1) * cell,
      r,
      1 // bulges right
    )
  }

  // Every node now has degree two, so walking the graph peels off closed cycles.
  const incident: number[][] = nodes.map(() => [])
  arcs.forEach((arc, index) => {
    incident[arc.from]!.push(index)
    incident[arc.to]!.push(index)
  })

  const used = new Array<boolean>(arcs.length).fill(false)
  const loops: KolamLoop[] = []

  for (let start = 0; start < arcs.length; start++) {
    if (used[start]) continue

    const first = arcs[start]!
    let node = first.from
    let arcIndex: number | undefined = start
    let length = 0
    let d = `M ${round(nodes[node]!.x)} ${round(nodes[node]!.y)}`

    while (arcIndex !== undefined && !used[arcIndex]) {
      const arc = arcs[arcIndex]!
      used[arcIndex] = true

      const forward = arc.from === node
      const next = forward ? arc.to : arc.from
      const sweep = forward ? arc.sweep : ((1 - arc.sweep) as 0 | 1)
      const end = nodes[next]!

      d += ` A ${round(arc.radius)} ${round(arc.radius)} 0 0 ${sweep} ${round(end.x)} ${round(end.y)}`
      length += arcLength(arc, nodes)

      node = next
      arcIndex = incident[node]!.find((candidate) => !used[candidate])
    }

    loops.push({ d: `${d} Z`, length })
  }

  // Pulli sit on the lattice points, which are exactly the arc centres.
  const dots: KolamPoint[] = []
  for (let j = 0; j <= ny; j++) {
    for (let i = 0; i <= nx; i++) {
      dots.push({ x: i * cell, y: j * cell })
    }
  }

  const width = nx * cell
  const height = ny * cell

  return {
    loops,
    dots,
    // Pad by r so the border scallops stay inside the frame.
    viewBox: `${-r} ${-r} ${width + cell} ${height + cell}`,
    width: width + cell,
    height: height + cell,
  }
}

/** Arc length from the central angle between the two radii. */
function arcLength(arc: KolamArc, nodes: KolamPoint[]): number {
  const p = nodes[arc.from]!
  const q = nodes[arc.to]!
  const a1 = Math.atan2(p.y - arc.cy, p.x - arc.cx)
  const a2 = Math.atan2(q.y - arc.cy, q.x - arc.cx)
  let delta = Math.abs(a2 - a1)

  if (delta > Math.PI) delta = 2 * Math.PI - delta
  // Diametrically opposite endpoints are the semicircular border caps.
  if (delta < 1e-9) delta = Math.PI

  return delta * arc.radius
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}
