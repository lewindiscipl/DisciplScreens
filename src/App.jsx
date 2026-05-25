import { useState, useEffect } from "react";

const BASE = 2500;
const PHONE = "+919746488282";

const DURATION_DISCOUNTS = [
  { months: 1,  discount: 0 },
  { months: 2,  discount: 0.08 },
  { months: 3,  discount: 0.20 },
  { months: 4,  discount: 0.26 },
  { months: 5,  discount: 0.30 },
  { months: 6,  discount: 0.35 },
  { months: 7,  discount: 0.37 },
  { months: 8,  discount: 0.39 },
  { months: 9,  discount: 0.41 },
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
  "Supplements & Nutrition",
  "Gymwear & Apparel",
  "Salon & Grooming",
  "Skincare & Wellness",
  "Café & Healthy Food",
  "Clinic & Healthcare",
  "Real Estate",
  "Education & Coaching",
  "Electronics & Tech",
  "Hotels & Resorts",
  "Jewellery & Fashion",
  "Finance & Banking",
  "Other",
];

function calcPrice(screens, months) {
  const dd = DURATION_DISCOUNTS.find(d => d.months === months)?.discount || 0;
  const sd = SCREEN_DISCOUNTS.find(d => d.screens === screens)?.discount || 0;
  const combined = Math.min(dd + sd, 0.70);
  const perScreen = Math.round(BASE * (1 - combined));
  const total = perScreen * screens * months;
  return { perScreen, total, combined };
}

function getBadge(screens, months) {
  if (screens >= 7 && months >= 6) return { label: "⭐ BEST VALUE", color: "#047857", bg: "#ECFDF5" };
  if (screens >= 5 && months >= 3) return { label: "🔥 MOST POPULAR", color: "#C0202A", bg: "#FDF2F2" };
  if (months >= 6) return { label: "💎 GREAT DEAL", color: "#0369A1", bg: "#E0F2FE" };
  return null;
}

function getIncludes(months) {
  const list = ["Ad placement across selected screens"];
  if (months >= 3) list.push("Change creatives anytime");
  if (months >= 6) list.push("Category exclusivity");
  return list;
}

