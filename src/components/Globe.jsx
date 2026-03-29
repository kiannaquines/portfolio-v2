import { useEffect, useRef } from "react";

const markers = [
  { lat: 40.7, lng: -74 },
  { lat: 51.5, lng: -0.1 },
  { lat: 35.7, lng: 139.7 },
  { lat: -33.9, lng: 151.2 },
  { lat: 48.9, lng: 2.4 },
  { lat: 28.6, lng: 77.2 },
  { lat: 8.5, lng: 124.6 },
  { lat: 1.4, lng: 103.8 },
  { lat: 37.6, lng: 126.9 },
  { lat: 25.2, lng: 55.3 },
];

function projectPoint(lat, lng, rotation, cx, cy, radius) {
  const latRadians = (lat * Math.PI) / 180;
  const lngRadians = ((lng + rotation) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(latRadians) * Math.sin(lngRadians),
    y: cy - radius * Math.sin(latRadians),
    z: Math.cos(latRadians) * Math.cos(lngRadians),
  };
}

export default function Globe() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    let frame = 0;
    let animationFrameId;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;
      const rotation = frame * 0.3;

      ctx.clearRect(0, 0, width, height);

      const globeGradient = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.1,
        cx,
        cy,
        radius
      );

      globeGradient.addColorStop(0, "#3b82f6");
      globeGradient.addColorStop(0.5, "#1d4ed8");
      globeGradient.addColorStop(1, "#1e3a8a");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = globeGradient;
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 0.7;

      for (let lat = -75; lat <= 75; lat += 15) {
        const latRadians = (lat * Math.PI) / 180;
        const yRadius = cy - radius * Math.sin(latRadians);
        const xRadius = radius * Math.cos(latRadians);

        ctx.beginPath();
        ctx.ellipse(cx, yRadius, xRadius, xRadius * 0.14, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let lng = 0; lng < 180; lng += 20) {
        const angle = ((lng + rotation) * Math.PI) / 180;

        [1, -1].forEach((side) => {
          ctx.beginPath();

          for (let lat = -90; lat <= 90; lat += 2) {
            const latRadians = (lat * Math.PI) / 180;
            const x = cx + side * radius * Math.cos(latRadians) * Math.sin(angle);
            const y = cy - radius * Math.sin(latRadians);
            const z = Math.cos(latRadians) * Math.cos(angle) * side;

            if (lat === -90) {
              ctx.moveTo(x, y);
            } else if (z > 0) {
              ctx.lineTo(x, y);
            } else {
              ctx.moveTo(x, y);
            }
          }

          ctx.stroke();
        });
      }

      const atmosphere = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.85,
        cx,
        cy,
        radius * 1.15
      );

      atmosphere.addColorStop(0, "rgba(96,165,250,0.15)");
      atmosphere.addColorStop(1, "rgba(96,165,250,0)");

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = atmosphere;
      ctx.fill();

      markers.forEach((marker) => {
        const { x, y, z } = projectPoint(
          marker.lat,
          marker.lng,
          rotation,
          cx,
          cy,
          radius
        );

        if (z > 0.1) {
          const alpha = Math.min(1, (z - 0.1) * 2);

          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251,191,36,${alpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251,191,36,${alpha * 0.25})`;
          ctx.fill();
        }
      });

      const shine = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        0,
        cx,
        cy,
        radius * 0.9
      );

      shine.addColorStop(0, "rgba(255,255,255,0.13)");
      shine.addColorStop(1, "rgba(255,255,255,0)");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = shine;
      ctx.fill();

      frame += 1;
      animationFrameId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={ref} width={370} height={370} style={{ display: "block" }} />;
}
