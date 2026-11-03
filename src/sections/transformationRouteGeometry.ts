export type Point = { x: number; y: number };
export type Box = { x: number; y: number; width: number; height: number; radius: number };
export type RouteSegment = { d: string; kind: 'outside' | 'inside'; card?: number };
export type RouteGeometry = { width: number; height: number; screens: Box[]; captions: Box[]; segments: RouteSegment[]; start: Point; end: Point; radius: number };
const point = (p: Point) => `${p.x} ${p.y}`;
const cubic = (a: Point, b: Point, c: Point, d: Point) => `M${point(a)} C${point(b)} ${point(c)} ${point(d)}`;

// Coordinates come from the actual screens; the vertical layout uses its own corridors.
export function createTransformationRoute(width: number, height: number, screens: Box[], captions: Box[], compact: boolean): RouteGeometry {
  const [a, b, c] = screens;
  const left = Math.max(7, Math.min(...screens.map(s => s.x)) * .32);
  const right = width - Math.max(7, (width - Math.max(...screens.map(s => s.x + s.width))) * .32);
  const start = { x: left + 8, y: 20 };
  const end = { x: right - 5, y: height - 62 };
  const entry = [
    { x: a.x, y: a.y + a.height * .55 },
    { x: b.x + b.width * .48, y: b.y },
    { x: c.x, y: c.y + c.height * .48 },
  ];
  const exit = [
    { x: a.x + a.width, y: a.y + a.height * .24 },
    { x: b.x + b.width, y: b.y + b.height * .88 },
    { x: c.x + c.width, y: c.y + c.height * .8 },
  ];
  const outside: string[] = [];
  outside.push(cubic(start, { x: left, y: a.y + a.height * .12 }, { x: left, y: entry[0].y }, entry[0]));
  if (compact) {
    const turnY = captions[0].y + captions[0].height + (b.y - captions[0].y - captions[0].height) * .45;
    outside.push(`M${point(exit[0])} C${right} ${exit[0].y}, ${right} ${turnY - 30}, ${right} ${turnY} S${entry[1].x} ${turnY}, ${point(entry[1])}`);
    const betweenY = captions[1].y + captions[1].height + (c.y - captions[1].y - captions[1].height) * .45;
    outside.push(`M${point(exit[1])} C${right} ${exit[1].y}, ${right} ${betweenY}, ${width * .5} ${betweenY} S${left} ${betweenY}, ${left} ${entry[2].y - 30} Q${left} ${entry[2].y}, ${point(entry[2])}`);
  } else {
    const gap = b.x - a.x - a.width;
    outside.push(cubic(exit[0], { x: exit[0].x + gap * .8, y: exit[0].y }, { x: entry[1].x, y: Math.min(exit[0].y, b.y) - Math.min(100, a.height * .2) }, entry[1]));
    const corridor = b.x + b.width + (c.x - b.x - b.width) * .5;
    outside.push(cubic(exit[1], { x: corridor, y: exit[1].y }, { x: corridor, y: entry[2].y }, entry[2]));
  }
  outside.push(cubic(exit[2], { x: right, y: exit[2].y }, { x: right, y: end.y - 70 }, end));
  const segments: RouteSegment[] = [];
  screens.forEach((screen, index) => {
    segments.push({ d: outside[index], kind: 'outside' });
    const from = entry[index], to = exit[index];
    segments.push({ kind: 'inside', card: index, d: index === 1
      ? cubic(from, { x: from.x, y: from.y + screen.height * .32 }, { x: to.x - screen.width * .3, y: to.y }, to)
      : cubic(from, { x: from.x + screen.width * .35, y: from.y }, { x: to.x - screen.width * .35, y: to.y }, to) });
  });
  segments.push({ d: outside[3], kind: 'outside' });
  return { width, height, screens, captions, segments, start, end, radius: compact ? 11 : 13 };
}

// Four cubic arcs interpolate a circle into a pointed, stretched drop.
// Its tip follows the path tangent; clipping at the card edge performs the absorption.
export function dropShape(radius: number, amount: number): string {
  const k = .55228475, stretch = 1 + amount * .65;
  const front = radius * stretch, back = -radius * (1 - amount * .12), side = radius * (1 - amount * .2);
  const tipHandle = side * k * (1 - amount * .95);
  return `M${front} 0 C${front} ${tipHandle} ${radius * k} ${side} 0 ${side} C${back * k} ${side} ${back} ${side * k} ${back} 0 C${back} ${-side * k} ${back * k} ${-side} 0 ${-side} C${radius * k} ${-side} ${front} ${-tipHandle} ${front} 0Z`;
}