export default function App() {
  const [screens, setScreens] = useState(5);
  const [months, setMonths] = useState(3);
  const [brand, setBrand] = useState("");
  const [sector, setSector] = useState("");
  const [error, setError] = useState("");
  const [pulse, setPulse] = useState(false);

  const { perScreen, total } = calcPrice(screens, months);
  const badge = getBadge(screens, months);
  const includes = getIncludes(months);
  const savings = Math.round((BASE * screens * months) - total);

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(t);
  }, [screens, months]);

  function handleWhatsApp() {
    if (!brand.trim()) {
      setError("Please enter your brand name to continue.");
      return;
    }
    setError("");
    const msg =
`Hi DISCIPL Screens,

I'm interested in advertising on your network.

Brand: ${brand.trim()}
Sector: ${sector || "Not specified"}
Screens: ${screens}
Duration: ${months} month${months > 1 ? "s" : ""}
Per Screen / Month: ₹${perScreen.toLocaleString("en-IN")}
Total Investment: ₹${total.toLocaleString("en-IN")}

Please get in touch with me.`;

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      fontFamily: "'Trebuchet MS', sans-serif",
      padding: "0",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#111",
      }}>

        {/* TOP BAR */}
        <div style={{
          background: "#C0202A",
          padding: "20px 20px 16px",
        }}>
          <div style={{
            fontSize: "10px",
            letterSpacing: "3px",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "4px",
          }}>DISCIPL SCREENS</div>
          <div style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: "-0.3px",
          }}>Ad Quote Builder</div>
          <div style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.6)",
            marginTop: "2px",
          }}>Get your custom advertising price instantly</div>
        </div>

        {/* BRAND NAME */}
        <div style={{ padding: "20px 20px 0" }}>
          <label style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: "#888",
            display: "block",
            marginBottom: "8px",
          }}>BRAND NAME *</label>
          <input
            value={brand}
            onChange={e => { setBrand(e.target.value); setError(""); }}
            placeholder="e.g. Alpha Supplements"
            style={{
              width: "100%",
              background: "#1a1a1a",
              border: error ? "1px solid #C0202A" : "1px solid #2a2a2a",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "16px",
              padding: "12px 14px",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "'Trebuchet MS', sans-serif",
            }}
          />
          {error && (
            <div style={{ color: "#C0202A", fontSize: "12px", marginTop: "6px" }}>{error}</div>
          )}
        </div>

        {/* SECTOR */}
        <div style={{ padding: "16px 20px 0" }}>
          <label style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: "#888",
            display: "block",
            marginBottom: "8px",
          }}>SECTOR (OPTIONAL)</label>
          <select
            value={sector}
            onChange={e => setSector(e.target.value)}
            style={{
              width: "100%",
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              color: sector ? "#fff" : "#555",
              fontSize: "15px",
              padding: "12px 14px",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "'Trebuchet MS', sans-serif",
              appearance: "none",
            }}
          >
            <option value="">Select your sector...</option>
            {SECTORS.map(s => (
              <option key={s} value={s} style={{ color: "#fff", background: "#1a1a1a" }}>{s}</option>
            ))}
          </select>
        </div>

        {/* SCREENS SLIDER */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}>
            <label style={{ fontSize: "10px", letterSpacing: "2px", color: "#888" }}>
              NUMBER OF SCREENS
            </label>
            <span style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#C0202A",
            }}>{screens}</span>
          </div>
          <input
            type="range" min="1" max="7" value={screens}
            onChange={e => setScreens(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#C0202A", height: "4px", cursor: "pointer" }}
          />
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "#444",
            marginTop: "4px",
          }}>
            {[1,2,3,4,5,6,7].map(n => (
              <span key={n} style={{
                color: screens === n ? "#C0202A" : "#444",
                fontWeight: screens === n ? "bold" : "normal",
              }}>{n}</span>
            ))}
          </div>
        </div>

        {/* MONTHS SLIDER */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}>
            <label style={{ fontSize: "10px", letterSpacing: "2px", color: "#888" }}>
              DURATION (MONTHS)
            </label>
            <span style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#C0202A",
            }}>{months}</span>
          </div>
          <input
            type="range" min="1" max="12" value={months}
            onChange={e => setMonths(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#C0202A", height: "4px", cursor: "pointer" }}
          />
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "#444",
            marginTop: "4px",
          }}>
            <span>1</span><span>3</span><span>6</span><span>12</span>
          </div>
        </div>

        {/* BADGE */}
        {badge && (
          <div style={{ padding: "16px 20px 0" }}>
            <div style={{
              background: badge.bg,
              color: badge.color,
              fontSize: "11px",
              fontWeight: "bold",
              letterSpacing: "1px",
              padding: "8px 14px",
              borderRadius: "6px",
              display: "inline-block",
            }}>{badge.label}</div>
          </div>
        )}

        {/* PRICE CARD */}
        <div style={{
          margin: "16px 20px 0",
          background: "#1a1a1a",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #2a2a2a",
        }}>
          {/* Main price */}
          <div style={{
            background: "#C0202A",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
                PER SCREEN / MONTH
              </div>
              <div style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#fff",
                transition: "transform 0.2s",
                transform: pulse ? "scale(1.06)" : "scale(1)",
              }}>₹{perScreen.toLocaleString("en-IN")}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
                TOTAL
              </div>
              <div style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#fff",
                transition: "transform 0.2s",
                transform: pulse ? "scale(1.06)" : "scale(1)",
              }}>₹{total.toLocaleString("en-IN")}</div>
            </div>
          </div>

          {/* Breakdown */}
          <div style={{ padding: "14px 16px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              color: "#666",
              marginBottom: "8px",
            }}>
              <span>{screens} screen{screens>1?"s":""} × {months} month{months>1?"s":""}</span>
              <span style={{ color: "#4ade80" }}>You save ₹{savings.toLocaleString("en-IN")}</span>
            </div>

            <div style={{ borderTop: "1px solid #222", paddingTop: "12px" }}>
              {includes.map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}>
                  <span style={{ color: "#C0202A", fontSize: "10px" }}>▶</span>
                  <span style={{ color: "#888", fontSize: "13px" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div style={{ padding: "16px 20px 0" }}>
          <button
            onClick={handleWhatsApp}
            style={{
              width: "100%",
              background: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "'Trebuchet MS', sans-serif",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "20px" }}>💬</span>
            Request This Quote on WhatsApp
          </button>
          <div style={{
            textAlign: "center",
            fontSize: "11px",
            color: "#444",
            marginTop: "8px",
          }}>Your details will be sent to our team directly</div>
        </div>

        {/* FOOTER */}
        <div style={{
          padding: "20px",
          marginTop: "auto",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "11px", color: "#333" }}>
            © DISCIPL Screens · A Habitoz Private Limited Brand
          </div>
          <div style={{ fontSize: "12px", color: "#C0202A", marginTop: "4px", fontWeight: "bold" }}>
            +91 97464 88282
          </div>
        </div>

      </div>
    </div>
  );
}
