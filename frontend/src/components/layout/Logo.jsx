import { Brain } from "lucide-react";

const Logo = ({ compact = false }) => {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer">
      <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-lg shadow-blue-500/30">
        <Brain size={16} className="text-white" />
      </div>

      {!compact && (
        <span className="font-bold text-[#1F2937] text-sm leading-tight">
          AI Campus
          <br />
          <span className="text-[#2563EB]">Assistant</span>
        </span>
      )}
    </div>
  );
};

export default Logo;