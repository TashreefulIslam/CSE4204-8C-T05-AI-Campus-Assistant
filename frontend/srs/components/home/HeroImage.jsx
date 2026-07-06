import FloatingCards from "./FloatingCards";

const HeroImage = () => {
  return (
    <div className="relative hidden md:block">

      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 ring-1 ring-gray-100">

        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=500&fit=crop&auto=format"
          alt="Students studying"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#2563EB]/15 to-transparent"></div>

      </div>

      <FloatingCards />

    </div>
  );
};

export default HeroImage;