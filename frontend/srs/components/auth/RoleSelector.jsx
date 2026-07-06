const roles = [
  {
    value: "student",
    label: "Student",
  },
  {
    value: "teacher",
    label: "Teacher",
  },
];

const RoleSelector = ({ value, onChange }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-[#374151]">
        Role <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-2 gap-3">

        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => onChange(role.value)}
            className={`
              py-3
              rounded-xl
              font-semibold
              border
              transition-all
              duration-200

              ${
                value === role.value
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-300/40"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#2563EB]"
              }
            `}
          >
            {role.label}
          </button>
        ))}

      </div>
    </div>
  );
};

export default RoleSelector;