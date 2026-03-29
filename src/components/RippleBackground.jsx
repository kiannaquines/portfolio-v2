import { useEffect, useRef } from "react";

export default function RippleBackground({ dark }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let tick = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(ratio, ratio);
    };

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const gap = width < 640 ? 28 : 36;
      const dotSize = width < 640 ? 1.1 : 1.4;

      ctx.clearRect(0, 0, width, height);

      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          const waveX = Math.sin(tick * 0.9 + x * 0.014);
          const waveY = Math.cos(tick * 1.1 + y * 0.018);
          const pulse = (waveX + waveY + 2) / 4;
          const alpha = dark
            ? 0.08 + pulse * 0.12
            : 0.06 + pulse * 0.1;
          const radius = dotSize + pulse * 1.8;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(96, 165, 250, ${alpha})`
            : `rgba(59, 130, 246, ${alpha})`;
          ctx.fill();
        }
      }

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.08,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72
      );

      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(
        1,
        dark ? "rgba(12,10,9,0.12)" : "rgba(245,245,244,0.12)"
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      tick += 0.02;
      animationFrameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [dark]);

  return <canvas ref={ref} className="ripple-canvas" aria-hidden="true" />;
}
