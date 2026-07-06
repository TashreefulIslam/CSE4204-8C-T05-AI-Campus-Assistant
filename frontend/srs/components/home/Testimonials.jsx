import testimonials from "../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-[#2563EB] font-bold uppercase tracking-wider">
            Testimonials
          </span>

          <h2 className="mt-3 text-4xl font-bold text-[#1F2937]">
            Loved by Students
            <br />
            and Faculty
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Discover how AI Campus Assistant is improving academic life for
            students and educators.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;