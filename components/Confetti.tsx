"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899", "#06b6d4"];

export default function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: 5 + Math.random() * 7,
      h: 8 + Math.random() * 6,
      delay: Math.random() * 0.5,
      duration: 1.6 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 120,
      rotate: Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1),
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -16,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            borderRadius: 2,
          }}
          initial={{ y: 0, opacity: 1, x: 0, rotate: 0 }}
          animate={{
            y: "105vh",
            x: p.drift,
            rotate: p.rotate,
            opacity: [1, 1, 1, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { times: [0, 0.5, 0.7, 0.85, 1] },
          }}
        />
      ))}
    </div>
  );
}
