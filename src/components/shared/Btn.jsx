export default function Btn({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}