export default function Button({
  className = "bg-gradient-to-r from-emerald-700 to-green-500",
  onClick = () => {},
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5  active:scale-90 py-2 text-sm text-white active:ring-2 ring-offset-2 rounded-lg font-semibold  transition-all ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
