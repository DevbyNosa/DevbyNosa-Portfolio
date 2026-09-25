import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import devbynosa from '../assets/devbynosa.jpg'

export default function Hero({ content = {} }) {
  const titleLines = (content.title || "I build websites\n& web applications.").split("\n");
  return (
    <section className="mx-auto my-[100px] grid w-[90%] max-w-[1200px] grid-cols-1 items-center gap-[60px] md:my-[100px] md:mb-[120px] md:grid-cols-[1.4fr_.6fr] md:gap-[80px]">

      
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <p className="font-sans text-[11px] font-semibold tracking-[1.8px] text-[#686868]">
          {content.eyebrow || "HELLO, I'M IGBINOSA NOSAKHARE JUDGES."}
        </p>

        <h1 className="mt-5 max-w-[850px] font-['Space_Grotesk'] text-[52px] font-medium leading-[.98] tracking-[-3px] md:text-[clamp(50px,6.5vw,82px)] md:tracking-[-4px]">
          {titleLines.map((line, index) => <span key={line}>{line}{index < titleLines.length - 1 && <br />}</span>)}
        </h1>

        <p className="mt-[30px] max-w-[520px] font-sans text-[17px] leading-[1.7] text-[#686868]">
          {content.description || "Full-stack developer based in Nigeria, turning ideas into useful digital products with clean code and thoughtful interfaces."}
        </p>

        {/* Actions */}
        <div className="mt-[35px] flex items-center gap-[25px]">

          <motion.a
            href="#projects"
            className="flex items-center gap-4 rounded-[4px] bg-[#171717] px-5 py-[14px] text-[14px] text-white"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {content.primaryCta || "See my work"}
            <ArrowDown size={15} strokeWidth={2} />
          </motion.a>

          <motion.a
            href="#contact"
            className="flex items-center gap-1 border-b border-[#171717] pb-[3px] text-[14px]"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {content.secondaryCta || "Let's work together"}
            <ArrowUpRight size={15} strokeWidth={2} />
          </motion.a>

        </div>
      </motion.div>

      
      <motion.div
        className="self-end"
        initial={{ opacity: 0, x: 40, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{
          duration: 0.9,
          delay: 0.2,
          ease: "easeOut",
        }}
      >

        <motion.div
          className="h-[350px] w-[280px] overflow-hidden bg-[#ddd9d0]"
          whileHover={{
            rotate: -2,
            scale: 1.02,
          }}
          transition={{ duration: 0.3 }}
        >
         
         
          <div className="flex items-center justify-center w-full h-full p-4 border-4 border-[#77736a] rounded-lg bg-white">
        <div className="w-full h-full p-2 border border-[#d8d7d2] rounded-md">
          <img
            src={devbynosa}
            alt="Devbynosa Image"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      </div>
              
        </motion.div>

        <p className="mt-5 font-sans text-[12px] leading-[1.5] text-[#686868]">
          {(content.caption || "Full-stack developer\n& professional bug creator.").split("\n").map((line) => <span key={line}>{line}<br /></span>)}
        </p>

      </motion.div>

    </section>
  );
}