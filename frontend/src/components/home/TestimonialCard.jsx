import { Star } from "lucide-react";

const TestimonialCard = ({
  name,
  role,
  rating,
  comment,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-8
      shadow-sm
      border
      border-gray-100
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-xl"
    >
      {/* Stars */}

      <div className="flex gap-1 mb-5">

        {[...Array(rating)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}

      </div>

      {/* Comment */}

      <p className="text-gray-500 leading-relaxed italic">
        "{comment}"
      </p>

      {/* User */}

      <div className="flex items-center gap-4 mt-7">

        <div
          className="
          w-12
          h-12
          rounded-full
          bg-[#2563EB]
          text-white
          flex
          items-center
          justify-center
          font-bold"
        >
          {name.charAt(0)}
        </div>

        <div>

          <h4 className="font-bold text-[#1F2937]">
            {name}
          </h4>

          <p className="text-sm text-gray-500">
            {role}
          </p>

        </div>

      </div>
    </div>
  );
};

export default TestimonialCard;