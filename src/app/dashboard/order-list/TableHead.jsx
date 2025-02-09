export function TableHead() {
  return (
    <thead className="w-full">
      <tr className="w-full">
        <th className="border-b py-2">Customer Name</th>
        <th className="border-b py-2">Table</th>
        <th className="border-b py-2">Status</th>
        <th className="border-b py-2">Total</th>
        <th className="border-b py-2">Date</th>
        <th className="border-b py-2">Time</th>
        <th className="border-b py-2 w-1/12" colSpan={2}>
          Action
        </th>
      </tr>
    </thead>
  );
}
