import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Next.js Docs', href: 'https://nextjs.org/docs' },
    { name: 'TypeScript Docs', href: 'https://www.typescriptlang.org/docs/' },
    { name: 'Shadcn UI Docs', href: 'https://ui.shadcn.com/docs' },
    { name: 'Framer Motion Docs', href: 'https://www.framer.com/motion/' },
  ];

  return (
    <footer className="bg-[#0D1117] text-[#A0AEC0] py-8">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="text-center md:text-left">
          <p>&copy; {currentYear} Built for the Black CS Success Summit Hackathon 🚀</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-[#A0AEC0] hover:text-[#FFFFFF] transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}