type SelectProps = {
    label: string;
    options: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  
  const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <select
          value={value}
          onChange={onChange}
          className="py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        >
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Select;
  