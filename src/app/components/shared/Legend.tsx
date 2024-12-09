import React from "react";

const Legend = ({ legendItems }: { legendItems: any }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {legendItems.map((item:any, index:number) => (
        <div
          key={item.color || index} 
          style={{
            backgroundColor: item.color,
            flex: 1,
            display: "flex",
            alignItems: "center", 
            justifyContent: "center",
            color: item.textColor != null ? item.textColor : "black",
            fontWeight: "bolder",
            fontSize: "1em",
            height: "10vh",
          }}
        >
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
