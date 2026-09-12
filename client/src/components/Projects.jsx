import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  return (
    <section
      className="mx-auto my-[150px] w-[90%] max-w-[1200px]"
      id="projects"
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
            04 — SELECTED WORK
          </p>

          <h2 className="mt-[10px] font-['Space_Grotesk'] text-[45px] font-medium tracking-[-2px] md:text-[50px]">
            Things I've built.
          </h2>
        </div>

        <p className="max-w-[300px] font-sans text-[13px] leading-[1.6] text-[#686868]">
          A few projects I've worked on from idea to deployment.
        </p>
      </motion.div>

      {/* PROJECT 1 */}
      <div className="mb-[130px] grid items-center gap-[40px] md:grid-cols-[1.35fr_.65fr] md:gap-[70px]">
        {/* Project Image */}
        <motion.div
          className="flex min-h-[350px] items-center justify-center overflow-hidden bg-[#dfe5ed] p-5 md:min-h-[480px] md:p-[35px]"
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="w-full overflow-hidden rounded-[5px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Browser */}
            <div className="flex h-[30px] items-center gap-[5px] border-b border-[#eee] pl-3">
              <span className="h-[6px] w-[6px] rounded-full bg-[#bbb]" />
              <span className="h-[6px] w-[6px] rounded-full bg-[#bbb]" />
              <span className="h-[6px] w-[6px] rounded-full bg-[#bbb]" />
            </div>

            {/* Relot UI */}
            <div className="p-5">
              <div className="font-['Space_Grotesk'] text-[14px] font-bold">
                RELOT
              </div>

              <div className="mt-[15px] bg-[#edf1f6] px-[30px] py-[55px]">
                <small className="text-[8px] tracking-[1px]">
                  FIND YOUR NEXT HOME
                </small>

                <h3 className="mt-[10px] mb-[25px] font-['Space_Grotesk'] text-[32px] leading-none">
                  Find a place
                  <br />
                  you'll love.
                </h3>

                <div className="border border-[#ddd] bg-white p-3 text-[10px] text-[#999]">
                  Search properties...
                </div>
              </div>

              <div className="mt-[15px] flex gap-[10px]">
                <div className="h-[80px] flex-1 bg-[#e5e5e5]" />
                <div className="h-[80px] flex-1 bg-[#e5e5e5]" />
                <div className="h-[80px] flex-1 bg-[#e5e5e5]" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          <div className="mb-[15px] text-[12px] text-[#315bea]">
            01
          </div>

          <h3 className="font-['Space_Grotesk'] text-[44px] font-medium tracking-[-2px] md:text-[48px]">
            Relot
          </h3>

          <p className="my-5 text-[14px] leading-[1.7] text-[#686868]">
            A real-estate platform connecting property seekers with agents.
            Built with authentication, dashboards, property management and
            admin tools.
          </p>

          <div className="mb-[30px] flex flex-wrap gap-2">
            <span className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[7px] text-[10px]">
              Node.js
            </span>

            <span className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[7px] text-[10px]">
              Express
            </span>

            <span className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[7px] text-[10px]">
              PostgreSQL
            </span>
          </div>

          <motion.a
            href="#"
            className="inline-flex items-center gap-1 border-b border-[#171717] pb-[3px] text-[13px] font-semibold"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            View project
            <ArrowUpRight size={15} strokeWidth={2} />
          </motion.a>
        </motion.div>
      </div>

      {/* PROJECT 2 */}
      <div className="mb-[130px] grid items-center gap-[40px] md:grid-cols-[.65fr_1.35fr] md:gap-[70px]">
        {/* Project Image */}
        <motion.div
          className="flex min-h-[350px] items-center justify-center overflow-hidden bg-[#e3dfd5] p-5 md:order-2 md:min-h-[480px] md:p-[35px]"
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="w-full bg-white p-[25px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between text-[11px] font-bold">
              <span>NOSA STORE</span>

              <span className="font-normal">
                Cart (2)
              </span>
            </div>

            <div className="px-5 py-[50px]">
              <small className="text-[9px] tracking-[1px] text-[#777]">
                NEW COLLECTION
              </small>

              <h3 className="mt-[10px] mb-[30px] font-['Space_Grotesk'] text-[35px] leading-none">
                Everything
                <br />
                you actually want.
              </h3>

              <div className="flex gap-[15px]">
                <div className="h-[100px] w-[100px] bg-[#e7e3da]" />
                <div className="h-[100px] w-[100px] bg-[#e7e3da]" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Details */}
        <motion.div
          className="md:order-1"
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          <div className="mb-[15px] text-[12px] text-[#315bea]">
            02
          </div>

          <h3 className="font-['Space_Grotesk'] text-[44px] font-medium tracking-[-2px] md:text-[48px]">
            Ecommerce
          </h3>

          <p className="my-5 text-[14px] leading-[1.7] text-[#686868]">
            A full-stack ecommerce application with product browsing,
            cart, wishlist, orders, authentication and online payments.
          </p>

          <div className="mb-[30px] flex flex-wrap gap-2">
            <span className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[7px] text-[10px]">
              React
            </span>

            <span className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[7px] text-[10px]">
              Node.js
            </span>

            <span className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[7px] text-[10px]">
              Express
            </span>

            <span className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[7px] text-[10px]">
              PostgreSQL
            </span>

            <span className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[7px] text-[10px]">
              Flutterwave
            </span>
          </div>

          <motion.a
            href="#"
            className="inline-flex items-center gap-1 border-b border-[#171717] pb-[3px] text-[13px] font-semibold"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            View project
            <ArrowUpRight size={15} strokeWidth={2} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}