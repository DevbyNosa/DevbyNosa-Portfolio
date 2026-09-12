import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto my-[150px] w-[90%] max-w-[1200px] border-t border-[#d8d7d2] pt-[45px]"
    >
      <div className="grid gap-[70px] md:grid-cols-[.9fr_1.1fr]">

      
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-sans text-[11px] font-semibold tracking-[1.8px] text-[#686868]">
            06 — LET'S TALK
          </p>

          <h2 className="mt-[10px] max-w-[500px] font-['Space_Grotesk'] text-[45px] font-medium leading-[1] tracking-[-2px] md:text-[50px]">
            Let's build something good.
          </h2>

          <p className="mt-[25px] max-w-[420px] text-[14px] leading-[1.8] text-[#686868]">
            Have a project in mind, an idea you want to bring to life, or
            just want to talk about building something?
          </p>

          
          <motion.a
            href="mailto:judgesnigbinosa@gmail.com"
            className="mt-[30px] inline-flex items-center gap-3 border-b border-[#171717] pb-2 font-['Space_Grotesk'] text-[16px] font-medium transition-colors hover:text-[#315bea]"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Mail size={17} strokeWidth={1.8} />
            judgesnigbinosa@gmail.com
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </motion.a>

         
          <div className="mt-[45px] flex gap-[20px]">
            <motion.a
              href="https://github.com/DevbyNosa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#686868] transition-colors hover:text-[#171717]"
              whileHover={{ y: -4 }}
            >
              <FaGithub size={20} />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/devbynosa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#686868] transition-colors hover:text-[#171717]"
              whileHover={{ y: -4 }}
            >
              <FaLinkedin size={20} />
            </motion.a>

            <motion.a
              href="https://x.com/DevByNosa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-[#686868] transition-colors hover:text-[#171717]"
              whileHover={{ y: -4 }}
            >
              <FaXTwitter size={20} />
            </motion.a>
          </div>
        </motion.div>

       
        <motion.form
          className="border-t border-[#d8d7d2] pt-[30px]"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          
          <div className="grid gap-[25px] md:grid-cols-2">

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[10px] font-semibold tracking-[1px] text-[#686868]"
              >
                YOUR NAME
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full border-b border-[#c9c8c3] bg-transparent px-0 py-[13px] text-[14px] outline-none placeholder:text-[#aaa] focus:border-[#171717]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[10px] font-semibold tracking-[1px] text-[#686868]"
              >
                EMAIL
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border-b border-[#c9c8c3] bg-transparent px-0 py-[13px] text-[14px] outline-none placeholder:text-[#aaa] focus:border-[#171717]"
              />
            </div>

          </div>

       
          <div className="mt-[30px]">
            <label
              htmlFor="project"
              className="mb-2 block text-[10px] font-semibold tracking-[1px] text-[#686868]"
            >
              WHAT ARE YOU LOOKING TO BUILD?
            </label>

            <select
              id="project"
              name="project"
              defaultValue=""
              className="w-full appearance-none border-b border-[#c9c8c3] bg-transparent px-0 py-[13px] text-[14px] outline-none focus:border-[#171717]"
            >
              <option value="" disabled>
                Select a project type
              </option>

              <option value="website">Business website</option>
              <option value="web-app">Web application</option>
              <option value="ecommerce">Ecommerce</option>
              <option value="custom-system">Custom system</option>
              <option value="other">Something else</option>
            </select>
          </div>

          
          <div className="mt-[30px]">
            <label
              htmlFor="message"
              className="mb-2 block text-[10px] font-semibold tracking-[1px] text-[#686868]"
            >
              TELL ME ABOUT IT
            </label>

            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell me a little about your project..."
              className="w-full resize-none border-b border-[#c9c8c3] bg-transparent px-0 py-[13px] text-[14px] leading-[1.7] outline-none placeholder:text-[#aaa] focus:border-[#171717]"
            />
          </div>

        
          <motion.button
            type="submit"
            className="mt-[30px] inline-flex items-center gap-3 bg-[#171717] px-[22px] py-[16px] text-[13px] font-semibold text-white"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Send message
            <Send size={15} strokeWidth={2} />
          </motion.button>
        </motion.form>

      </div>
    </section>
  );
}