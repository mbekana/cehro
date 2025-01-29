"use client";

import React from 'react';
import Tag from './Tag';  
import ActionDropdown from './ActionDropdown';  

interface TableProps {
  columns: string[];
  data: Record<string, any>[]; 
  onAction: (action: string, row: Record<string, any>) => void;  
  customTagProps?: Record<string, any>; 
}

const Table: React.FC<TableProps> = ({ columns, data, onAction, customTagProps }) => {
  return (
    <div className="bg-white rounded-sm w-full">
      <div className="hidden md:block">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-[14px]">
              {columns.map((col, index) => (
                <th key={index} className="p-2 text-left text-xs md:text-sm lg:text-base">
                  {col}
                </th>
              ))}
              <th className="p-2 text-left text-xs md:text-sm lg:text-base">Actions</th> 
            </tr>
          </thead>
          <tbody className="overflow-x-auto">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-2 text-gray-700 text-xs md:text-sm lg:text-base">
                    {col === 'status' ? (  
                      row[col] ? (
                        <Tag 
                          status={row[col]}  
                          customText={customTagProps?.customText || ''}  
                          customColor={customTagProps?.customColor || ''}  
                        />
                      ) : (
                        <span className="text-gray-500">No Data</span>
                      )
                    ) : col === 'incident_happened' ? (
                      row[col] ? (
                        <>
                          <div>{row[col]?.woreda || "No Data"}</div>
                          <div>{row[col]?.zone || "No Data"}</div>
                        </>
                      ) : (
                        <span className="text-gray-500">No Data</span>
                      )
                    ) : row[col] ? (
                      row[col]
                    ) : (
                      <span className="text-gray-500">No Data</span>
                    )}
                  </td>
                ))}
                <td className="p-2">
                  <ActionDropdown onAction={(action) => onAction(action, row)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="border-t p-4 hover:bg-gray-50">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="mb-2">
                <strong className="block text-sm text-gray-600">{col}:</strong>
                {col === 'status' ? (
                  row[col] ? (
                    <Tag 
                      status={row[col]}  
                      customText={customTagProps?.customText || ''} 
                      customColor={customTagProps?.customColor || ''}  
                    />
                  ) : (
                    <span className="text-gray-500">No Data</span>
                  )
                ) : col === 'incident_happened' ? (
                  row[col] ? (
                    <div>
                      <div>{row[col]?.woreda || "No Data"}</div>
                      <div>{row[col]?.zone || "No Data"}</div>
                    </div>
                  ) : (
                    <span className="text-gray-500">No Data</span>
                  )
                ) : row[col] ? (
                  <span className="text-gray-700">{row[col]}</span>
                ) : (
                  <span className="text-gray-500">No Data</span>
                )}
              </div>
            ))}
            <div className="mt-4">
              <ActionDropdown onAction={(action) => onAction(action, row)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
