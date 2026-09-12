import { ArrowUpRight } from "lucide-react";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f3ef] px-5 text-[#171717]">
      <div className="w-full max-w-[420px]">

        {/* Brand */}
        <div className="mb-[55px] text-center font-['Space_Grotesk'] text-[21px] font-bold tracking-[-0.5px]">
          Devby<span className="text-[#315bea]">Nosa</span>
        </div>

        {/* Header */}
        <div className="mb-[35px]">
          <p className="mb-[10px] font-sans text-[10px] font-semibold tracking-[1.8px] text-[#686868]">
            ADMIN PANEL
          </p>

          <h1 className="font-['Space_Grotesk'] text-[42px] font-medium leading-none tracking-[-2px]">
            Welcome back.
          </h1>

          <p className="mt-[15px] max-w-[350px] font-sans text-[14px] leading-[1.7] text-[#686868]">
            Sign in to manage your portfolio, projects, writing and site
            content.
          </p>
        </div>

        {/* Login Form */}
        <form className="border-t border-[#d8d7d2] pt-[30px]">

          {/* Email */}
          <div className="mb-[25px]">
            <label
              htmlFor="email"
              className="mb-2 block font-sans text-[10px] font-semibold tracking-[1px] text-[#686868]"
            >
              EMAIL
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              className="w-full border-b border-[#c9c8c3] bg-transparent px-0 py-[13px] font-sans text-[14px] outline-none placeholder:text-[#aaa] focus:border-[#171717]"
            />
          </div>

          {/* Password */}
          <div className="mb-[25px]">
            <label
              htmlFor="password"
              className="mb-2 block font-sans text-[10px] font-semibold tracking-[1px] text-[#686868]"
            >
              PASSWORD
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border-b border-[#c9c8c3] bg-transparent px-0 py-[13px] font-sans text-[14px] outline-none placeholder:text-[#aaa] focus:border-[#171717]"
            />
          </div>

          {/* Options */}
          <div className="mt-[10px] mb-[30px] flex items-center justify-between">

            <label className="flex items-center gap-2 font-sans text-[12px] text-[#686868]">
              <input
                type="checkbox"
                className="h-[13px] w-[13px] accent-[#315bea]"
              />
              Remember me
            </label>

            <a
              href="#"
              className="font-sans text-[12px] text-[#686868] transition-colors hover:text-[#315bea]"
            >
              Forgot password?
            </a>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-[3px] bg-[#171717] px-[22px] py-[16px] font-sans text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#315bea]"
          >
            Sign in
            <ArrowUpRight size={15} strokeWidth={2} />
          </button>

        </form>

        {/* Footer */}
        <p className="mt-[40px] text-center font-sans text-[15px] text-[#999]">
          DevbyNosa Admin · Private area
        </p>

      </div>
    </main>
  );
}