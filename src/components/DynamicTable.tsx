import React from 'react';

interface DynamicTableProps {
  data: any[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No hay datos para mostrar.</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border px-4 py-2 bg-gray-100">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col} className="border px-4 py-2">{String(row[col])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
