import {
  Receipt,
  FileText,
  CreditCard,
  Zap,
  Shield,
  BarChart3,
} from 'lucide-react';
import Image from 'next/image';
const features = [
  {
    icon: <Image src="/images/next.svg" alt="Next.js" width={24} height={24} className="h-6 w-6" />,
    title: 'Next.js',
    desc: 'Build lightning-fast UI components with a simplified Next.js setup, perfect for learning and creating.',
  },
  {
    icon: <Image src="/images/typescript.png" alt="React" width={24} height={24} className="h-6 w-6" />,
    title: 'TypeScript',
    desc: 'Enhance your code quality and catch errors early. Our kit includes TypeScript, ensuring a smoother development experience.',
  },
  {
    icon: <Image src="/images/Tailwind_CSS_Logo.png" alt="Tailwind CSS" width={24} height={24} className="h-6 w-6" />,
    title: 'Tailwind CSS',
    desc: 'Rapidly build and design beautiful UIs. Our kit comes ready with Tailwind CSS for utility-first styling.',
  },
  {
    icon: <Image src="/images/shadcn-ui-logo.png" alt="Shadcn UI" width={24} height={24} className="h-6 w-6" />,
    title: 'Shadcn UI',
    desc: 'Build stunning, accessible UIs. Our kit includes shadcn/ui, giving you a collection of customizable, high-quality components.',
  },
  {
    icon: <Image src="/images/framer-motion.svg" alt="Framer Motion" width={24} height={24} className="h-6 w-6" />,
    title: 'Framer Motion',
    desc: 'Add elegant and interactive animations to your UI components with ease. Our kit includes Framer Motion for seamless motion.',
  },
  {
    icon: <Image src="/images/react-icon.jpg" alt="React.js" width={24} height={24} className="h-6 w-6" />,
    title: 'React.js',
    desc: 'The industry-standard for building modern user interfaces. Our kit gives you a solid foundation with the power of React.',
  },
];

export default function Feature1() {
  return (
    <section className="bg-black py-14 text-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-3xl font-normal sm:text-4xl md:text-5xl">
            Features
          </h3>
        </div>
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="transform-gpu space-y-4 rounded-xl border border-[#2B6CB0]/20 bg-[#0D1117] p-6 transition-all duration-300 hover:scale-[1.03] hover:border-[#2B6CB0] hover:bg-[#0D1117] hover:shadow-2xl hover:shadow-[#2B6CB0]/10 cursor-pointer"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-white">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold tracking-tight text-white">
                  {item.title}
                </h4>
                <p className="text-[#A0AEC0]">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}