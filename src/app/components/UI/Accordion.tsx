import { useState } from 'react';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer py-3 px-4 text-xl font-semibold text-text-primary"
      >
        {title}
      </div>
      {isOpen && <div className="py-3 px-4">{children}</div>}
    </div>
  );
};

export default Accordion;
