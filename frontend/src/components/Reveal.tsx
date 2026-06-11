import type { ReactNode, CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "tr";
}

/**
 * Entrance fade-up driven purely by CSS animation, so content renders on
 * every browser even when JavaScript fails or is disabled. Reduced motion
 * is handled in globals.css.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
