export default function StatCard({ label, value }) {
  return (
    <div>
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
}