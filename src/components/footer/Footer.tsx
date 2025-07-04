export default function Footer() {
  return (
    <footer className="w-full bg-[#fadde1] text-white dark:bg-[#1E1E1E]">
      <div className="flex flex-col items-center justify-between gap-10 p-8 md:flex-row md:items-start">
        <div className="flex w-full flex-col items-start gap-4 md:w-1/2">
          <div className="h-20 w-20">
            <img
              src="/assets/imgs/logo.png"
              alt="Logo"
              className="max-h-full max-w-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#8b5d67] dark:text-white">
            SMART PHONES AND APP GAME BUSINESS
          </h2>
          <p className="max-w-md text-sm text-[#333] dark:text-[#B0B0B0]">
            We deliver cutting-edge mobile app and game development solutions.
            Our goal is to bring your ideas to life with high-performance
            technology and engaging user experience.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <h3 className="text-lg font-semibold text-[#8b5d67] dark:text-white">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-4 text-xl text-[#333] dark:text-[#B0B0B0]">
            <li>
              <a href="#" className="transition hover:text-black">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-black">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-black">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-black">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text_para border-t border-white/20 py-4 text-center">
        &copy; {new Date().getFullYear()} DashDah Commerce. All rights reserved.
      </div>
    </footer>
  );
}
