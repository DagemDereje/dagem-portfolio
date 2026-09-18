const inputNodes = [
  { x: 20, y: 40 },
  { x: 20, y: 100 },
  { x: 20, y: 160 },
];
const hiddenNodes = [
  { x: 120, y: 25 },
  { x: 120, y: 75 },
  { x: 120, y: 125 },
  { x: 120, y: 175 },
];
const outputNode = { x: 220, y: 100 };

function edges() {
  const lines: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  let i = 0;
  inputNodes.forEach((a) => {
    hiddenNodes.forEach((b) => {
      lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, delay: i * 0.04 });
      i += 1;
    });
  });
  hiddenNodes.forEach((a) => {
    lines.push({ x1: a.x, y1: a.y, x2: outputNode.x, y2: outputNode.y, delay: 0.5 + i * 0.03 });
    i += 1;
  });
  return lines;
}

export default function NetworkVisual() {
  const lines = edges();

  return (
    <svg
      viewBox="0 0 250 200"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="var(--signal)"
          strokeOpacity={0.25}
          strokeWidth={1}
          pathLength={1}
          strokeDasharray={1}
          className="animate-[draw-line_0.6s_ease-out_forwards]"
          style={{ animationDelay: `${l.delay}s`, strokeDashoffset: 1 }}
        />
      ))}
      {inputNodes.map((n, i) => (
        <circle
          key={`in-${i}`}
          cx={n.x}
          cy={n.y}
          r={18}
          fill="var(--signal)"
          className="animate-[pulse-node_3.5s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {hiddenNodes.map((n, i) => (
        <circle
          key={`hid-${i}`}
          cx={n.x}
          cy={n.y}
          r={18}
          fill="var(--signal)"
          className="animate-[pulse-node_3.5s_ease-in-out_infinite]"
          style={{ animationDelay: `${0.8 + i * 0.3}s` }}
        />
      ))}
      <circle
        cx={outputNode.x}
        cy={outputNode.y}
        r={20}
        fill="var(--amber)"
        className="animate-[pulse-node_3.5s_ease-in-out_infinite]"
        style={{ animationDelay: "1.8s" }}
      />
    </svg>
  );
}
