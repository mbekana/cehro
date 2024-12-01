"use client";

import React from 'react';
import ActionDropdown from './ActionDropdown';  // Import the custom dropdown component

interface TableProps {
  columns: string[];
  data: Record<string, any>[]; 
  onAction: (action: string, row: Record<string, any>) => void;  // Added handler for actions
}

const Table: React.FC<TableProps> = ({ columns, data, onAction }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-sm w-full">
      <div className="hidden md:block">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-[14px]">
              {columns.map((col, index) => (
                <th key={index} className="p-2 text-left text-xs md:text-sm lg:text-base">
                  {col}
                </th>
              ))}
              <th className="p-2 text-left text-xs md:text-sm lg:text-base">Actions</th> {/* Actions column */}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-2 text-gray-700 text-xs md:text-sm lg:text-base">
                    {col === 'incident_happened' ? (
                      <>
                        <div>{row[col]?.woreda}</div>
                        <div>{row[col]?.zone}</div>
                      </>
                    ) : (
                      // Directly render the value of the column
                      row[col]
                    )}
                  </td>
                ))}
                <td className="p-2">
                  <ActionDropdown onAction={(action) => onAction(action, row)} /> {/* Custom dropdown for actions */}
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
                {col === 'incident_happened' ? (
                  <div>
                    <div>{row[col]?.woreda}</div>
                    <div>{row[col]?.zone}</div>
                  </div>
                ) : (
                  // Directly render the value of the column
                  <span className="text-gray-700">{row[col]}</span>
                )}
              </div>
            ))}
            <div className="mt-4 ">
              <ActionDropdown onAction={(action) => onAction(action, row)} /> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
