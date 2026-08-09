import { forwardRef } from "react";

const TransitionOverlay = forwardRef(function TransitionOverlay(_, ref) {
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[80] pointer-events-none"
      style={{
        opacity: 0,
        background:
          "linear-gradient(135deg, var(--accent), var(--accent-2))",
        clipPath: "inset(50% 0 50% 0)",
      }}
    />
  );
});

export default TransitionOverlay;
