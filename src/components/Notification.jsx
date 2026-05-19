export default function Notification({ icon, msg, onClose }) {
  return (
    <div className="fixed top-5 right-5 bg-[#111827] text-white px-4 py-3 rounded-lg shadow-lg border border-white/10 z-50">
      <div className="flex items-center gap-3">
        <span>{icon}</span>

        <p className="text-sm">{msg}</p>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}