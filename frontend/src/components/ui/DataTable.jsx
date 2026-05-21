import { Skeleton } from "@/components/ui/Skeleton";

export function DataTable({ columns, data, keyField = "id", isLoading = false }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-evora-border bg-evora-surface-secondary shadow-soft">
      <table className="w-full text-left text-sm text-evora-text-secondary">
        <thead className="border-b border-evora-border bg-evora-surface-muted text-xs font-semibold uppercase text-evora-text-primary">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-evora-border-soft">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <Skeleton className="h-5 w-3/4 rounded-md" />
                  </td>
                ))}
              </tr>
            ))
          ) : data && data.length > 0 ? (
            data.map((row) => (
              <tr 
                key={row[keyField]} 
                className="transition-colors duration-fast ease-premium hover:bg-evora-surface-hover"
              >
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
