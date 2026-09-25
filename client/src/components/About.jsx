import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About({ content = {} }) {
  return (
    <motion.section
      id="about"
      className="mx-auto my-[180px] grid w-[90%] max-w-[1200px] grid-cols-1 gap-[30px] border-t border-[#d8d7d2] pt-10 md:grid-cols-[.35fr_.65fr]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {/* Label */}
      <div>
        <p className="font-sans text-[11px] font-semibold tracking-[1.8px] text-[#686868]">
          {content.eyebrow || "02 — A LITTLE ABOUT ME"}
        </p>
      </div>

      {/* Content */}
      <div>
        <h2 className="max-w-[700px] font-['Space_Grotesk'] text-[40px] leading-none tracking-[-3px] md:text-[clamp(40px,5vw,65px)]">
          {content.title || "I enjoy building the"}{" "}
          <em className="not-italic text-[#315bea]">
            {content.accent || "complicated stuff."}
          </em>
        </h2>

        <p className="my-[30px] max-w-[600px] font-sans leading-[1.8] text-[#686868]">
          {content.body ||
            "Give me a database, an API, authentication, payments and a problem to solve and I'm happy. I'm interested in building products that are actually useful - not just websites that look nice."}
        </p>

        <Link
          to="/about"
          className="inline-flex items-center gap-1 text-[13px] font-semibold transition-colors hover:text-[#315bea]"
        >
          {content.link || "More about me"}
          <ArrowRight size={15} strokeWidth={2} />
        </Link>
      </div>
    </motion.section>
  );
}