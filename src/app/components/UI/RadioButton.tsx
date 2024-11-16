type RadioButtonProps = {
    name: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
    label: string;
  };
  
  const RadioButton: React.FC<RadioButtonProps> = ({ name, value, checked, onChange, label }) => {
    return (
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="h-4 w-4 text-primary focus:ring-2 focus:ring-primary"
        />
        <span className="text-text-primary">{label}</span>
      </label>
    );
  };
  
  export default RadioButton;
  