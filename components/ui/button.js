export function Button({ children, ...props }) {
  return <button {...props} className="bg-white text-black py-2 px-4 rounded">{children}</button>
}