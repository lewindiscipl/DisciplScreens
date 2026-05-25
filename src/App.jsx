import { useState, useEffect } from "react";

const BASE = 2500;
const PHONE = "+919746488282";
const LOGO_SRC = "/logo.png";

const DURATION_DISCOUNTS = [
  { months: 1, discount: 0 },{ months: 2, discount: 0.08 },{ months: 3, discount: 0.20 },
  { months: 4, discount: 0.26 },{ months: 5, discount: 0.30 },{ months: 6, discount: 0.35 },
  { months: 7, discount: 0.37 },{ months: 8, discount: 0.39 },{ months: 9, discount: 0.41 },
  { months: 10, discount: 0.42 },{ months: 11, discount: 0.43 },{ months: 12, discount: 0.45 },
];
const SCREEN_DISCOUNTS = [
  { screens: 1, discount: 0 },{ screens: 2, discount: 0.08 },{ screens: 3, discount: 0.15 },
  { screens: 4, discount: 0.15 },{ screens: 5, discount: 0.22 },{ screens: 6, discount: 0.22 },
  { screens: 7, discount: 0.28 },
];
const SECTORS = [
  "Supplements & Nutrition","Gymwear & Apparel","Salon & Grooming","Skincare & Wellness",
  "Café & Healthy Food","Clinic & Healthcare","Real Estate","Education & Coaching",
  "Electronics & Tech","Hotels & Resorts","Jewellery & Fashion","Finance & Banking","Other",
];
const GYMS = [
  { name: "Core Fitness Club", location: "Cherooty Road" },
  { name: "Fitpro Fitness", location: "Eranhipalam" },
  { name: "FitFat Studio", location: "Thondayad" },
  { name: "Greens Fitness", location: "Mankavu Road" },
  { name: "Alpha Fitness Zone", location: "Nanminda" },
  { name: "Alpha Fitness Zone", location: "Atholi" },
  { name: "Alpha Fitness Zone", location: "Chelannur" },
];

function calcPrice(screens, months) {
  const dd = DURATION_DISCOUNTS.find(d => d.months === months)?.discount || 0;
  const sd = SCREEN_DISCOUNTS.find(d => d.screens === screens)?.discount || 0;
  const combined = Math.min(dd + sd, 0.70);
  const perScreen = Math.round(BASE * (1 - combined));
  const total = perScreen * screens * months;
  return { perScreen, total };
}

function TVIcon({ size = 20, color = "#C0202A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}
function PriceTagIcon({ size = 20, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
}

function NavBar({ page, setPage }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #e8e8e8",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 16px", height: 50,
    }}>
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <img src={LOGO_SRC} alt="DISCIPL Screens" style={{ height: 28, objectFit: "contain" }} />
      </button>
      <div style={{ display: "flex", gap: 8 }}>
        {[["screens","OUR SCREENS"],["pricing","PRICING"]].map(([id, label]) => (
          <button key={id} onClick={() => setPage(id)} style={{
            background: page === id ? "#C0202A" : "transparent",
            border: page === id ? "none" : "1px solid #ddd",
            color: page === id ? "#fff" : "#333",
            borderRadius: 6, padding: "5px 11px", fontSize: 10,
            letterSpacing: 1.5, cursor: "pointer",
            fontFamily: "'Bebas Neue', sans-serif",
            whiteSpace: "nowrap",
          }}>{label}</button>
        ))}
      </div>
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#fff",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 24px",
    }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", width: "100%", maxWidth: 320,
      }}>
        <img src={LOGO_SRC} alt="DISCIPL Screens" style={{ width: "80%", maxWidth: 240, objectFit: "contain", marginBottom: 10 }} />
        <div style={{
          fontSize: 10, letterSpacing: 3, color: "#999",
          fontFamily: "'Bebas Neue', sans-serif", marginBottom: 32,
        }}>RIGHT PLACE. RIGHT PEOPLE. REAL IMPACT.</div>

        <div style={{ display: "flex", gap: 12, width: "100%" }}>
          <button onClick={() => setPage("screens")} style={{
            flex: 1, padding: "15px 0",
            background: "#fff", border: "1.5px solid #e0e0e0",
            borderRadius: 10, color: "#111", cursor: "pointer",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 12, letterSpacing: 2,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          }}>
            <TVIcon size={20} color="#C0202A" />
            OUR SCREENS
          </button>
          <button onClick={() => setPage("pricing")} style={{
            flex: 1, padding: "15px 0",
            background: "#C0202A", border: "none",
            borderRadius: 10, color: "#fff", cursor: "pointer",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 12, letterSpacing: 2,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          }}>
            <PriceTagIcon size={20} color="#fff" />
            PRICING
          </button>
        </div>
      </div>
    </div>
  );
}

function ScreensPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "66px 16px 48px" }}>
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#C0202A", fontFamily: "'Bebas Neue', sans-serif", marginBottom: 4 }}>ACTIVE NETWORK · CALICUT</div>
          <div style={{ fontSize: 26, letterSpacing: 1, color: "#111", fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}>OUR SCREENS</div>
          <div style={{ width: 28, height: 2, background: "#C0202A", marginTop: 10, borderRadius: 2 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {GYMS.map((gym, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "13px 14px",
              background: i % 2 === 0 ? "#fafafa" : "#fff",
              borderRadius: i === 0 ? "8px 8px 0 0" : i === GYMS.length - 1 ? "0 0 8px 8px" : 0,
              border: "1px solid #f0f0f0",
              borderTop: i === 0 ? "1px solid #f0f0f0" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: "#fff", border: "1px solid #f0d0d0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, color: "#C0202A",
                  fontFamily: "'Bebas Neue', sans-serif", flexShrink: 0,
                }}>{i + 1}</div>
                <span style={{ color: "#111", fontSize: 13, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>{gym.name}</span>
              </div>
              <span style={{ fontSize: 11, color: "#999", fontFamily: "'Trebuchet MS', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "#C0202A", fontSize: 9 }}>▸</span>{gym.location}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 14, padding: "12px 16px",
          background: "#fdf5f5", border: "1px solid #f5dcdc", borderRadius: 8,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 12, color: "#999", fontFamily: "'Trebuchet MS', sans-serif" }}>Total active screens</span>
          <span style={{ fontSize: 18, color: "#C0202A", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>7 SCREENS</span>
        </div>

        <button onClick={() => setPage("pricing")} style={{
          width: "100%", marginTop: 14, background: "#C0202A", border: "none",
          borderRadius: 8, padding: "14px", color: "#fff", fontSize: 13, letterSpacing: 3,
          fontFamily: "'Bebas Neue', sans-serif", cursor: "pointer",
        }}>VIEW PRICING →</button>
      </div>
    </div>
  );
}

function IncludeRow({ unlocked, always, label, sublabel, unlockText }) {
  if (always) {
    return (
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
        <span style={{ color: "#C0202A", fontSize: 13, marginTop: 1, flexShrink: 0 }}>✓</span>
        <span style={{ color: "#333", fontSize: 13, fontFamily: "'Trebuchet MS', sans-serif" }}>{label}</span>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <span style={{ fontSize: 13, marginTop: 1, flexShrink: 0 }}>{unlocked ? "✓" : "🔒"}</span>
        <div>
          <span style={{
            fontSize: 13, fontFamily: "'Trebuchet MS', sans-serif",
            color: unlocked ? "#333" : "#bbb",
            transition: "color 0.3s",
          }}>{label}</span>
          {!unlocked && (
            <span style={{ fontSize: 11, color: "#ccc", fontFamily: "'Trebuchet MS', sans-serif", marginLeft: 6 }}>
              · {unlockText}
            </span>
          )}
          {sublabel && unlocked && (
            <div style={{ fontSize: 11, color: "#aaa", fontFamily: "'Trebuchet MS', sans-serif", marginTop: 2 }}>
              {sublabel}
            </div>
          )}
          {sublabel && !unlocked && (
            <div style={{ fontSize: 11, color: "#ddd", fontFamily: "'Trebuchet MS', sans-serif", marginTop: 2 }}>
              {sublabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PricingPage() {
  const [screens, setScreens] = useState(5);
  const [months, setMonths] = useState(3);
  const [brand, setBrand] = useState("");
  const [sector, setSector] = useState("");
  const [needCreative, setNeedCreative] = useState(false);
  const [error, setError] = useState("");
  const [pulse, setPulse] = useState(false);

  const { perScreen, total } = calcPrice(screens, months);
  const savings = Math.round((BASE * screens * months) - total);
  const creativesUnlocked = months >= 2;
  const exclusivityUnlocked = months >= 4;

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(t);
  }, [screens, months]);

  function handleWhatsApp() {
    if (!brand.trim()) { setError("Please enter your brand name to continue."); return; }
    setError("");
    const msg = `Hi DISCIPL Screens,

I'm interested in advertising on your network.

Brand: ${brand.trim()}
Sector: ${sector || "Not specified"}
Screens: ${screens}
Duration: ${months} month${months > 1 ? "s" : ""}
Per Screen / Month: ₹${perScreen.toLocaleString("en-IN")}
Total Investment: ₹${total.toLocaleString("en-IN")}${needCreative ? "\n\nI also need help designing my ad creative." : ""}

Please get in touch with me.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const inputStyle = {
    width: "100%", background: "#fafafa",
    border: "1px solid #e8e8e8", borderRadius: 7,
    color: "#111", fontSize: 15, padding: "11px 13px",
    outline: "none", boxSizing: "border-box",
    fontFamily: "'Trebuchet MS', sans-serif",
  };

  // Build evenly spaced month labels for all 12 positions
  const monthLabels = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "66px 16px 48px" }}>
      <div style={{ maxWidth: 440, margin: "0 auto" }}>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#C0202A", fontFamily: "'Bebas Neue', sans-serif", marginBottom: 4 }}>BUILD YOUR CAMPAIGN</div>
          <div style={{ fontSize: 26, letterSpacing: 1, color: "#111", fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}>PRICING</div>
          <div style={{ width: 28, height: 2, background: "#C0202A", marginTop: 10, borderRadius: 2 }} />
        </div>

        {/* Brand */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 10, letterSpacing: 2, color: "#999", fontFamily: "'Bebas Neue', sans-serif", display: "block", marginBottom: 6 }}>BRAND NAME *</label>
          <input value={brand} onChange={e => { setBrand(e.target.value); setError(""); }}
            placeholder="e.g. Alpha Supplements"
            style={{ ...inputStyle, border: error ? "1px solid #C0202A" : "1px solid #e8e8e8" }} />
          {error && <div style={{ color: "#C0202A", fontSize: 11, marginTop: 5 }}>{error}</div>}
        </div>

        {/* Sector */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 10, letterSpacing: 2, color: "#999", fontFamily: "'Bebas Neue', sans-serif", display: "block", marginBottom: 6 }}>SECTOR (OPTIONAL)</label>
          <select value={sector} onChange={e => setSector(e.target.value)}
            style={{ ...inputStyle, color: sector ? "#111" : "#aaa", appearance: "none" }}>
            <option value="">Select your sector...</option>
            {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Screens slider */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: 10, letterSpacing: 2, color: "#999", fontFamily: "'Bebas Neue', sans-serif" }}>NUMBER OF SCREENS</label>
            <span style={{ fontSize: 20, color: "#C0202A", fontFamily: "'Bebas Neue', sans-serif" }}>{screens}</span>
          </div>
          <input type="range" min="1" max="7" value={screens}
            onChange={e => setScreens(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#C0202A", height: 4, cursor: "pointer", display: "block" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginTop: 4, fontFamily: "'Trebuchet MS', sans-serif" }}>
            {[1,2,3,4,5,6,7].map(n => (
              <span key={n} style={{ color: screens === n ? "#C0202A" : "#ccc", fontWeight: screens === n ? "bold" : "normal", width: "14.28%", textAlign: "center" }}>{n}</span>
            ))}
          </div>
        </div>

        {/* Months slider */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: 10, letterSpacing: 2, color: "#999", fontFamily: "'Bebas Neue', sans-serif" }}>DURATION (MONTHS)</label>
            <span style={{ fontSize: 20, color: "#C0202A", fontFamily: "'Bebas Neue', sans-serif" }}>{months}</span>
          </div>
          <input type="range" min="1" max="12" value={months}
            onChange={e => setMonths(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#C0202A", height: 4, cursor: "pointer", display: "block" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginTop: 4, fontFamily: "'Trebuchet MS', sans-serif" }}>
            {monthLabels.map(n => (
              <span key={n} style={{
                color: months === n ? "#C0202A" : "#ccc",
                fontWeight: months === n ? "bold" : "normal",
                width: "8.33%", textAlign: "center",
              }}>{n}</span>
            ))}
          </div>
        </div>

        {/* Price card */}
        <div style={{ background: "#fafafa", borderRadius: 10, overflow: "hidden", border: "1px solid #efefef", marginBottom: 14 }}>
          <div style={{
            background: "#C0202A", padding: "18px 16px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginBottom: 3, letterSpacing: 2, fontFamily: "'Bebas Neue', sans-serif" }}>PER SCREEN / MONTH</div>
              <div style={{
                fontSize: 26, color: "#fff", fontFamily: "'Bebas Neue', sans-serif",
                transition: "transform 0.2s", transform: pulse ? "scale(1.05)" : "scale(1)",
              }}>₹{perScreen.toLocaleString("en-IN")}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginBottom: 3, letterSpacing: 2, fontFamily: "'Bebas Neue', sans-serif" }}>TOTAL</div>
              <div style={{
                fontSize: 26, color: "#fff", fontFamily: "'Bebas Neue', sans-serif",
                transition: "transform 0.2s", transform: pulse ? "scale(1.05)" : "scale(1)",
              }}>₹{total.toLocaleString("en-IN")}</div>
            </div>
          </div>

          <div style={{ padding: "14px 14px 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#aaa", marginBottom: 12, fontFamily: "'Trebuchet MS', sans-serif" }}>
              <span>{screens} screen{screens > 1 ? "s" : ""} × {months} month{months > 1 ? "s" : ""}</span>
              {savings > 0 && <span style={{ color: "#22a855" }}>Save ₹{savings.toLocaleString("en-IN")}</span>}
            </div>

            <div style={{ borderTop: "1px solid #ececec", paddingTop: 12 }}>
              <IncludeRow always label="Ads placed on your selected screens" />
              <IncludeRow
                unlocked={creativesUnlocked}
                label="Change creatives anytime"
                unlockText="unlocks at 2 months"
              />
              <IncludeRow
                unlocked={exclusivityUnlocked}
                label="Category exclusivity"
                sublabel="No competing brand runs on your selected screens"
                unlockText="unlocks at 4 months"
              />
            </div>
          </div>
        </div>

        {/* Creative checkbox */}
        <div
          onClick={() => setNeedCreative(!needCreative)}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "12px 14px",
            background: needCreative ? "#fdf5f5" : "#fafafa",
            border: needCreative ? "1.5px solid #C0202A" : "1.5px solid #e8e8e8",
            borderRadius: 8, cursor: "pointer", marginBottom: 14,
            transition: "all 0.2s",
          }}
        >
          <div style={{
            width: 18, height: 18, borderRadius: 4,
            background: needCreative ? "#C0202A" : "#fff",
            border: needCreative ? "none" : "1.5px solid #ddd",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.2s",
          }}>
            {needCreative && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#333", fontFamily: "'Trebuchet MS', sans-serif" }}>
              I need help designing my ad creative
            </div>
            <div style={{ fontSize: 11, color: "#aaa", fontFamily: "'Trebuchet MS', sans-serif", marginTop: 1 }}>
              Our team will get in touch with options
            </div>
          </div>
        </div>

        {/* CTA */}
        <button onClick={handleWhatsApp} style={{
          width: "100%", background: "#25D366", border: "none",
          borderRadius: 9, padding: "15px", color: "#fff", fontSize: 13, letterSpacing: 2,
          fontFamily: "'Bebas Neue', sans-serif", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>💬</span>
          REQUEST QUOTE ON WHATSAPP
        </button>
        <div style={{ textAlign: "center", fontSize: 11, color: "#bbb", marginTop: 7, fontFamily: "'Trebuchet MS', sans-serif" }}>
          Your details will be sent to our team directly
        </div>

        <div style={{ textAlign: "center", marginTop: 32, paddingTop: 20, borderTop: "1px solid #f0f0f0" }}>
          <div style={{ fontSize: 10, color: "#ccc", fontFamily: "'Trebuchet MS', sans-serif" }}>© DISCIPL Screens · Habitoz Private Limited</div>
          <div style={{ fontSize: 13, color: "#C0202A", marginTop: 3, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>+91 97464 88282</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <NavBar page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "screens" && <ScreensPage setPage={setPage} />}
      {page === "pricing" && <PricingPage />}
    </div>
  );
}  "Café & Healthy Food",
  "Clinic & Healthcare",
  "Real Estate",
  "Education & Coaching",
  "Electronics & Tech",
  "Hotels & Resorts",
  "Jewellery & Fashion",
  "Finance & Banking",
  "Other",
];

const GYMS = [
  { name: "Core Fitness Club", location: "Cherooty Road" },
  { name: "Fitpro Fitness", location: "Eranhipalam" },
  { name: "FitFat Studio", location: "Thondayad" },
  { name: "Greens Fitness", location: "Mankavu Road" },
  { name: "Alpha Fitness Zone", location: "Nanminda" },
  { name: "Alpha Fitness Zone", location: "Atholi" },
  { name: "Alpha Fitness Zone", location: "Chelannur" },
];

function calcPrice(screens, months) {
  const dd =
    DURATION_DISCOUNTS.find((d) => d.months === months)?.discount || 0;

  const sd =
    SCREEN_DISCOUNTS.find((d) => d.screens === screens)?.discount || 0;

  const combined = Math.min(dd + sd, 0.7);

  const perScreen = Math.round(BASE * (1 - combined));

  const total = perScreen * screens * months;

  return { perScreen, total };
}

function NavBar({ page, setPage }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "#fff",
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 100,
      }}
    >
      <img
        src={LOGO_SRC}
        alt="DISCIPL"
        style={{
          height: 34,
          objectFit: "contain",
        }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => setPage("screens")}
          style={{
            background:
              page === "screens" ? "#C0202A" : "#fff",
            color:
              page === "screens" ? "#fff" : "#111",
            border: "1px solid #ddd",
            padding: "8px 14px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Screens
        </button>

        <button
          onClick={() => setPage("pricing")}
          style={{
            background:
              page === "pricing" ? "#C0202A" : "#fff",
            color:
              page === "pricing" ? "#fff" : "#111",
            border: "1px solid #ddd",
            padding: "8px 14px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Pricing
        </button>
      </div>
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 20,
        textAlign: "center",
      }}
    >
      <img
        src={LOGO_SRC}
        alt="DISCIPL"
        style={{
          width: 220,
          marginBottom: 20,
        }}
      />

      <h1
        style={{
          fontSize: 40,
          marginBottom: 10,
        }}
      >
        DISCIPL Screens
      </h1>

      <p
        style={{
          color: "#777",
          maxWidth: 400,
          marginBottom: 30,
        }}
      >
        Smart advertising platform for gyms.
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
        }}
      >
        <button
          onClick={() => setPage("screens")}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "14px 24px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Our Screens
        </button>

        <button
          onClick={() => setPage("pricing")}
          style={{
            background: "#C0202A",
            color: "#fff",
            border: "none",
            padding: "14px 24px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Pricing
        </button>
      </div>
    </div>
  );
}

function ScreensPage() {
  return (
    <div
      style={{
        paddingTop: 90,
        paddingInline: 20,
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <h1>Screens Network</h1>

      <div
        style={{
          display: "grid",
          gap: 12,
          marginTop: 20,
        }}
      >
        {GYMS.map((gym, index) => (
          <div
            key={index}
            style={{
              padding: 18,
              border: "1px solid #eee",
              borderRadius: 12,
              background: "#fafafa",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {gym.name}
            </div>

            <div
              style={{
                color: "#777",
                marginTop: 4,
              }}
            >
              {gym.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingPage() {
  const [screens, setScreens] = useState(5);
  const [months, setMonths] = useState(3);
  const [brand, setBrand] = useState("");
  const [sector, setSector] = useState("");

  const { perScreen, total } = calcPrice(
    screens,
    months
  );

  function handleWhatsApp() {
    const msg = `Hi DISCIPL Screens,

Brand: ${brand}
Sector: ${sector}

Screens: ${screens}
Duration: ${months} months

Per Screen: ₹${perScreen}
Total: ₹${total}`;

    window.open(
      `https://wa.me/${PHONE.replace(
        "+",
        ""
      )}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <div
      style={{
        paddingTop: 90,
        paddingInline: 20,
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <h1>Pricing</h1>

      <div
        style={{
          display: "grid",
          gap: 16,
          marginTop: 20,
        }}
      >
        <input
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
          placeholder="Brand Name"
          style={{
            padding: 14,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />

        <select
          value={sector}
          onChange={(e) =>
            setSector(e.target.value)
          }
          style={{
            padding: 14,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        >
          <option value="">Select Sector</option>

          {SECTORS.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        <div>
          <label>
            Screens: {screens}
          </label>

          <input
            type="range"
            min="1"
            max="7"
            value={screens}
            onChange={(e) =>
              setScreens(Number(e.target.value))
            }
            style={{
              width: "100%",
            }}
          />
        </div>

        <div>
          <label>
            Months: {months}
          </label>

          <input
            type="range"
            min="1"
            max="12"
            value={months}
            onChange={(e) =>
              setMonths(Number(e.target.value))
            }
            style={{
              width: "100%",
            }}
          />
        </div>

        <div
          style={{
            background: "#111",
            color: "#fff",
            padding: 24,
            borderRadius: 14,
          }}
        >
          <div
            style={{
              marginBottom: 10,
            }}
          >
            Per Screen / Month
          </div>

          <div
            style={{
              fontSize: 34,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            ₹{perScreen}
          </div>

          <div>Total Investment</div>

          <div
            style={{
              fontSize: 34,
              fontWeight: "bold",
            }}
          >
            ₹{total}
          </div>
        </div>

        <button
          onClick={handleWhatsApp}
          style={{
            background: "#25D366",
            color: "#fff",
            border: "none",
            padding: 16,
            borderRadius: 12,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Request Quote on WhatsApp
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div
      style={{
        fontFamily: "Arial",
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      <NavBar page={page} setPage={setPage} />

      {page === "home" && (
        <HomePage setPage={setPage} />
      )}

      {page === "screens" && <ScreensPage />}

      {page === "pricing" && <PricingPage />}
    </div>
  );
}
