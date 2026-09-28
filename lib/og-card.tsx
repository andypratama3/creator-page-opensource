import type { PlatformStat } from "./content-types"

export function OgCard({
  eyebrow,
  name,
  sub,
  stats,
}: {
  eyebrow: string
  name: string
  sub: string
  stats: PlatformStat[]
}) {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#17141f",
        padding: "72px 84px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-220px",
          right: "-120px",
          width: "620px",
          height: "620px",
          borderRadius: "50%",
          backgroundColor: "#6d28d9",
          opacity: 0.32,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#8b5cf6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "30px",
            fontWeight: 800,
          }}
        >
          {name.charAt(0)}
        </div>
        <div style={{ color: "#a78bfa", fontSize: "26px", letterSpacing: "4px", fontWeight: 700 }}>
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ color: "#fff", fontSize: "104px", fontWeight: 800, lineHeight: 1 }}>{name}</div>
        <div style={{ color: "#b6b3c4", fontSize: "36px", lineHeight: 1.3 }}>{sub}</div>
      </div>

      <div style={{ display: "flex", gap: "56px" }}>
        {stats.slice(0, 4).map((s) => (
          <div key={s.platform} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ color: "#fff", fontSize: "52px", fontWeight: 800 }}>
              {`${s.value}${s.suffix}`}
            </div>
            <div style={{ color: "#8e8b9d", fontSize: "24px" }}>{`${s.platform} ${s.label}`}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
