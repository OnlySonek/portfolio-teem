import { useSite } from "../context/SiteContext";

export default function SideDots() {
  const { activeIndex, totalSections, goTo } = useSite();
  return (
    <div className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5">
      {Array.from({ length: totalSections }).map((_, i) => (
        <div
          key={i}
          className={`side-dot ${activeIndex === i ? "active" : ""}`}
          onClick={() => goTo(i)}
        />
      ))}
    </div>
  );
}
