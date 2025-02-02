export default function Button({
  className = "bg-emerald-600  ring-emerald-800",
  children,
}) {
  return (
    <button
      className={`py-2 text-white active:ring-2 ring-offset-2 rounded-lg font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
