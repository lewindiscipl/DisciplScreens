import { useState, useEffect } from "react";

const PHONE = "+919746488282";
const BASE = 2500;

const LOCATIONS = [
  { name: "Core Fitness Club", area: "Cherooty Road" },
  { name: "Fitpro Fitness", area: "Eranhipalam" },
  { name: "FitFat Studio", area: "Thondayad" },
  { name: "Greens Fitness", area: "Mankavu Road" },
  { name: "Alpha Fitness Zone", area: "Nanminda" },
  { name: "Alpha Fitness Zone", area: "Atholi" },
  { name: "Alpha Fitness Zone", area: "Chelannur" },
];

const DURATION_DISCOUNTS = [
  { months: 1, discount: 0 },
  { months: 2, discount: 0.08 },
  { months: 3, discount: 0.20 },
  { months: 4, discount: 0.26 },
  { months: 5, discount: 0.30 },
  { months: 6, discount: 0.35 },
  { months: 7, discount: 0.37 },
  { months: 8, discount: 0.39 },
  { months: 9, discount: 0.41 },
  { months: 10, discount: 0.42 },
  { months: 11, discount: 0.43 },
  { months: 12, discount: 0.45 },
];

const SCREEN_DISCOUNTS = [
  { screens: 1, discount: 0 },
  { screens: 2, discount: 0.08 },
  { screens: 3, discount: 0.15 },
  { screens: 4, discount: 0.15 },
  { screens: 5, discount: 0.22 },
  { screens: 6, discount: 0.22 },
  { screens: 7, discount: 0.28 },
];

const SECTORS = [
  "Supplements & Nutrition","Gymwear & Apparel","Salon & Grooming",
  "Skincare & Wellness","Café & Healthy Food","Clinic & Healthcare",
  "Real Estate","Education & Coaching","Electronics & Tech",
  "Hotels & Resorts","Jewellery & Fashion","Finance & Banking","Other",
];

function calcPrice(screens, months) {
  const dd = DURATION_DISCOUNTS.find(d => d.months === months)?.discount || 0;
  const sd = SCREEN_DISCOUNTS.find(d => d.screens === screens)?.discount || 0;
  const combined = Math.min(dd + sd, 0.70);
  const perScreen = Math.round(BASE * (1 - combined));
  const total = perScreen * screens * months;
  return { perScreen, total };
}

const RED = "#C0202A";
const FONT = "'Trebuchet MS', 'Segoe UI', sans-serif";

function LogoImage() {
  return (
    <div style={{ width: "220px", marginBottom: "12px" }}>
      <img src="logo.png" alt="DISCIPL Screens" style={{ width: "100%", display: "block" }} />
    </div>
  );
}

function ScreenIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
}

function NavButton({ icon, label, sub, onClick, accent }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      style={{
        width: "100%",
        background: accent ? RED : "#f5f5f5",
        color: accent ? "#fff" : "#111",
        border: "none",
        borderRadius: "12px",
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        cursor: "pointer",
        fontFamily: FONT,
        textAlign: "left",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.1s",
        boxShadow: accent ? "0 4px 16px rgba(192,32,42,0.25)" : "0 1px 4px rgba(0,0,0,0.06)",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        width: "42px", height: "42px",
        background: accent ? "rgba(255,255,255,0.15)" : "#e8e8e8",
        borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        color: accent ? "#fff" : RED,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "15px", fontWeight: "700" }}>{label}</div>
        <div style={{ fontSize: "12px", opacity: 0.6, marginTop: "2px" }}>{sub}</div>
      </div>
      <div style={{ marginLeft: "auto", opacity: 0.4, fontSize: "18px" }}>›</div>
    </button>
  );
}

function HomePage({ navigate }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT,
      padding: "32px 24px",
      boxSizing: "border-box",
    }}>
      <LogoImage />

      <p style={{
        fontSize: "11px",
        color: "#777",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        margin: "0 0 40px 0",
        textAlign: "center",
        fontWeight: "500",
      }}>
        Right Place · Right People · Real Impact
      </p>

      <div style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <NavButton
          icon={<ScreenIcon />}
          label="Our Screens"
          sub="7 premium gym locations"
          onClick={() => navigate("locations")}
        />
        <NavButton
          icon={<PriceIcon />}
          label="Pricing"
          sub="Build your custom quote"
          onClick={() => navigate("pricing")}
          accent
        />
      </div>

      <div style={{ marginTop: "40px", fontSize: "11px", color: "#ccc", letterSpacing: "0.5px", textAlign: "center" }}>
        A Habitoz Private Limited Brand
      </div>
    </div>
  );
}

