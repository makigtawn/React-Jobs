import React from "react";

const Card = ({
  children,
  bg = "bg-[var(--panel-bg)]/95 border border-[var(--panel-border)] shadow-[0_20px_60px_rgba(15,23,42,0.14)]",
}) => {
  return (
    <div
      className={`${bg} group relative overflow-hidden rounded-[1.75rem] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--panel-border-strong)] hover:shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:p-8`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/30 dark:bg-white/10" />
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-black/5 dark:bg-white/5" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Card;
