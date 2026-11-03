import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { createTransformationRoute, dropShape, type Box, type RouteGeometry } from './transformationRouteGeometry';
import styles from './Portfolio.module.css';

type Props = { stage: RefObject<HTMLDivElement | null>; cards: RefObject<(HTMLElement | null)[]>; onReveal: (index: number) => void };
type Measured = { path: SVGPathElement; length: number; start: number; end: number; kind: 'inside' | 'outside'; card?: number };

export default function TransformationRoute({ stage, cards, onReveal }: Props) {
  const maskId = `transformation-${useId().replace(/:/g, '')}`;
  const [route, setRoute] = useState<RouteGeometry | null>(null);
  const geometry = useRef<(SVGPathElement | null)[]>([]);
  const measured = useRef<Measured[]>([]);
  const marker = useRef<SVGGElement>(null);
  const revealed = useRef(new Set<number>());
  const reduced = useReducedMotion();
  const shape = useMotionValue(dropShape(13, 0));
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start 85%', 'end 85%'] });

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || cards.current.some(card => !card)) return;
      const relativeBox = (target: Element): Box => {
        const box = target.getBoundingClientRect();
        return { x: box.left - bounds.left, y: box.top - bounds.top, width: box.width, height: box.height, radius: parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0 };
      };
      const screens = cards.current.map(card => relativeBox(card!.querySelector(`.${styles.screen}`)!));
      const captions = cards.current.map(card => relativeBox(card!.querySelector('figcaption')!));
      const compact = getComputedStyle(element).gridTemplateColumns.split(' ').length > 3;
      setRoute(createTransformationRoute(bounds.width, bounds.height, screens, captions, compact));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    cards.current.forEach(card => { if (card) observer.observe(card); });
    measure();
    return () => observer.disconnect();
  }, [cards, stage]);

  const follow = useCallback((progress: number) => {
    if (!route || !measured.current.length) return;
    const segments = measured.current;
    const total = segments[segments.length - 1].end;
    const distance = Math.max(0, Math.min(1, progress)) * total;
    const segment = segments.find(part => distance <= part.end) || segments[segments.length - 1];
    const local = Math.max(0, Math.min(segment.length, distance - segment.start));
    const point = segment.path.getPointAtLength(local);
    const before = segment.path.getPointAtLength(Math.max(0, local - .5));
    const after = segment.path.getPointAtLength(Math.min(segment.length, local + .5));
    const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
    const zone = route.radius * 2.5;
    let nearest = Infinity;
    let phase = 'outside';
    for (const part of segments) {
      if (part.kind !== 'inside') continue;
      const entryDistance = Math.abs(distance - part.start), exitDistance = Math.abs(distance - part.end);
      if (Math.min(entryDistance, exitDistance) < nearest) {
        nearest = Math.min(entryDistance, exitDistance);
        phase = nearest < zone ? (entryDistance < exitDistance ? 'entry' : 'exit') : 'outside';
      }
      if (distance >= part.start && !revealed.current.has(part.card!)) {
        revealed.current.add(part.card!); onReveal(part.card!);
      }
    }
    const t = Math.max(0, 1 - nearest / zone);
    const deformation = t * t * (3 - 2 * t);
    // No timers or springs: reversing scroll retraces exactly the same geometry and shape.
    shape.set(dropShape(route.radius, reduced ? 0 : deformation));
    marker.current?.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
    marker.current?.setAttribute('data-phase', segment.kind === 'inside' && nearest > zone ? 'inside' : phase);
    marker.current?.setAttribute('visibility', reduced || (segment.kind === 'inside' && nearest > zone) ? 'hidden' : 'visible');
  }, [route, reduced, shape, onReveal]);

  useLayoutEffect(() => {
    let length = 0;
    measured.current = (route?.segments || []).map((segment, index) => {
      const path = geometry.current[index]!;
      const size = path.getTotalLength(), start = length;
      length += size;
      return { path, length: size, start, end: length, kind: segment.kind, card: segment.card };
    });
    follow(reduced ? 1 : scrollYProgress.get());
  }, [route, reduced, follow, scrollYProgress]);
  useMotionValueEvent(scrollYProgress, 'change', value => follow(reduced ? 1 : value));
  if (!route) return null;

  return <svg className={styles.route} viewBox={`0 0 ${route.width} ${route.height}`} aria-hidden="true" focusable="false">
    <defs>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={route.width} height={route.height} style={{ maskType: 'luminance' }}>
        <rect width={route.width} height={route.height} fill="white"/>
        {route.screens.map((box, index) => <rect key={`screen-${index}`} x={box.x} y={box.y} width={box.width} height={box.height} rx={box.radius} fill="black"/>)}
        {route.captions.map((box, index) => <rect key={`caption-${index}`} x={box.x - 8} y={box.y - 8} width={box.width + 16} height={box.height + 16} fill="black"/>)}
      </mask>
    </defs>
    <g mask={`url(#${maskId})`}>
      {route.segments.map((segment, index) => <path key={index} d={segment.d} className={styles.routeLine} data-route-kind={segment.kind}
        visibility={segment.kind === 'inside' ? 'hidden' : undefined} ref={element => { geometry.current[index] = element; }}/>) }
      <circle className={styles.endpoint} cx={route.start.x} cy={route.start.y} r={route.radius + 3}/>
      <circle className={styles.endpoint} cx={route.end.x} cy={route.end.y} r={route.radius * .65}/>
      <g ref={marker} data-route-marker="true"><motion.path className={styles.marker} d={shape}/></g>
    </g>
  </svg>;
}
