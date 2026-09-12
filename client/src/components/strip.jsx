export default function TechStrip() {
  const technologies = [
    "JAVASCRIPT",
    "REACT",
    "NODE.JS",
    "EXPRESS",
    "POSTGRESQL",
  ];

  return (
    <div className="overflow-hidden border-y border-[#d8d7d2] py-5">
      <div className="flex w-max animate-marquee">

        <div className="flex shrink-0">
          {technologies.map((tech) => (
            <span
              key={`first-${tech}`}
              className="mx-[35px] whitespace-nowrap font-['Space_Grotesk'] text-[12px] font-semibold tracking-[1.5px] text-[#686868]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex shrink-0">
          {technologies.map((tech) => (
            <span
              key={`second-${tech}`}
              className="mx-[35px] whitespace-nowrap font-['Space_Grotesk'] text-[12px] font-semibold tracking-[1.5px] text-[#686868]"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}