function LocationsPage({ navigate }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: FONT, display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        position: "sticky",
        top: 0,
        background: "#fff",
        zIndex: 10,
      }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#111", padding: "0", lineHeight: 1 }}>‹</button>
        <div>
          <div style={{ fontSize: "17px", fontWeight: "800", color: "#111" }}>Our Screens</div>
          <div style={{ fontSize: "11px", color: "#999", letterSpacing: "1px" }}>7 GYM LOCATIONS · KOZHIKODE</div>
        </div>
      </div>

      <div style={{ background: "#fafafa", padding: "12px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "34px", height: "34px", background: RED, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>
        <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.4" }}>
          Premium digital screens inside active fitness communities across Kozhikode.
        </div>
      </div>

      <div style={{ padding: "4px 20px 24px" }}>
        {LOCATIONS.map((loc, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "14px 0",
            borderBottom: i < LOCATIONS.length - 1 ? "1px solid #f2f2f2" : "none",
          }}>
            <div style={{
              width: "34px", height: "34px",
              background: "#f5f5f5",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              fontWeight: "700",
              fontSize: "13px",
              color: RED,
            }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#111" }}>{loc.name}</div>
              <div style={{ fontSize: "12px", color: "#888", marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {loc.area}
              </div>
            </div>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }}/>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 20px 32px", marginTop: "auto" }}>
        <button onClick={() => navigate("pricing")} style={{
          width: "100%", background: RED, color: "#fff", border: "none",
          borderRadius: "10px", padding: "15px", fontSize: "15px", fontWeight: "700",
          cursor: "pointer", fontFamily: FONT, boxSizing: "border-box",
        }}>
          Get Pricing for These Screens →
        </button>
      </div>
    </div>
  );
}

function PricingPage({ navigate }) {
  const [screens, setScreens] = useState(5);
  const [months, setMonths] = useState(3);
  const [brand, setBrand] = useState("");
  const [sector, setSector] = useState("");
  const [error, setError] = useState("");
  const [pulse, setPulse] = useState(false);
  const [needCreative, setNeedCreative] = useState(false);

  const { perScreen, total } = calcPrice(screens, months);
  const savings = Math.round((BASE * screens * months) - total);

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 280);
    return () => clearTimeout(t);
  }, [screens, months]);

  const includes = [
    { icon: "✓", text: "Ads placed on your selected screens", sub: null, locked: false },
    { icon: months >= 2 ? "✓" : "🔒", text: "Change creatives anytime", sub: months < 2 ? "· unlocks at 2 months" : null, locked: months < 2 },
    { icon: months >= 4 ? "✓" : "🔒", text: "Category exclusivity", sub: months < 4 ? "· unlocks at 4 months" : "No competing brand runs on your selected screens", locked: months < 4 },
  ];

  function handleWhatsApp() {
    if (!brand.trim()) { setError("Please enter your brand name to continue."); return; }
    setError("");
    const creativeLine = needCreative ? "\nCreative Help: Yes, I need help designing my ad creative." : "";
    const msg = `Hi DISCIPL Screens,\n\nI'm interested in advertising on your network.\n\nBrand: ${brand.trim()}\nSector: ${sector || "Not specified"}\nScreens: ${screens}\nDuration: ${months} month${months > 1 ? "s" : ""}\nPer Screen / Month: ₹${perScreen.toLocaleString("en-IN")}\nTotal Investment: ₹${total.toLocaleString("en-IN")}${creativeLine}\n\nPlease get in touch with me.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: FONT, display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid #f0f0f0",
        display: "flex", alignItems: "center", gap: "12px",
        position: "sticky", top: 0, background: "#fff", zIndex: 10,
      }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#111", padding: "0", lineHeight: 1 }}>‹</button>
        <div>
          <div style={{ fontSize: "17px", fontWeight: "800", color: "#111" }}>Pricing</div>
          <div style={{ fontSize: "11px", color: "#999", letterSpacing: "1px" }}>BUILD YOUR CUSTOM QUOTE</div>
        </div>
      </div>

      <div style={{ padding: "0 20px", flex: 1, boxSizing: "border-box" }}>

        <div style={{ paddingTop: "18px" }}>
          <label style={{ fontSize: "10px", letterSpacing: "2px", color: "#888", display: "block", marginBottom: "8px" }}>BRAND NAME *</label>
          <input
            value={brand}
            onChange={e => { setBrand(e.target.value); setError(""); }}
            placeholder="e.g. Alpha Supplements"
            style={{
              width: "100%", background: "#fafafa",
              border: error ? `1.5px solid ${RED}` : "1.5px solid #e8e8e8",
              borderRadius: "10px", color: "#111", fontSize: "16px",
              padding: "12px 14px", outline: "none", boxSizing: "border-box", fontFamily: FONT,
            }}
          />
          {error && <div style={{ color: RED, fontSize: "12px", marginTop: "6px" }}>{error}</div>}
        </div>

        <div style={{ paddingTop: "14px" }}>
          <label style={{ fontSize: "10px", letterSpacing: "2px", color: "#888", display: "block", marginBottom: "8px" }}>SECTOR (OPTIONAL)</label>
          <div style={{ position: "relative" }}>
            <select
              value={sector}
              onChange={e => setSector(e.target.value)}
              style={{
                width: "100%", background: "#fafafa", border: "1.5px solid #e8e8e8",
                borderRadius: "10px", color: sector ? "#111" : "#aaa",
                fontSize: "15px", padding: "12px 14px", outline: "none",
                boxSizing: "border-box", fontFamily: FONT, appearance: "none",
              }}
            >
              <option value="">Select your sector...</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }}>▾</div>
          </div>
        </div>

        <Slider label="NUMBER OF SCREENS" value={screens} min={1} max={7} onChange={setScreens} ticks={[1,2,3,4,5,6,7]} />
        <Slider label="DURATION (MONTHS)" value={months} min={1} max={12} onChange={setMonths} ticks={[1,2,3,4,5,6,7,8,9,10,11,12]} />

        <div style={{ marginTop: "20px", background: "#111", borderRadius: "14px", overflow: "hidden" }}>
          <div style={{ background: RED, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", marginBottom: "4px", letterSpacing: "1px" }}>PER SCREEN / MONTH</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff", transition: "transform 0.2s", transform: pulse ? "scale(1.07)" : "scale(1)" }}>
                ₹{perScreen.toLocaleString("en-IN")}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", marginBottom: "4px", letterSpacing: "1px" }}>TOTAL</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff", transition: "transform 0.2s", transform: pulse ? "scale(1.07)" : "scale(1)" }}>
                ₹{total.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          <div style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#888", marginBottom: "12px" }}>
              <span>{screens} screen{screens > 1 ? "s" : ""} × {months} month{months > 1 ? "s" : ""}</span>
              <span style={{ color: "#4ade80", fontWeight: "600" }}>Save ₹{savings.toLocaleString("en-IN")}</span>
            </div>
            <div style={{ borderTop: "1px solid #222", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {includes.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", opacity: item.locked ? 0.35 : 1, transition: "opacity 0.3s" }}>
                  <span style={{ color: item.locked ? "#555" : RED, fontSize: "13px", marginTop: "1px", flexShrink: 0, width: "16px" }}>{item.icon}</span>
                  <div>
                    <span style={{ color: item.locked ? "#666" : "#ccc", fontSize: "13px" }}>{item.text}</span>
                    {item.sub && <span style={{ color: "#555", fontSize: "11px", marginLeft: "4px" }}>{item.sub}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          onClick={() => setNeedCreative(!needCreative)}
          style={{
            marginTop: "12px",
            border: needCreative ? `1.5px solid ${RED}` : "1.5px solid #e8e8e8",
            background: needCreative ? "#fff5f5" : "#fafafa",
            borderRadius: "10px", padding: "14px 16px",
            display: "flex", alignItems: "center", gap: "12px",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          <div style={{
            width: "20px", height: "20px", borderRadius: "5px",
            border: needCreative ? `2px solid ${RED}` : "2px solid #ccc",
            background: needCreative ? RED : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.2s",
          }}>
            {needCreative && <span style={{ color: "#fff", fontSize: "12px", lineHeight: 1 }}>✓</span>}
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>I need help designing my ad creative</div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>Our team will get in touch with options.</div>
          </div>
        </div>

        <div style={{ paddingTop: "14px", paddingBottom: "32px" }}>
          <button onClick={handleWhatsApp} style={{
            width: "100%", background: "#25D366", color: "#fff", border: "none",
            borderRadius: "10px", padding: "15px", fontSize: "16px", fontWeight: "700",
            cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center",
            justifyContent: "center", gap: "10px", boxSizing: "border-box",
          }}>
            <span style={{ fontSize: "20px" }}>💬</span>
            Request This Quote on WhatsApp
          </button>
          <div style={{ textAlign: "center", fontSize: "11px", color: "#bbb", marginTop: "8px" }}>
            Your details will be sent to our team directly
          </div>
        </div>

        <div style={{ textAlign: "center", paddingBottom: "28px" }}>
          <div style={{ fontSize: "11px", color: "#ccc" }}>© DISCIPL Screens · A Habitoz Private Limited Brand</div>
          <div style={{ fontSize: "12px", color: RED, marginTop: "4px", fontWeight: "700" }}>+91 97464 88282</div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, onChange, ticks }) {
  return (
    <div style={{ paddingTop: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <label style={{ fontSize: "10px", letterSpacing: "2px", color: "#888" }}>{label}</label>
        <span style={{ fontSize: "22px", fontWeight: "800", color: RED }}>{value}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: RED, height: "4px", cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", marginTop: "4px" }}>
        {ticks.map(n => (
          <span key={n} style={{ color: value === n ? RED : "#ccc", fontWeight: value === n ? "700" : "400", minWidth: "6px", textAlign: "center" }}>
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f0", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "430px", minHeight: "100vh", background: "#fff", boxShadow: "0 0 40px rgba(0,0,0,0.08)" }}>
        {page === "home" && <HomePage navigate={setPage} />}
        {page === "locations" && <LocationsPage navigate={setPage} />}
        {page === "pricing" && <PricingPage navigate={setPage} />}
      </div>
    </div>
  );
}
