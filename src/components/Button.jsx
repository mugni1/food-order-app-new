export default function Button({
  className = "bg-emerald-600  ring-emerald-800",
  onClick = () => {},
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5  active:scale-90 py-2 text-white active:ring-2 ring-offset-2 rounded-lg font-semibold  transition-all ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
