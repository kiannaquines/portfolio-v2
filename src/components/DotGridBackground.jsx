import { useEffect, useRef } from "react";

export default function DotGridBackground({ dark }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");

    const draw = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(ratio, ratio);
      ctx.clearRect(0, 0, width, height);

      const gap = 28;
      const radius = 1.2;
      const dotColor = dark
        ? "rgba(148,163,184,0.22)"
        : "rgba(100,116,139,0.18)";

      ctx.fillStyle = dotColor;

      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const fade = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.1,
        width / 2,
        height / 2,
        height * 0.75
      );

      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(
        1,
        dark ? "rgba(12,10,9,0.85)" : "rgba(245,245,244,0.85)"
      );

      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, width, height);
    };

    draw();
    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, [dark]);

  return <canvas ref={ref} className="dot-grid-bg" aria-hidden="true" />;
}
