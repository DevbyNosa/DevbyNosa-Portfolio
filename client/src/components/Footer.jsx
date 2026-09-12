import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mx-auto mt-[150px] w-[90%] max-w-[1200px] border-t border-[#d8d7d2]">

      {/* MAIN FOOTER */}
      <div className="grid gap-[60px] py-[70px] md:grid-cols-[1fr_.35fr_.35fr]">

        {/* BRAND */}
        <div>
          <a
            href="#"
            className="font-['Space_Grotesk'] text-[24px] font-bold text-[#171717]"
          >
            Devby<span className="text-[#315bea]">Nosa</span>
          </a>

          <p className="mt-[15px] max-w-[330px] text-[14px] leading-[1.7] text-[#686868]">
            Full-stack developer building useful websites and web
            applications from Nigeria.
          </p>
        </div>


        {/* NAVIGATION */}
        <div>
          <p className="mb-[18px] text-[10px] font-semibold tracking-[1.5px] text-[#686868]">
            NAVIGATION
          </p>

          <div className="flex flex-col items-start gap-[12px]">

            <a
              href="#work"
              className="text-[13px] text-[#686868] transition-colors hover:text-[#171717]"
            >
              Work
            </a>

            <a
              href="#about"
              className="text-[13px] text-[#686868] transition-colors hover:text-[#171717]"
            >
              About
            </a>

            <a
              href="#writing"
              className="text-[13px] text-[#686868] transition-colors hover:text-[#171717]"
            >
              Writing
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-[13px] text-[#686868] transition-colors hover:text-[#171717]"
            >
              Contact
              <ArrowUpRight size={13} strokeWidth={1.8} />
            </a>

          </div>
        </div>


        {/* SOCIALS */}
        <div>
          <p className="mb-[18px] text-[10px] font-semibold tracking-[1.5px] text-[#686868]">
            SOCIAL
          </p>

          <div className="flex flex-col items-start gap-[12px]">

            <a
              href="https://github.com/DevbyNosa/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[13px] text-[#686868] transition-colors hover:text-[#171717]"
            >
              <FaGithub size={16} />
              GitHub
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/devbynosa/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[13px] text-[#686868] transition-colors hover:text-[#171717]"
            >
              <FaLinkedin size={16} />
              LinkedIn
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="https://x.com/DevByNosa"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[13px] text-[#686868] transition-colors hover:text-[#171717]"
            >
              <FaXTwitter size={16} />
              X
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

          </div>
        </div>

      </div>


      {/* BOTTOM */}
      <div className="flex flex-col gap-[12px] border-t border-[#d8d7d2] py-[25px] text-[12px] text-[#686868] sm:flex-row sm:items-center sm:justify-between">

        <p>
          © {new Date().getFullYear()} DevbyNosa. All rights reserved.
        </p>


      </div>

    </footer>
  );
}
