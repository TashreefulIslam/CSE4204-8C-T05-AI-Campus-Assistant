import { CheckCircle2, TrendingUp } from "lucide-react";

const FloatingCards = () => {
  return (
    <>
      {/* Quiz Card */}
      <div className="absolute -left-8 top-1/4 bg-white rounded-2xl p-3 shadow-xl border border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
          <CheckCircle2 size={18} className="text-emerald-600" />
        </div>

        <div>
          <p className="text-xs font-bold text-[#1F2937]">
            Quiz Completed!
          </p>

          <p className="text-[10px] text-gray-400">
            Score: 94 / 100
          </p>
        </div>
      </div>

      {/* GPA Card */}
      <div className="absolute -right-6 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
        <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
          Current GPA
        </p>

        <p className="text-2xl font-bold text-[#2563EB]">
          3.85
        </p>

        <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-semibold">
          <TrendingUp size={10} />
          +0.3 this semester
        </p>
      </div>
    </>
  );
};

export default FloatingCards;