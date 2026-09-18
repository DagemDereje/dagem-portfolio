export type IllustrationVariant =
  | "drought-forecasting"
  | "fraud-monitoring"
  | "customer-intelligence"
  | "receipt-extractor"
  | "heart-disease-predictor";

/**
 * Small line-art illustrations representing each project's actual domain —
 * a forecast chart for drought, a flagged node in a transaction network for
 * fraud, a cluster scatter plot for customer segmentation, extracted
 * bounding boxes for the receipt parser, an ECG waveform for the heart
 * model. Same stroke weight and palette as the hero's network visual, so
 * they read as one consistent visual system rather than five one-off
 * graphics.
 */
export default function ProjectIllustration({
  variant,
  className = "",
}: {
  variant: IllustrationVariant;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 140"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeWidth={1.5}
    >
      {variant === "drought-forecasting" && <DroughtArt />}
      {variant === "fraud-monitoring" && <FraudArt />}
      {variant === "customer-intelligence" && <ClusterArt />}
      {variant === "receipt-extractor" && <ReceiptArt />}
      {variant === "heart-disease-predictor" && <HeartArt />}
    </svg>
  );
}

function DroughtArt() {
  return (
    <>
      <line x1="10" y1="70" x2="230" y2="70" stroke="var(--border)" strokeDasharray="2 4" />
      <polyline
        points="10,50 45,65 80,55 115,90 150,80"
        stroke="var(--signal)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="150,80 180,100 210,95 230,110"
        stroke="var(--amber)"
        strokeDasharray="4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="150" cy="80" r="3.5" fill="var(--signal)" />
      <circle cx="230" cy="110" r="3.5" fill="var(--amber)" />
    </>
  );
}

function FraudArt() {
  const nodes = [
    { x: 30, y: 30 },
    { x: 30, y: 100 },
    { x: 100, y: 65 },
    { x: 170, y: 30 },
    { x: 170, y: 100 },
    { x: 215, y: 65 },
  ];
  const edges = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
  ];
  return (
    <>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--border)"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={5} fill="var(--signal)" />
      ))}
      <circle cx={215} cy={65} r={9} stroke="var(--amber)" strokeWidth={1.5} />
      <circle cx={215} cy={65} r={5} fill="var(--amber)" />
    </>
  );
}

function ClusterArt() {
  const cluster = (cx: number, cy: number, color: string) =>
    [-10, -3, 4, 11].map((dx, i) => (
      <circle
        key={`${cx}-${i}`}
        cx={cx + dx * 1.3}
        cy={cy + ((i % 2 === 0 ? -1 : 1) * (6 + i))}
        r={4}
        fill={color}
        fillOpacity={0.85}
      />
    ));
  return (
    <>
      <line x1="15" y1="120" x2="230" y2="120" stroke="var(--border)" />
      <line x1="15" y1="120" x2="15" y2="15" stroke="var(--border)" />
      {cluster(60, 45, "var(--signal)")}
      {cluster(140, 85, "var(--signal)")}
      {cluster(195, 40, "var(--amber)")}
    </>
  );
}

function ReceiptArt() {
  return (
    <>
      <path
        d="M55 15 h130 v100 l-12 10 -12 -10 -12 10 -12 -10 -12 10 -12 -10 -12 10 -12 -10 -12 10 -12 -10 z"
        stroke="var(--border)"
      />
      <line x1="72" y1="38" x2="168" y2="38" stroke="var(--muted)" />
      <line x1="72" y1="52" x2="150" y2="52" stroke="var(--muted)" />
      <rect x="68" y="63" width="104" height="12" rx="2" stroke="var(--signal)" />
      <line x1="72" y1="90" x2="140" y2="90" stroke="var(--muted)" />
      <rect x="68" y="98" width="80" height="12" rx="2" stroke="var(--amber)" />
    </>
  );
}

function HeartArt() {
  return (
    <>
      <line x1="10" y1="70" x2="230" y2="70" stroke="var(--border)" strokeDasharray="2 4" />
      <polyline
        points="10,70 55,70 68,70 78,35 90,110 100,55 112,70 230,70"
        stroke="var(--signal)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="55" r="4" fill="var(--amber)" />
    </>
  );
}
