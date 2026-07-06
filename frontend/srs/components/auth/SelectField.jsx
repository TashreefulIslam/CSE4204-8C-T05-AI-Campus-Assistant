const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-[#374151]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-gray-200
          bg-white
          text-gray-700
          outline-none
          transition-all
          focus:border-[#2563EB]
          focus:ring-4
          focus:ring-blue-100
        "
      >
        <option value="">Select Department</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;