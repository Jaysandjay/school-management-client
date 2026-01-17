import { Link } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import { useState } from 'react';

interface Column<RowType> {
  key: keyof RowType;
  label: string;
}

interface TableProps<RowType extends object> {
  columns: readonly Column<RowType>[];
  rows: readonly RowType[];
  urls?: string;
  idField: keyof RowType;
  addButtonOnClick?: (row: RowType) => void;
  addButtonTitle?: string;
  addButtonColor?: string;
  checked?: boolean;
  maxHeight?: string;
  searchBar?: boolean;
  height?: string;
}

export default function Table<RowType extends object>({
  searchBar = true,
  maxHeight,
  checked,
  addButtonColor = 'bg-green-600',
  addButtonTitle,
  addButtonOnClick,
  columns,
  rows,
  urls,
  idField,
}: TableProps<RowType>) {
  const [search, setSearch] = useState('');
  const [activeColumn, setActiveColumn] = useState<keyof RowType>(
    columns[1].key,
  );

  const filteredRows = rows.filter((row) => {
    const value = row[activeColumn];
    return String(value).toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-0 flex flex-col h-full">
      {searchBar && (
        <div className="flex gap-3 mb-4 shrink-0">
          <select
            className="rounded border px-3 py-2"
            onChange={(e) => setActiveColumn(e.target.value as keyof RowType)}
          >
            {columns.map((col) => (
              <option key={String(col.key)} value={String(col.key)}>
                {col.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search..."
            className="flex-1 rounded border px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <div
        className={`${maxHeight && maxHeight}  min-h-0 flex-1 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-sm`}
      >
        <table className="min-w-full border-collapse flex-1">
          <thead className="bg-slate-100 sticky top-0 z-1">
            <tr>
              {checked && <th></th>}
              {columns.map((col) => (
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-slate-700"
                  key={String(col.key)}
                >
                  {col.label}
                </th>
              ))}
              {urls && (
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  More
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {filteredRows.map((row) => (
              <tr key={String(row[idField])} className="hover:bg-slate-50">
                {checked && <td className="pl-2">✅</td>}
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-3 text-sm text-slate-800"
                  >
                    {String(row[col.key])}
                  </td>
                ))}
                {urls && (
                  <td className="px-4 py-3">
                    <div className="flex justify-between ">
                      <Link to={`${urls}/${row[idField]}`}>
                        <PrimaryButton title="View" />
                      </Link>
                      {addButtonOnClick && addButtonTitle && (
                        <PrimaryButton
                          color={addButtonColor}
                          title={addButtonTitle}
                          onclick={() => addButtonOnClick(row)}
                        />
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
