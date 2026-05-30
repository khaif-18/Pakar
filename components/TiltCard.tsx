"use client";
import { useRef, type ReactNode } from "react";

export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(4px)`;
    const shine = el.querySelector<HTMLElement>("[data-shine]");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.09) 0%, transparent 60%)`;
      shine.style.opacity = "1";
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    const shine = el.querySelector<HTMLElement>("[data-shine]");
    if (shine) shine.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div
        data-shine
        className="absolute inset-0 pointer-events-none z-10 opacity-0"
        style={{ transition: "opacity 0.2s", borderRadius: "inherit" }}
      />
      {children}
    </div>
  );
}
