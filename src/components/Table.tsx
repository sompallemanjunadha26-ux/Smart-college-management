import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function Table<T>({ data, columns, className = '' }: TableProps<T>) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-slate-200 ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-bottom border-slate-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data.map((item, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 text-sm text-slate-700">
                  {typeof col.accessor === 'function'
                    ? col.accessor(item)
                    : (item[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
