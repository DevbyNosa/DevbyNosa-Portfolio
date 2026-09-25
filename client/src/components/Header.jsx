import { Link } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Resume from '../../public/resume.pdf'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="relative mx-auto flex h-[90px] w-[90%] max-w-[1200px] items-center justify-between border-b border-[#d8d7d2]">

      <Link
        to="/"
        className="font-['Space_Grotesk'] text-[20px] font-bold"
      >
        Devby<span className="text-[#315bea]">Nosa</span>
      </Link>

      <div className="hidden items-center gap-[35px] md:flex">
        <a
          href="/#experience"
          className="text-[16px] text-[#686868] transition-colors hover:text-[#171717]"
        >
          Work
        </a>

        <a
          href="/#about"
          className="text-[16px] text-[#686868] transition-colors hover:text-[#171717]"
        >
          About
        </a>

        <a
          href="/#projects"
          className="text-[16px] text-[#686868] transition-colors hover:text-[#171717]"
        >
         Projects
        </a>



          <a
          href="/#writing"
          className="text-[16px] text-[#686868] transition-colors hover:text-[#171717]"
        >
        Blog
        </a>

        <a href='/resume.pdf'
          download={Resume}>
            Resume
          </a>

      </div>

      <div className="flex items-center gap-3">
        <a
          href="/#contact"
          className="hidden items-center gap-1 text-[16px] font-semibold transition-colors hover:text-[#315bea] sm:flex"
        >
          Let's talk
          <ArrowUpRight size={15} strokeWidth={2} />
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center text-[#171717] md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-[90px] z-40 border-b border-[#d8d7d2] bg-[#f4f3ef] px-5 py-4 shadow-sm md:hidden">
          <div className="flex flex-col gap-1">
            <a href="/#experience" onClick={closeMenu} className="py-3 text-[16px] text-[#686868]">Work</a>
            <a href="/#about" onClick={closeMenu} className="py-3 text-[16px] text-[#686868]">About</a>
            <a href="/#projects" onClick={closeMenu} className="py-3 text-[16px] text-[#686868]">Projects</a>
            <a href="/#writing" onClick={closeMenu} className="py-3 text-[16px] text-[#686868]">Blog</a>
            <a href="/resume.pdf" download={Resume} onClick={closeMenu} className="py-3 text-[16px] text-[#686868]">Resume</a>
            <a href="/#contact" onClick={closeMenu} className="flex items-center gap-1 py-3 text-[16px] font-semibold">Let's talk <ArrowUpRight size={15} strokeWidth={2} /></a>
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar