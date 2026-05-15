type Props = {
  smile: boolean;
  className?: string;
};

const BORDER: ReadonlyArray<readonly [number, number]> = [
  [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
  [1, 1], [7, 1],
  [0, 2], [8, 2],
  [0, 3], [8, 3],
  [0, 4], [8, 4],
  [0, 5], [8, 5],
  [0, 6], [8, 6],
  [1, 7], [7, 7],
  [2, 8], [3, 8], [4, 8], [5, 8], [6, 8],
];

const EYES: ReadonlyArray<readonly [number, number]> = [[2, 3], [6, 3]];

const SMILE: ReadonlyArray<readonly [number, number]> = [
  [2, 5], [6, 5], [3, 6], [4, 6], [5, 6],
];

const FROWN: ReadonlyArray<readonly [number, number]> = [
  [2, 7], [6, 7], [3, 6], [4, 6], [5, 6],
];

export default function PixelFace({ smile, className }: Props) {
  const cells = [...BORDER, ...EYES, ...(smile ? SMILE : FROWN)];
  return (
    <svg
      viewBox="0 0 9 9"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {cells.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
    </svg>
  );
}
