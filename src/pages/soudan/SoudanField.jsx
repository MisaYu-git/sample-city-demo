export function SoudanField({ label, value }) {
  return (
    <div className="grid-wide">
      <span className="lbl">{label}</span>
      <span
        className="val"
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        {value || "（記載なし）"}
      </span>
    </div>
  );
}
