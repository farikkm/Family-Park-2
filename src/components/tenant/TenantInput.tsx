interface TenantInputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  maxLength?: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const TenantInput = ({
  label,
  name,
  type = "text",
  value,
  placeholder = "",
  maxLength,
  handleChange,
}: TenantInputProps) => {
  return (
    <label className="flex flex-col mb-3">
      <span className="text-[#858585] font-bold">{label}</span>
      <input
        required
        className="*:font-thin py-1 border-b"
        type={type}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        name={name}
        maxLength={maxLength}
      />
    </label>
  );
};

export default TenantInput;