export default function Process() {
  const steps = [
    {
      number: "1",
      title: "Clone the repository",
      description: "Get your journey started instantly. Simply clone the repository to your machine to access all the tools and features you need to begin building."
    },
    {
      number: "2",
      title: "Install dependencies",
      description: "Save time with a simple command. Our kit's dependencies will be installed for you, giving you everything you need to start building."
    },
    {
      number: "3",
      title: "Launch & Customize: Run the Dev Server",
      description: "Kickstart your project with a single command. Your local dev server will launch, and you can immediately begin customizing components and seeing your changes in real-time."
    }
    
  ];

  return (
    <section id="process" className="py-16 bg-[#2B6CB0]">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
        <h3 className="mt-4 text-3xl text-white font-normal sm:text-4xl md:text-5xl">
             How we work
            </h3>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Number Circle */}
                             <div className="relative inline-flex items-center justify-center mb-6">
                 {/* Dotted outline circle */}
                 <div className="absolute w-20 h-20 border-2 border-dashed border-gray-300 rounded-full"></div>
                 {/* Number circle */}
                 <div className="relative w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                   <span className="text-white font-bold text-2xl">{step.number}</span>
                 </div>
               </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-black mb-3">
                {step.title}
              </h3>
              <p className="text-white leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}