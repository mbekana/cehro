import React from 'react';

interface DividerProps {
  borderColor?: string;   
  borderThickness?: string; 
  marginTop?: string;     
  marginBottom?: string;    
}

const Divider: React.FC<DividerProps> = ({
  borderColor = 'border-gray-300',  
  borderThickness = 'border-t-2', 
  marginTop = 'mt-4',             
  marginBottom = 'mb-4',         
}) => {
  return (
    <div className={`${borderThickness} ${borderColor} ${marginTop} ${marginBottom}`}>
   
    </div>
  );
};

export default Divider;
