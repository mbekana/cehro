type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
  
  const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
          className="h-4 w-4 text-primary focus:ring-2 focus:ring-primary"
        />
        <span className="text-text-primary">{label}</span>
      </label>
    );
  };
  
  export default Checkbox;
  