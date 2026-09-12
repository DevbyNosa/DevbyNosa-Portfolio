import { motion } from "framer-motion";

const experienceVariants = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function WorkExperience() {
  return (
    <section
      id="experience"
      className="mx-auto my-[150px] w-[90%] max-w-[1200px]"
    >
      {/* Section Header */}
      <motion.div
        className="mb-[70px] flex flex-col justify-between gap-5 md:flex-row md:items-end"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      >
        <div>
          <p className="font-sans text-[11px] font-semibold tracking-[1.8px] text-[#686868]">
            03 — WORK EXPERIENCE
          </p>

          <h2 className="mt-[10px] max-w-[700px] font-['Space_Grotesk'] text-[45px] font-medium leading-[1] tracking-[-2px] md:text-[55px]">
            What I've been working on.
          </h2>
        </div>

        <p className="max-w-[300px] font-sans text-[13px] leading-[1.6] text-[#686868]">
          Building real-world web applications, learning through projects,
          and turning ideas into working products.
        </p>
      </motion.div>

      {/* Experience */}
      <div className="border-t border-[#d8d7d2]">

        {/* Experience 1 */}
        <motion.article
          className="grid gap-8 border-b border-[#d8d7d2] py-[45px] md:grid-cols-[.35fr_1fr_.35fr] md:gap-[50px]"
          variants={experienceVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div>
            <p className="font-['Space_Grotesk'] text-[14px] font-medium text-[#315bea]">
              01
            </p>
          </div>

          <div>
            <h3 className="font-['Space_Grotesk'] text-[30px] font-medium tracking-[-1.5px]">
              Full-Stack Developer
            </h3>

            <p className="mt-2 text-[14px] text-[#686868]">
              Independent / Freelance
            </p>

            <p className="mt-[25px] max-w-[650px] text-[14px] leading-[1.8] text-[#686868]">
              Building full-stack web applications from scratch, working
              across frontend, backend, databases, authentication and
              deployment. I focus on creating useful products rather than
              just static websites.
            </p>

            <ul className="mt-[25px] space-y-3 text-[13px] leading-[1.7]">
              <li>• Build REST APIs with Node.js and Express.</li>
              <li>• Design and manage PostgreSQL databases.</li>
              <li>• Implement authentication, sessions and authorization.</li>
              <li>• Integrate payment systems and third-party services.</li>
              <li>• Deploy and maintain applications in production.</li>
            </ul>
          </div>

          <div className="md:text-right">
            <p className="text-[12px] text-[#686868]">
              2025 — Present
            </p>

            <div className="mt-5 flex flex-wrap gap-2 md:justify-end">
              <span className="border border-[#d8d7d2] px-2 py-1 text-[10px]">
                JavaScript
              </span>

              <span className="border border-[#d8d7d2] px-2 py-1 text-[10px]">
                React
              </span>

              <span className="border border-[#d8d7d2] px-2 py-1 text-[10px]">
                Node.js
              </span>

              <span className="border border-[#d8d7d2] px-2 py-1 text-[10px]">
                PostgreSQL
              </span>
            </div>
          </div>
        </motion.article>

        {/* Experience 2 */}
        <motion.article
          className="grid gap-8 border-b border-[#d8d7d2] py-[45px] md:grid-cols-[.35fr_1fr_.35fr] md:gap-[50px]"
          variants={experienceVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.15 }}
        >
          <div>
            <p className="font-['Space_Grotesk'] text-[14px] font-medium text-[#315bea]">
              02
            </p>
          </div>

          <div>
            <h3 className="font-['Space_Grotesk'] text-[30px] font-medium tracking-[-1.5px]">
              Web Developer
            </h3>

            <p className="mt-2 text-[14px] text-[#686868]">
              Independent Projects
            </p>

            <p className="mt-[25px] max-w-[650px] text-[14px] leading-[1.8] text-[#686868]">
              Designed and developed several complete web applications to
              solve real-world problems and build production-level
              experience.
            </p>

            <ul className="mt-[25px] space-y-3 text-[13px] leading-[1.7]">
              <li>
                • Built a real-estate platform with property and agent
                management.
              </li>
              <li>
                • Developed an ecommerce application with cart, wishlist and
                orders.
              </li>
              <li>• Built admin dashboards and content management systems.</li>
              <li>
                • Worked with file uploads, payment integrations and APIs.
              </li>
            </ul>
          </div>

          <div className="md:text-right">
            <p className="text-[12px] text-[#686868]">
              2024 — Present
            </p>

            <div className="mt-5 flex flex-wrap gap-2 md:justify-end">
              <span className="border border-[#d8d7d2] px-2 py-1 text-[10px]">
                Express
              </span>

              <span className="border border-[#d8d7d2] px-2 py-1 text-[10px]">
                EJS
              </span>

              <span className="border border-[#d8d7d2] px-2 py-1 text-[10px]">
                APIs
              </span>

              <span className="border border-[#d8d7d2] px-2 py-1 text-[10px]">
                Git
              </span>
            </div>
          </div>
        </motion.article>

      </div>
    </section>
  );
}