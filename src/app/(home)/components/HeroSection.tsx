const HeroSection = () => {
  return (
    <section className="bg-hero-section">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r h-full"></div>

      <div className="relative mx-auto max-w-screen-2xl px-4 py-24 lg:py-6 sm:px-6 lg:flex lg:h-[calc(100vh-82px)] lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Your Bridge to
            <strong className="block font-extrabold text-[#7B3B99]">
              {" "}
              Legal Expertise.{" "}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Empowering You with Comprehensive Legal Solutions and Expertise,
            Bridging the Gap Between Legal Complexity and Your Peace of Mind !
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
