import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: "single" | "multiple" | false;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // handle sorting
  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(col.key);
      setSortAsc(true);
    }
  };

  // handle row selection
  const handleRowSelect = (row: T) => {
    let newSelection: T[] = [];
    if (selectable === "multiple") {
      if (selectedRows.includes(row)) {
        newSelection = selectedRows.filter((r) => r !== row);
      } else {
        newSelection = [...selectedRows, row];
      }
    } else if (selectable === "single") {
      newSelection = selectedRows.includes(row) ? [] : [row];
    }
    setSelectedRows(newSelection);
    onRowSelect?.(newSelection);
  };

  // sort data
  let sortedData = [...data];
  if (sortKey) {
    sortedData.sort((a, b) => {
      const valA = a[sortKey as keyof T];
      const valB = b[sortKey as keyof T];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      {loading ? (
        <p className="p-4 text-center">Loading...</p>
      ) : data.length === 0 ? (
        <p className="p-4 text-center">No data available</p>
      ) : (
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {selectable && <th className="p-2"></th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`p-2 font-medium ${
                    col.sortable ? "cursor-pointer" : ""
                  }`}
                  onClick={() => handleSort(col)}
                >
                  {col.title}
                  {col.sortable &&
                    (sortKey === col.key ? (sortAsc ? " ↑" : " ↓") : " ↕")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr
                key={idx}
                className={`border-t hover:bg-gray-50 ${
                  selectedRows.includes(row) ? "bg-blue-50" : ""
                }`}
              >
                {selectable && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelect(row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-2">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
