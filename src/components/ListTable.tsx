import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ListTableProps {
  headers: string[];
  data: any[];
  actions: any;
  onAccion: any;
}

const ListTable: React.FC<ListTableProps> = ({
  data,
  headers,
  actions,
  onAccion,
}) => {
  const navigate = useNavigate();

  const renderTooltip = (obj: any) => (
    <div className="p-2 max-w-70 text-xs text-white bg-graydark rounded shadow-lg z-50">
      {Object.entries(obj)
        .filter(([k]) => k !== 'created_at' && k !== 'createdAt')
        .map(([k, v]) => (
          <div key={k}>
            <span className="font-semibold">{k}:</span>{' '}
            {typeof v === 'object' && v !== null
              ? 'id' in v && v.id !== undefined
                ? `ID: ${v.id}`
                : '[obj]'
              : String(v)}
          </div>
        ))}
    </div>
  );

  // Helper to format date strings
  const formatDate = (value: any) => {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Listado</h3>
            <button
              type="button"
              className="flex items-center gap-2 w-fit text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium"
              onClick={() => navigate(-1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    {headers.map((header: any) => (
                      <th
                        key={header}
                        className="px-6 py-3 font-medium text-gray-900 dark:text-white"
                      >
                        {header}
                      </th>
                    ))}
                    <th scope="col" className="px-6 py-3">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className="odd:bg-white odd:dark:bg-boxdark even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      {headers.map((key) => {
                        const value = item[key];
                        // Boolean
                        if (typeof value === 'boolean') {
                          return (
                            <td
                              key={key}
                              className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              <span
                                className={`px-2 py-1 rounded-full ${
                                  value
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {value ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>
                          );
                        }
                        // Date string
                        if (
                          typeof value === 'string' &&
                          value.match(/^\d{4}-\d{2}-\d{2}T/)
                        ) {
                          return (
                            <td
                              key={key}
                              className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {formatDate(value)}
                            </td>
                          );
                        }
                        // Nested object
                        if (typeof value === 'object' && value !== null) {
                          return (
                            <td
                              key={key}
                              className="px-6 py-4 font-medium text-gray-900 dark:text-white relative group"
                            >
                              <span className="underline cursor-pointer">
                                {'id' in value && value.id !== undefined
                                  ? value.id
                                  : 'Ver'}
                              </span>
                              <div className="absolute left-0 top-full mt-1 z-50 hidden group-hover:block w-max min-w-[200px] pointer-events-none">
                                <div className="pointer-events-auto p-2 text-xs text-white bg-gray-800 border border-gray-700 rounded shadow-lg">
                                  {renderTooltip(value)}
                                </div>
                              </div>
                            </td>
                          );
                        }
                        // Default
                        return (
                          <td
                            key={key}
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {value}
                          </td>
                        );
                      })}
                      <td className="px-6 py-4 space-x-2">
                        {actions.map((action: any) => (
                          <button
                            key={action.nombre}
                            onClick={() => onAccion(action.nombre, item)}
                          >
                            {action.etiqueta}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTable;
