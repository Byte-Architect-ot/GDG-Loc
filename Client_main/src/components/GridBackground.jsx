export default function GridBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Main grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(39,39,42,0.55) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(39,39,42,0.55) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 85% 55% at 50% 0%, #000 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 55% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      {/* Subtle corner radial fills */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(66,133,244,0.04) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(234,67,53,0.04) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(52,168,83,0.04) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(251,188,4,0.04) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
