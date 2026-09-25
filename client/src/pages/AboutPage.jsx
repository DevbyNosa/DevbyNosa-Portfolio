import { motion } from "framer-motion";
import { ArrowLeft, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import devbynosa from '../assets/devbynosa.jpg'
import Navbar from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-[#f4f3ef] text-[#171717]">
      
      

      {/* Hero — text on left, photo on right */}
      <motion.section
        className="mx-auto mt-[100px] grid w-[90%] max-w-[1200px] grid-cols-1 items-center gap-[50px] md:mt-[120px] md:grid-cols-[1.3fr_.7fr]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div>
          <p className="font-sans text-[13px] font-semibold tracking-[1.8px] text-[#686868]">
            ABOUT ME
          </p>

          <h1 className="mt-[15px] max-w-[700px] font-['Space_Grotesk'] text-[44px] font-medium leading-[1.05] tracking-[-2px] md:text-[64px]">
            I build{" "}
            <em className="not-italic text-[#315bea]">the complicated stuff</em>{" "}
            so people don't have to think about it.
          </h1>

          <p className="mt-[35px] max-w-[560px] text-[18px] leading-[1.75] text-[#686868]">
            Self-taught full-stack developer based in Benin City, Nigeria.
            I work on web applications where the backend does real work —
            authentication, payments, database schemas, and the kind of
            features that look simple but took a week to get right.
          </p>
        </div>

        {/* Photo */}
        <motion.div
          className="relative mx-auto w-full max-w-[340px] md:mx-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <div className="rotate-[3deg] border border-[#d8d7d2] bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <img
              src={devbynosa}
              alt="Igbinosa Nosa, full-stack developer"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <p className="mt-[16px] text-center text-[13px] text-[#686868] md:text-left">
            Benin City · 2026
          </p>
        </motion.div>
      </motion.section>

      {/* Story */}
      <motion.section
        className="mx-auto mt-[100px] grid w-[90%] max-w-[1200px] grid-cols-1 gap-[60px] border-t border-[#d8d7d2] pt-[60px] md:grid-cols-[.3fr_.7fr]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div>
          <p className="font-sans text-[13px] font-semibold tracking-[1.8px] text-[#686868]">
            01 — THE STORY
          </p>
        </div>

        <div className="min-w-0 max-w-[640px] space-y-[22px] break-words text-[17px] leading-[1.85] text-[#3a3a3a]">
          <p>
            I started coding in 2024. No bootcamp, no CS degree — just
            curiosity and a lot of late nights. The first thing I built was
            a static page. The second thing I built had a login form and a
            broken database connection. Both felt like magic when they
            finally worked.
          </p>

          <p>
            Since then, I've built full-stack applications with React, Node.js
            and PostgreSQL. I've shipped a real-estate marketplace, an
            e-commerce store with dual payment pipelines, a school management
            system with role-based access control, and a personal analytics
            pipeline that tracks visitors without selling their data to
            Google.
          </p>

          <p>
            What I enjoy most is the middle of the stack — the part where
            the API meets the database, where authentication decisions
            matter, and where you have to think before you type. Anyone can
            center a div. Not everyone can design a schema that scales.
          </p>

          <p>
            I'm currently studying History and International Studies at the
            University of Benin, in my third year. The degree isn't
            engineering, but the critical thinking, structured writing, and
            research habits carry over more than people expect.
          </p>
        </div>
      </motion.section>

      {/* What I work with */}
      <motion.section
        className="mx-auto mt-[100px] grid w-[90%] max-w-[1200px] grid-cols-1 gap-[60px] border-t border-[#d8d7d2] pt-[60px] md:grid-cols-[.3fr_.7fr]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div>
          <p className="font-sans text-[13px] font-semibold tracking-[1.8px] text-[#686868]">
            02 — THE STACK
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2">
          <div>
            <h3 className="font-['Space_Grotesk'] text-[18px] font-medium tracking-[-0.5px]">
              Frontend
            </h3>
            <ul className="mt-[12px] space-y-2 text-[15px] text-[#686868]">
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>Vite</li>
            </ul>
          </div>

          <div>
            <h3 className="font-['Space_Grotesk'] text-[18px] font-medium tracking-[-0.5px]">
              Backend
            </h3>
            <ul className="mt-[12px] space-y-2 text-[15px] text-[#686868]">
              <li>Node.js</li>
              <li>Express</li>
              <li>REST APIs</li>
              <li>JWT & Sessions</li>
            </ul>
          </div>

          <div>
            <h3 className="font-['Space_Grotesk'] text-[18px] font-medium tracking-[-0.5px]">
              Database
            </h3>
            <ul className="mt-[12px] space-y-2 text-[15px] text-[#686868]">
              <li>PostgreSQL</li>
              <li>Schema design</li>
              <li>Query optimization</li>
            </ul>
          </div>

          <div>
            <h3 className="font-['Space_Grotesk'] text-[18px] font-medium tracking-[-0.5px]">
              Tools & Deploy
            </h3>
            <ul className="mt-[12px] space-y-2 text-[15px] text-[#686868]">
              <li>Git & GitHub</li>
              <li>Vercel</li>
              <li>Render</li>
              <li>Cloudinary</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* What I'm looking for */}
      <motion.section
        className="mx-auto mt-[100px] grid w-[90%] max-w-[1200px] grid-cols-1 gap-[60px] border-t border-[#d8d7d2] pt-[60px] md:grid-cols-[.3fr_.7fr]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div>
          <p className="font-sans text-[13px] font-semibold tracking-[1.8px] text-[#686868]">
            03 — WHAT I'M LOOKING FOR
          </p>
        </div>

        <div className="min-w-0 max-w-[640px] space-y-[22px] break-words text-[17px] leading-[1.85] text-[#3a3a3a]">
          <p>
            I'm open to freelance work, contract roles, and full-time
            positions where I can build real products with real users. I'm
            most useful when there's a backend to think through — APIs,
            database design, authentication, payments, or anything that
            requires careful decisions before code.
          </p>

          <p>
            I'm also happy to collaborate on open source, especially in the
            Node.js and PostgreSQL space. If you're building something
            interesting and want an extra pair of hands, reach out.
          </p>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="mx-auto mt-[100px] mb-[150px] w-[90%] max-w-[1200px] border-t border-[#d8d7d2] pt-[60px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-[600px] font-['Space_Grotesk'] text-[36px] font-medium leading-[1.1] tracking-[-1.5px] md:text-[48px]">
              Got something you want{" "}
              <em className="not-italic text-[#315bea]">built well</em>?
            </h2>

            <p className="mt-[20px] max-w-[480px] text-[17px] leading-[1.75] text-[#686868]">
              I reply to every message. Send me a project, an idea, or just
              say hello.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:judgesnigbinosa@gmail.com"
              className="inline-flex max-w-full items-center gap-3 break-all border-b border-[#171717] pb-2 font-['Space_Grotesk'] text-[17px] font-medium transition-colors hover:text-[#315bea]"
            >
              <Mail size={18} strokeWidth={1.8} />
              judgesnigbinosa@gmail.com
              <ArrowUpRight size={17} strokeWidth={1.8} />
            </a>

            <div className="flex gap-5">
              <a
                href="https://github.com/DevbyNosa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#686868] transition-colors hover:text-[#171717]"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/devbynosa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#686868] transition-colors hover:text-[#171717]"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://x.com/DevByNosa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#686868] transition-colors hover:text-[#171717]"
                aria-label="X"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
    <Footer />
    </>
  );
}