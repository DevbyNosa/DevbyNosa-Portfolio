import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Writing() {
  return (
    <section
      id="writing"
      className="mx-auto my-[150px] w-[90%] max-w-[1200px]"
    >
      {/* Section Top */}
      <motion.div
        className="mb-[70px] flex flex-col justify-between gap-5 md:flex-row md:items-end"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <p className="font-sans text-[11px] font-semibold tracking-[1.8px] text-[#686868]">
            05 — WRITING
          </p>

          <h2 className="mt-[10px] font-['Space_Grotesk'] text-[45px] font-medium tracking-[-2px] md:text-[50px]">
            Thoughts on building.
          </h2>
        </div>

        <p className="max-w-[300px] font-sans text-[14px] leading-[1.6] text-[#686868]">
          Things I've learned while building, debugging and figuring out
          software.
        </p>
      </motion.div>

      {/* Posts */}
      <div className="border-t border-[#d8d7d2]">

        {/* Post 1 */}
        <motion.article
          className="group grid gap-5 border-b border-[#d8d7d2] py-[30px] md:grid-cols-[.2fr_1fr_.3fr] md:items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-[16px] text-[#686868]">
            01
          </p>

          <div>
            <h3 className="font-['Space_Grotesk'] text-[25px] font-medium tracking-[-1px] transition-colors group-hover:text-[#315bea]">
              How I Built a Real-Estate Platform From Scratch
            </h3>

            <p className="mt-2 max-w-[600px] text-[16px] leading-[1.6] text-[#686868]">
              Lessons from building Relot, from database design and
              authentication to deployment.
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end md:gap-5">
            <span className="text-[14px] text-[#686868]">
              Backend · 2026
            </span>

            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </motion.article>

        {/* Post 2 */}
        <motion.article
          className="group grid gap-5 border-b border-[#d8d7d2] py-[30px] md:grid-cols-[.2fr_1fr_.3fr] md:items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease: "easeOut",
          }}
        >
          <p className="text-[16px] text-[#686868]">
            02
          </p>

          <div>
            <h3 className="font-['Space_Grotesk'] text-[25px] font-medium tracking-[-1px] transition-colors group-hover:text-[#315bea]">
              What Building an Ecommerce App Taught Me
            </h3>

            <p className="mt-2 max-w-[600px] text-[16px] leading-[1.6] text-[#686868]">
              What I learned working with React, APIs, authentication,
              orders and online payments.
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end md:gap-5">
            <span className="text-[14px] text-[#686868]">
              React · 2026
            </span>

            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </motion.article>

        {/* Post 3 */}
        <motion.article
          className="group grid gap-5 border-b border-[#d8d7d2] py-[30px] md:grid-cols-[.2fr_1fr_.3fr] md:items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: 0.24,
            ease: "easeOut",
          }}
        >
          <p className="text-[16px] text-[#686868]">
            03
          </p>

          <div>
            <h3 className="font-['Space_Grotesk'] text-[25px] font-medium tracking-[-1px] transition-colors group-hover:text-[#315bea]">
              Why I Enjoy Building Backend Systems
            </h3>

            <p className="mt-2 max-w-[600px] text-[16px] leading-[1.6] text-[#686868]">
              APIs, databases, authentication and all the complicated stuff
              that happens behind the interface.
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end md:gap-5">
            <span className="text-[14px] text-[#686868]">
              Backend · 2026
            </span>

            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </motion.article>

      </div>
    </section>
  );
}