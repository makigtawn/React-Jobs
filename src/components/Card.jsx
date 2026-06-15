import React from "react";

const Card = ({
  children,
  bg = "bg-slate-900/40 border border-slate-800 backdrop-blur-md shadow-xl",
}) => {
  return (
    <div
      className={`${bg} group relative overflow-hidden rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Card;
