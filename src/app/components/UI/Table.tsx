// import React, { useState } from 'react';

// // Define the TableProps interface with a generic type parameter 'T'
// interface TableProps<T> {
//   columns: (keyof T)[];   // Column headers, typed as the keys of T
//   data: T[];              // Data rows (array of objects of type T)
//   sortKey?: keyof T;      // Optional column to sort by (key of T)
// }

// const Table = <T extends object>({ columns, data, sortKey }: TableProps<T>) => {
//   const [sortedData, setSortedData] = useState<T[]>(data);
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

//   // Handle sorting of the table
//   const handleSort = (key: keyof T) => {
//     const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
//     const sorted = [...data].sort((a, b) => {
//       if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
//       if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
//       return 0;
//     });
//     setSortedData(sorted);
//     setSortOrder(newSortOrder);
//   };

//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="bg-gray-100 text-gray-600">
//             {columns.map((col, index) => (
//               <th
//                 key={index}
//                 className="p-2 text-left cursor-pointer"
//                 onClick={() => handleSort(col)} // Use keyof T for sorting
//               >
//                 {col as string} {/* Casting the key to string */}
//                 {sortKey === col && (
//                   <span className={`ml-2 ${sortOrder === 'asc' ? '↑' : '↓'}`}></span>
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.map((row, rowIndex) => (
//             <tr key={rowIndex} className="border-t hover:bg-gray-50">
//               {columns.map((col, colIndex) => (
//                 <td key={colIndex} className="p-2 text-gray-700">
//                   {/* Render the value of the row column */}
//                   {row[col] as React.ReactNode} {/* Ensure it's renderable */}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
"use-client";

import React from 'react';

// Utility function to get nested values from an object by path
const getNestedValue = (obj: Record<string, any>, path: string): any => {
  const keys = path.split('.');
  let value = obj;
  for (const key of keys) {  // Change 'let' to 'const' here
    value = value?.[key]; 
    if (value === undefined || value === null) {
      return ''; 
    }
  }
  return value;
};

interface TableProps {
  columns: string[]; 
  data: Record<string, any>[]; 
  sortKey?: string; 
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-sm w-full">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-[14px]">
            {columns.map((col, index) => (
              <th key={index} className="p-2 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="p-2 text-gray-700">
                  {col === 'incident_happened' ? (
                    <>
                      <div>{row[col]?.woreda}</div>
                      <div>{row[col]?.zone}</div>
                    </>
                  ) : (
                    getNestedValue(row, col)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
