import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function Navbar() {
  return (
    <nav className="mx-auto flex h-[90px] w-[90%] max-w-[1200px] items-center justify-between border-b border-[#d8d7d2]">

      <Link
        to="/"
        className="font-['Space_Grotesk'] text-[20px] font-bold"
      >
        Devby<span className="text-[#315bea]">Nosa</span>
      </Link>

      <div className="hidden items-center gap-[35px] md:flex">
        <a
          href="#experience"
          className="text-[16px] text-[#686868] transition-colors hover:text-[#171717]"
        >
          Work
        </a>

        <a
          href="#about"
          className="text-[16px] text-[#686868] transition-colors hover:text-[#171717]"
        >
          About
        </a>

        <a
          href="#projects"
          className="text-[16px] text-[#686868] transition-colors hover:text-[#171717]"
        >
         Projects
        </a>

           <a
          href="#contact"
          className="text-[16px] text-[#686868] transition-colors hover:text-[#171717]"
        >
        Contact
        </a>

          <a
          href="#writing"
          className="text-[16px] text-[#686868] transition-colors hover:text-[#171717]"
        >
        Blog
        </a>
      </div>

      <a
        href="#contact"
        className="flex items-center gap-1 text-[16px] font-semibold transition-colors hover:text-[#315bea]"
      >
        Let's talk
        <ArrowUpRight size={15} strokeWidth={2} />
      </a>

    </nav>
  )
}

export default Navbar