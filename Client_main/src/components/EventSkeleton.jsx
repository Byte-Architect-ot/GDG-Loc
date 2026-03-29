export default function EventSkeleton() {
  return (
    <div className="relative flex flex-col md:flex-row items-center gap-10 md:gap-0 animate-pulse">
      {/* Image block */}
      <div className="w-full md:w-[46%] pl-10 sm:pl-14 md:pl-0">
        <div
          className="w-full rounded-2xl"
          style={{ height: "400px", background: "#18181b", border: "1px solid #27272a" }}
        />
      </div>

      {/* Node */}
      <div className="absolute left-4 sm:left-6 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-20">
        <div
          className="w-5 h-5 rounded-full"
          style={{ background: "#27272a" }}
        />
      </div>

      {/* Text block */}
      <div className="w-full md:w-[46%] pl-10 sm:pl-14 md:pl-0 md:px-8 space-y-4">
        <div className="h-4 w-20 rounded" style={{ background: "#27272a" }} />
        <div className="h-10 w-3/4 rounded" style={{ background: "#27272a" }} />
        <div className="h-4 w-full rounded" style={{ background: "#27272a" }} />
        <div className="h-4 w-5/6 rounded" style={{ background: "#27272a" }} />
        <div className="h-4 w-2/3 rounded" style={{ background: "#27272a" }} />
        <div className="h-9 w-32 rounded-lg" style={{ background: "#27272a" }} />
      </div>
    </div>
  );
}
