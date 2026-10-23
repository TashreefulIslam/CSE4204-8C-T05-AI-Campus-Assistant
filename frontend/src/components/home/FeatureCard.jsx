const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-8
      border
      border-gray-100
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      hover:border-blue-200
      group"
    >
      <div
        className="
        w-14
        h-14
        rounded-2xl
        bg-blue-100
        flex
        items-center
        justify-center
        group-hover:bg-[#2563EB]
        transition-colors"
      >
        <Icon
          size={28}
          className="
          text-[#2563EB]
          group-hover:text-white
          transition-colors"
        />
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#1F2937]">
        {title}
      </h3>

      <p className="mt-3 text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;