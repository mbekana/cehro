import RadioButton from './RadioButton';

type RadioButtonGroupProps = {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ name, options, selectedValue, onChange }) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={onChange}
          label={option.label}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;
