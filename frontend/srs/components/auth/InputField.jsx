const InputField = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  error = "",
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-[#374151]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          outline-none
          transition-all

          ${
            error
              ? "border-red-500 focus:ring-red-100 focus:border-red-500"
              : "border-gray-200 focus:border-[#2563EB] focus:ring-blue-100"
          }

          focus:ring-4
        `}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;