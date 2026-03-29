import { useEffect, useRef } from "react";

const rings = Array.from({ length: 8 }, (_, index) => ({
  radius: 60 + index * 90,
  speed: 0.18 + index * 0.04,
  offset: (index / 8) * Math.PI * 2,
}));

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
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      rings.forEach((ring, index) => {
        const pulse = ring.radius + Math.sin(tick * ring.speed + ring.offset) * 18;
        const alpha = dark ? 0.06 + index * 0.008 : 0.07 + index * 0.009;
        const color = dark
          ? `rgba(96, 165, 250, ${alpha})`
          : `rgba(59, 130, 246, ${alpha})`;

        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (index === 0) {
          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse);

          gradient.addColorStop(
            0,
            dark ? "rgba(96,165,250,0.06)" : "rgba(59,130,246,0.04)"
          );
          gradient.addColorStop(1, "rgba(0,0,0,0)");

          ctx.beginPath();
          ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      tick += 0.012;
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
