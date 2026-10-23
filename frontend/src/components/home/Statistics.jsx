import statistics from "../../data/statistics";

const Statistics = () => {
  return (
    <section className="py-14 bg-[#2563EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {statistics.map((item) => (
            <div key={item.label}>

              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {item.value}
              </h2>

              <p className="mt-2 text-sm font-medium text-blue-200">
                {item.label}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Statistics;