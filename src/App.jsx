import { useState, useEffect, useRef } from "react";

const RESTAURANTS = [
  {name:"Nobu"},{name:"Harry's Steakhouse"},{name:"Tatiana"},{name:"Twin Tails"},{name:"Emmett's on Grove"},{name:"Campbell Bar"},{name:"The Nines"},{name:"Osteria Morini"},{name:"Soho Grand Hotel"},{name:"Theodora"},{name:"Ahgassi Gopchang"},{name:"Cote NYC"},{name:"Buddakan"},{name:"Torrisi"},{name:"Lure Fishbar"},{name:"Scott's Pizza Tour"},{name:"Blue Ribbon Sushi"},{name:"Cuerno"},{name:"Din Tai Fung"},{name:"Grand Banks"},{name:"Polo Bar"},{name:"Boqueria"},{name:"Minetta Tavern"},{name:"Roberta's"},{name:"The Corner Store"},{name:"Monkey Bar"},{name:"Carbone or Parm"},{name:"La Pecora Bianca"},{name:"230 Fifth"},{name:"Tao"},{name:"Via Carota"},{name:"Semma"},{name:"LouLou"},{name:"Catch NYC"},{name:"Gramercy Tavern"},{name:"Tucci"},{name:"Brass"},{name:"Beefbar"},{name:"Odeon"},{name:"Rubirosa"},{name:"Cafe Carmellini"},{name:"Limusina"},{name:"Chinese Tuxedo"},{name:"Tokyo Record Bar"},{name:"Husk"}
];

const ACTIVITIES = [
  {name:"Olafactory"},{name:"Lucky Strike"},{name:"Dave & Busters / Barcade"},{name:"Mixology Class"},{name:"Sports Games"},{name:"WWE"},{name:"Booze Cruise on the Hudson"},{name:"Little Charli"},{name:"Broadway Show"},{name:"Music concert/show"},{name:"Tarot Card/Palm Readers"},{name:"Drunk Shakespeare"},{name:"Comedy Club"},{name:"Chelsea Piers Golf Range"},{name:"Top Golf / Five Iron"},{name:"Inwood Country Club"},{name:"Escape Room"},{name:"Sushi Making Class"},{name:"Batsu"},{name:"Speakeasy Magick"},{name:"Spa/Nail Outings"},{name:"Puppy Yoga / Barry's"},{name:"Lawn Club"},{name:"Swingers"},{name:"Shopping (Nike, UGG, Jo Malone)"},{name:"Haunted House"},{name:"Tidal Force VR"},{name:"Axe Throwing"},{name:"Break Bar"},{name:"Brooklyn Brewery"},{name:"Big Deal Casino"},{name:"Paint and Sip"},{name:"Red Inside Culinary Studio"},{name:"Wine and Cheese at Murray's"},{name:"Trivia/Game Night"},{name:"Karaoke"},{name:"Trapeze"},{name:"Custom Jeans/Shoe Bar"},{name:"Whiskey Tasting"},{name:"Shuffleboard"},{name:"Pool/Ping Pong (Slate)"},{name:"Food Tour"},{name:"Brooklyn DOP"},{name:"Tiro A Segno"},{name:"My Cooking Party"},{name:"Sur La Table / Miette / Eataly"},{name:"Ragery"},{name:"Go Karting"},{name:"Concerts / Live Music"},{name:"Sports Events"},{name:"Popup Dining / Chef Collabs"},{name:"Food & Wine Festivals"},{name:"James Beard Foundation Dinners"}
];

const VENUES = [
  {name:"Slate",loc:"Midtown",status:"No"},{name:"Crane Club",loc:"Chelsea",status:"Awaiting Reply"},{name:"Valerie",loc:"Midtown",status:"No"},{name:"Old Mates Pub",loc:"Fidi",status:"Yes",min:"$10k",good:"No"},{name:"Brass Monkey",loc:"Chelsea",status:"Awaiting Reply"},{name:"Loft39",loc:"Midtown",status:"Awaiting Reply",min:"$1,815"},{name:"Lillies NYC",status:"Yes",min:"$30k",good:"No"},{name:"74 Wythe",loc:"Brooklyn",status:"Awaiting Reply"},{name:"Cipriani",loc:"Fidi",status:"Yes",min:"$15k",good:"No"},{name:"LouLou Speakeasy",loc:"Chelsea",status:"No",min:"$10k"},{name:"1803",loc:"Tribeca",status:"No"},{name:"Big Deal Casino",loc:"Flatiron",status:"Yes",min:"$25k",good:"No"},{name:"Club Aqua",loc:"Flatiron",status:"Yes",min:"$10k",good:"No"},{name:"SOUS-SOL",status:"Awaiting Reply",min:"$5k"},{name:"The Corner Store",loc:"Soho",status:"Awaiting Reply",min:"$40k"},{name:"The Tippler",loc:"Meatpacking",status:"Yes",min:"$5k-9k",good:"No"},{name:"The Rose",loc:"Chelsea",status:"Yes",min:"$3k-4k",cap:"150",good:"Yes"}
];

const OCCASION_PILLS = [
  {val:"client dinner",label:"client dinner"},{val:"team drinks",label:"team drinks"},{val:"date night",label:"date night"},{val:"casual lunch",label:"casual lunch"},{val:"late night out",label:"late night"},{val:"happy hour",label:"happy hour"},{val:"team activity or group outing",label:"group activity"},{val:"private event or buyout",label:"private event"},{val:"celebration or birthday",label:"celebration"},{val:"cookies, confections, baked goods, or dessert",label:"cookies / confections"},{val:"takeout order for the office or a small group",label:"takeout"},{val:"catering for an office event, meeting, or large group",label:"catering"}
];

const VIBE_PILLS = [
  {val:"impressive, wow factor",label:"impressive / wow factor"},{val:"lively, fun atmosphere",label:"lively"},{val:"quiet enough to have a real conversation",label:"quiet to talk"},{val:"rooftop or outdoor seating",label:"rooftop / outdoor"},{val:"private room or semi-private space",label:"private room"},{val:"local gem, not touristy",label:"neighborhood gem"},{val:"celebrity chef or Michelin-recognized",label:"chef-driven"},{val:"unique or experiential",label:"unique / experiential"}
];

const TYPE_PILLS = [
  {val:"restaurant",label:"restaurant"},{val:"bar or cocktail lounge",label:"bar / lounge"},{val:"wine bar",label:"wine bar"},{val:"rooftop bar",label:"rooftop bar"},{val:"steakhouse",label:"steakhouse"},{val:"omakase or tasting menu",label:"omakase"},{val:"activity or experience",label:"activity / experience"},{val:"golf (driving range, simulator, or full course)",label:"golf"},{val:"live event - concert or sports game",label:"concert / sports"},{val:"event space or private venue buyout",label:"event space"},{val:"bakery, pastry shop, or confection destination",label:"bakery / confections"},{val:"nightclub or late night venue",label:"nightclub"},{val:"catering company or caterer for large groups",label:"catering"}
];

const SOURCE_PILLS = [
  {val:"Eater",label:"Eater"},{val:"The Infatuation",label:"The Infatuation"},{val:"NY Times Dining",label:"NY Times Dining"},{val:"Resy hot list",label:"Resy hot list"},{val:"Tasting Table",label:"Tasting Table"},{val:"Conde Nast Traveler",label:"Conde Nast"}
];

const C = {
  bg: "#0f1117",
  surface: "#1a1d27",
  surfaceHover: "#22263a",
  border: "#2e3347",
  borderActive: "#c9a84c",
  gold: "#c9a84c",
  goldLight: "#e8c96a",
  text: "#f0ede6",
  textMuted: "#8b8fa8",
  textDim: "#555870",
  green: "#2ecc8a",
  greenBg: "#0d2b1e",
  red: "#e24b4a",
  redBg: "#2b0d0d",
  amber: "#e8a830",
};

const styles = {
  pill: (active) => ({
    fontSize: 12,
    padding: "5px 13px",
    borderRadius: 99,
    cursor: "pointer",
    border: `1px solid ${active ? C.gold : C.border}`,
    background: active ? "rgba(201,168,76,0.15)" : "transparent",
    color: active ? C.goldLight : C.textMuted,
    fontWeight: active ? 600 : 400,
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  }),
  checkbox: (on) => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 14px", borderRadius: 8, cursor: "pointer",
    fontSize: 13, userSelect: "none",
    border: `1px solid ${on ? C.gold : C.border}`,
    background: on ? "rgba(201,168,76,0.1)" : C.surface,
    color: on ? C.goldLight : C.textMuted,
    transition: "all 0.15s",
  }),
  input: {
    fontSize: 13, padding: "9px 12px",
    border: `1px solid ${C.border}`,
    borderRadius: 8, width: "100%",
    background: C.surface, color: C.text,
    boxSizing: "border-box", outline: "none",
  },
  label: {
    fontSize: 11, fontWeight: 600, color: C.textDim,
    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8,
    display: "block",
  },
  card: (topPick) => ({
    border: `1px solid ${topPick ? C.gold : C.border}`,
    borderRadius: 12, padding: "18px 20px", marginBottom: 12,
    background: C.surface,
    boxShadow: topPick ? `0 0 20px rgba(201,168,76,0.1)` : "none",
  }),
};

function PillGroup({ pills, active, onToggle }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
      {pills.map(p => (
        <button key={p.val} onClick={() => onToggle(p.val)} style={styles.pill(active.includes(p.val))}>
          {p.label}
        </button>
      ))}
    </div>
  );
}

function Checkbox({ on, onClick, children }) {
  return (
    <div onClick={onClick} style={styles.checkbox(on)}>
      <div style={{
        width: 16, height: 16, borderRadius: 4, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `2px solid ${on ? C.gold : C.textDim}`,
        background: on ? C.gold : "transparent",
        transition: "all 0.15s",
      }}>
        {on && <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><polyline points="1.5,4.5 3.5,7 7.5,1.5" stroke="#0f1117" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <span style={{ fontSize: 13, fontWeight: on ? 500 : 400 }}>{children}</span>
    </div>
  );
}

function RadioBox({ on, onClick, children }) {
  return (
    <div onClick={onClick} style={styles.checkbox(on)}>
      <div style={{
        width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
        border: `2px solid ${on ? C.gold : C.textDim}`,
        background: on ? C.gold : "transparent",
        transition: "all 0.15s",
      }} />
      <span style={{ fontSize: 13, fontWeight: on ? 500 : 400 }}>{children}</span>
    </div>
  );
}

function SectionLabel({ text }) {
  return <p style={styles.label}>{text}</p>;
}

function SearchTimer({ running }) {
  const [seconds, setSeconds] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      setSeconds(0);
      ref.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  if (!running) return null;

  const msgs = [
    "Searching sources...",
    "Reading reviews...",
    "Checking availability...",
    "Comparing options...",
    "Almost there...",
  ];
  const msg = msgs[Math.min(Math.floor(seconds / 8), msgs.length - 1)];

  return (
    <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 10, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${C.border}`, borderTopColor: C.gold, animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
      <div>
        <p style={{ fontSize: 13, color: C.text, margin: 0 }}>{msg}</p>
        <p style={{ fontSize: 11, color: C.textDim, margin: "2px 0 0" }}>{seconds}s elapsed</p>
      </div>
    </div>
  );
}

function SourceBadge({ source }) {
  const s = source.toLowerCase();
  const color = s.includes("eater") ? "#e8754a" : s.includes("infat") ? "#d4537e" : s.includes("times") ? "#4a90d9" : s.includes("yelp") ? "#e8a830" : s.includes("trip") ? "#34a85a" : C.textMuted;
  return (
    <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, fontWeight: 600, border: `1px solid ${color}40`, color, background: `${color}15`, letterSpacing: "0.03em" }}>
      {source}
    </span>
  );
}

function VenueCard({ venue, onMore, onAlt }) {
  return (
    <div style={styles.card(venue.top_pick)}>
      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        {venue.top_pick && (
          <span style={{ fontSize: 10, fontWeight: 700, background: C.gold, color: "#0f1117", padding: "3px 10px", borderRadius: 99, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Top Pick
          </span>
        )}
        {venue.on_team_list && (
          <span style={{ fontSize: 10, fontWeight: 600, background: "rgba(201,168,76,0.15)", color: C.gold, padding: "3px 10px", borderRadius: 99, border: `1px solid ${C.gold}50`, letterSpacing: "0.05em" }}>
            On Your List
          </span>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{venue.name}</span>
        <span style={{ fontSize: 13, color: C.gold, fontWeight: 500, flexShrink: 0, marginLeft: 12 }}>{venue.price_range}</span>
      </div>

      {venue.neighborhood && <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>{venue.neighborhood}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
        {(venue.sources_mentioned || []).map(s => <SourceBadge key={s} source={s} />)}
        {(venue.tags || []).map(t => (
          <span key={t} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, fontWeight: 500, border: `1px solid ${C.border}`, color: C.textMuted, background: "transparent" }}>{t}</span>
        ))}
      </div>

      {venue.source_notes && (
        <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.65, borderLeft: `2px solid ${C.gold}40`, paddingLeft: 12, marginBottom: 10 }}>{venue.source_notes}</p>
      )}
      {venue.why_it_fits && (
        <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.65, borderLeft: `2px solid ${C.border}`, paddingLeft: 12, marginBottom: 10 }}>{venue.why_it_fits}</p>
      )}
      {venue.reservation_tip && (
        <p style={{ fontSize: 12, color: C.textDim, marginBottom: 12 }}>{venue.reservation_tip}</p>
      )}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["More details", onMore], ["Find alternatives", onAlt]].map(([label, fn]) => (
          <button key={label} onClick={() => fn(venue.name)} style={{
            fontSize: 12, padding: "6px 14px", borderRadius: 8,
            border: `1px solid ${C.border}`, background: "transparent",
            color: C.textMuted, cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseOver={e => { e.target.style.borderColor = C.gold; e.target.style.color = C.goldLight; }}
            onMouseOut={e => { e.target.style.borderColor = C.border; e.target.style.color = C.textMuted; }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("search");
  const [occasion, setOccasion] = useState(["client dinner"]);
  const [vibe, setVibe] = useState(["impressive, wow factor"]);
  const [type, setType] = useState(["restaurant"]);
  const [sources, setSources] = useState(["Eater","The Infatuation","NY Times Dining"]);
  const [culinaryEvents, setCulinaryEvents] = useState(false);
  const [neighborhood, setNeighborhood] = useState("");
  const [radius, setRadius] = useState("short drive or transit (under 30 min)");
  const [headcount, setHeadcount] = useState(4);
  const [time, setTime] = useState("dinner (6-10pm)");
  const [budget, setBudget] = useState("$100-150");
  const [cuisine, setCuisine] = useState("");
  const [notes, setNotes] = useState("");
  const [dates, setDates] = useState([]);
  const [dateInput, setDateInput] = useState("");
  const [count, setCount] = useState("3");
  const [useTeam, setUseTeam] = useState("no");
  const [delivery, setDelivery] = useState(false);
  const [walkIn, setWalkIn] = useState(false);
  const [parking, setParking] = useState(false);
  const [transit, setTransit] = useState(false);
  const [resResy, setResResy] = useState(true);
  const [resOT, setResOT] = useState(true);
  const [resSR, setResSR] = useState(true);
  const [resTock, setResTock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [followUp, setFollowUp] = useState("");
  const [followUpResult, setFollowUpResult] = useState(null);
  const [followUpLoading, setFollowUpLoading] = useState(false);

  const toggle = (setter, val) => setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  const addDate = () => { if (!dateInput || dates.includes(dateInput)) return; setDates(prev => [...prev, dateInput]); setDateInput(""); };
  const fmtDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });

  const buildPrompt = () => {
    const loc = neighborhood || "Manhattan, NYC";
    const dateStr = dates.length ? dates.map(d => new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" })).join(", ") : "flexible / no specific date";
    const allSources = sources.length ? sources.join(", ") : "Eater, The Infatuation, NY Times Dining";
    const resPlatforms = [resResy && "Resy", resOT && "OpenTable", resSR && "SevenRooms", resTock && "Tock"].filter(Boolean);
    const extraOccasion = culinaryEvents ? ["culinary events & festivals"] : [];
    const occasionStr = [...occasion, ...extraOccasion].join(", ") || "dining out";
    const accessNotes = [parking && "parking available", transit && "near mass transit", delivery && "must offer delivery", !walkIn && "no walk-in only"].filter(Boolean).join("; ");
    const culinaryNote = culinaryEvents ? "\nCULINARY EVENTS MODE: Search broadly for ALL upcoming food & wine festivals, James Beard Foundation dinners, chef collaboration dinners, ticketed tasting events, immersive dining, and culinary popups in or near " + loc + (dates.length ? " around " + dateStr : " in the coming weeks and months") + "." : "";
    const resNote = resPlatforms.length ? "\nNote booking platform (" + resPlatforms.join(", ") + ") and include direct booking links." : "";
    const teamNames = RESTAURANTS.map(x => x.name).concat(ACTIVITIES.map(x => x.name)).concat(VENUES.map(x => x.name));
    const teamCtx = useTeam === "yes" ? "\nCross-reference and flag if any recommendation matches our team list: " + teamNames.join(", ") : "";

    return "You are an expert dining, nightlife, and entertainment scout. Search the web for current recommendations.\n\n" +
      "SOURCES: Search " + allSources + " first. If these do not cover the location, fall back to Yelp, Google reviews, TripAdvisor, local city magazines, local tourism boards, and Zagat.\n\n" +
      "Occasion: " + occasionStr + "\nType: " + (type.join(", ") || "restaurant") + "\nVibe: " + (vibe.join(", ") || "good atmosphere") + "\nLocation: " + loc + "\nRadius: " + radius + "\nHeadcount: " + headcount + " people\nTime: " + time + "\nDate(s): " + dateStr + "\nBudget: " + budget + " per person\nCuisine/focus: " + (cuisine || "open") + "\nAccess: " + (accessNotes || "none") + "\nNotes: " + (notes || "none") +
      culinaryNote + resNote + teamCtx + "\n\n" +
      "CRITICAL: Respond with ONLY a valid JSON array. No markdown, no explanation. Start with [ end with ].\n" +
      "Each object: {\"name\":\"\",\"neighborhood\":\"\",\"price_range\":\"\",\"sources_mentioned\":[],\"source_notes\":\"\",\"tags\":[],\"why_it_fits\":\"\",\"reservation_tip\":\"\",\"on_team_list\":false,\"top_pick\":false}\n" +
      "Return exactly " + count + " results. Only one top_pick: true.";
  };

  const callAPI = async (prompt, useSearch = true) => {
    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, useSearch })
    });
    if (!res.ok) throw new Error("API error " + res.status);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.text || "";
  };

  const runSearch = async () => {
    setLoading(true); setResults(null); setError(null); setFollowUpResult(null);
    try {
      const text = await callAPI(buildPrompt(), true);
      const start = text.indexOf("["); const end = text.lastIndexOf("]");
      if (start === -1 || end === -1) throw new Error("No results found - try a different location or filters.");
      setResults(JSON.parse(text.slice(start, end + 1)));
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const runFollowUp = async (prompt) => {
    setFollowUpLoading(true); setFollowUpResult(null);
    try {
      const text = await callAPI(prompt, false);
      setFollowUpResult(text);
    } catch (e) { setFollowUpResult("Error: " + e.message); }
    setFollowUpLoading(false);
  };

  const inputStyle = { ...styles.input };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; color: ${C.text}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        input, select, textarea { color-scheme: dark; }
        input::placeholder { color: ${C.textDim}; }
        textarea::placeholder { color: ${C.textDim}; }
        select option { background: ${C.surface}; color: ${C.text}; }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @media (prefers-color-scheme: light) { body { background: ${C.bg}; color: ${C.text}; } }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg }}>
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: "0 24px", background: C.surface }}>
          <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold }} />
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text, letterSpacing: "0.05em" }}>TOP SHELF</span>
              <span style={{ fontSize: 15, fontWeight: 300, color: C.textMuted, letterSpacing: "0.05em" }}>VENUES</span>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {["search","team"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  fontSize: 12, padding: "6px 14px", cursor: "pointer",
                  background: tab === t ? "rgba(201,168,76,0.15)" : "transparent",
                  border: `1px solid ${tab === t ? C.gold : "transparent"}`,
                  borderRadius: 6, color: tab === t ? C.goldLight : C.textMuted,
                  fontWeight: tab === t ? 600 : 400, letterSpacing: "0.04em",
                  textTransform: "uppercase", fontSize: 11,
                }}>
                  {t === "search" ? "Find Venues" : "Team List"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 80px" }}>

          {tab === "search" && (
            <div>
              <SectionLabel text="occasion" />
              <PillGroup pills={OCCASION_PILLS} active={occasion} onToggle={v => toggle(setOccasion, v)} />

              <button onClick={() => setCulinaryEvents(p => !p)} style={styles.pill(culinaryEvents)}>
                culinary events & festivals
              </button>
              {culinaryEvents && <p style={{ fontSize: 12, color: C.textDim, marginTop: 8, marginBottom: 16 }}>Searching food & wine festivals, James Beard dinners, chef popups, and immersive dining in your location.</p>}
              {!culinaryEvents && <div style={{ marginBottom: 16 }} />}

              <SectionLabel text="vibe" />
              <PillGroup pills={VIBE_PILLS} active={vibe} onToggle={v => toggle(setVibe, v)} />

              <SectionLabel text="type" />
              <PillGroup pills={TYPE_PILLS} active={type} onToggle={v => toggle(setType, v)} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div><label style={styles.label}>neighborhood / city</label><input style={inputStyle} placeholder="e.g. NYC, Savannah, Scotch Plains NJ..." value={neighborhood} onChange={e => setNeighborhood(e.target.value)} /></div>
                <div><label style={styles.label}>radius</label>
                  <select style={inputStyle} value={radius} onChange={e => setRadius(e.target.value)}>
                    {["walking (under 10 min)","nearby (under 20 min)","short drive or transit (under 30 min)","worth the trip (under 60 min)","no limit"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div><label style={styles.label}>headcount</label><input style={inputStyle} type="number" min={1} max={500} value={headcount} onChange={e => setHeadcount(e.target.value)} /></div>
                <div><label style={styles.label}>time of day</label>
                  <select style={inputStyle} value={time} onChange={e => setTime(e.target.value)}>
                    {["breakfast / brunch","lunch (12-3pm)","happy hour (4-7pm)","dinner (6-10pm)","late night (10pm+)","anytime / multi-day"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <SectionLabel text="date(s)" />
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <input style={{ ...inputStyle, flex: 1 }} type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} />
                <button onClick={addDate} style={{ fontSize: 13, padding: "9px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.textMuted, cursor: "pointer", whiteSpace: "nowrap" }}>+ add</button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                {dates.map(d => (
                  <span key={d} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "4px 10px", borderRadius: 99, border: `1px solid ${C.border}`, color: C.textMuted, background: C.surface }}>
                    {fmtDate(d)}
                    <button onClick={() => setDates(prev => prev.filter(x => x !== d))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: C.textDim, padding: 0, lineHeight: 1 }}>×</button>
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 11, color: C.textDim, marginBottom: 16, marginTop: 4 }}>Add one or more dates to filter for availability.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div><label style={styles.label}>per-person budget</label>
                  <select style={inputStyle} value={budget} onChange={e => setBudget(e.target.value)}>
                    {["under $30","$30-60","$60-100","$100-150","$150-250","$250-500","no limit / expense account"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div><label style={styles.label}>cuisine / focus</label><input style={inputStyle} placeholder="e.g. Japanese, open..." value={cuisine} onChange={e => setCuisine(e.target.value)} /></div>
              </div>

              <SectionLabel text="access & logistics" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                <Checkbox on={parking} onClick={() => setParking(p => !p)}>parking available</Checkbox>
                <Checkbox on={transit} onClick={() => setTransit(p => !p)}>near mass transit</Checkbox>
                <Checkbox on={delivery} onClick={() => setDelivery(p => !p)}>offers delivery</Checkbox>
                <Checkbox on={walkIn} onClick={() => setWalkIn(p => !p)}>include walk-in only</Checkbox>
              </div>

              <SectionLabel text="reservation platforms" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                <RadioBox on={resResy} onClick={() => setResResy(p => !p)}>Resy</RadioBox>
                <RadioBox on={resOT} onClick={() => setResOT(p => !p)}>OpenTable</RadioBox>
                <RadioBox on={resSR} onClick={() => setResSR(p => !p)}>SevenRooms</RadioBox>
                <RadioBox on={resTock} onClick={() => setResTock(p => !p)}>Tock</RadioBox>
              </div>

              <SectionLabel text="sources" />
              <PillGroup pills={SOURCE_PILLS} active={sources} onToggle={v => toggle(setSources, v)} />
              <p style={{ fontSize: 11, color: C.textDim, marginBottom: 16, marginTop: -8 }}>For markets not covered above, I'll search Yelp, Google, TripAdvisor, and local guides automatically.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div><label style={styles.label}>number of results</label>
                  <select style={inputStyle} value={count} onChange={e => setCount(e.target.value)}>{["2","3","5"].map(o => <option key={o}>{o}</option>)}</select>
                </div>
                <div><label style={styles.label}>cross-reference team list?</label>
                  <select style={inputStyle} value={useTeam} onChange={e => setUseTeam(e.target.value)}>
                    <option value="no">no</option>
                    <option value="yes">yes - flag matches</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={styles.label}>anything else?</label>
                <textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} placeholder="Dietary needs, dress code, special requests..." value={notes} onChange={e => setNotes(e.target.value)} />
              </div>

              <button onClick={runSearch} disabled={loading} style={{
                width: "100%", padding: "13px", borderRadius: 10,
                border: `1px solid ${loading ? C.border : C.gold}`,
                background: loading ? "transparent" : "rgba(201,168,76,0.15)",
                fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                color: loading ? C.textDim : C.goldLight, letterSpacing: "0.05em",
                transition: "all 0.2s",
              }}>
                {loading ? "Searching..." : "Find Recommendations"}
              </button>

              <SearchTimer running={loading} />

              {error && (
                <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 8, background: C.redBg, border: `1px solid ${C.red}40`, fontSize: 13, color: C.red }}>
                  {error}
                </div>
              )}

              {results && (
                <div style={{ marginTop: 24 }}>
                  <p style={{ fontSize: 11, color: C.textDim, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>{results.length} results</p>
                  {results.map((v, i) => (
                    <VenueCard key={i} venue={v}
                      onMore={name => runFollowUp("Tell me more about " + name + ": top dishes, vibe, insider tips. Be concise.")}
                      onAlt={name => runFollowUp("Name 3 alternatives to " + name + " for the same occasion and location. For each: name, neighborhood, one sentence why.")}
                    />
                  ))}
                </div>
              )}

              {(followUpLoading || followUpResult) && (
                <div style={{ marginTop: 16, padding: "18px 20px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.surface }}>
                  {followUpLoading && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${C.border}`, borderTopColor: C.gold, animation: "spin 0.8s linear infinite" }} />
                      <span style={{ fontSize: 13, color: C.textMuted }}>Searching...</span>
                    </div>
                  )}
                  {followUpResult && <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{followUpResult}</p>}
                </div>
              )}

              <div style={{ marginTop: 20 }}>
                <label style={styles.label}>ask a follow-up</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input style={{ ...inputStyle, flex: 1 }} placeholder="e.g. Does Gramercy Tavern have a private room?" value={followUp} onChange={e => setFollowUp(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && followUp.trim()) { runFollowUp(followUp); setFollowUp(""); }}} />
                  <button onClick={() => { if (followUp.trim()) { runFollowUp(followUp); setFollowUp(""); }}}
                    style={{ fontSize: 13, padding: "9px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: C.textMuted, cursor: "pointer", whiteSpace: "nowrap" }}>
                    Ask
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "team" && (
            <div>
              {[["restaurants", RESTAURANTS], ["activities", ACTIVITIES]].map(([label, items]) => (
                <div key={label}>
                  <SectionLabel text={label} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                    {items.map(r => (
                      <span key={r.name} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 99, border: `1px solid ${C.border}`, color: C.textMuted, background: C.surface }}>
                        {r.name}
                      </span>
                    ))}
                  </div>
                  <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "0 0 20px" }} />
                </div>
              ))}

              <SectionLabel text="event spaces / venues" />
              <div>
                {VENUES.map(v => (
                  <div key={v.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}20`, fontSize: 13, gap: 8 }}>
                    <span style={{ fontWeight: 500, color: C.text }}>
                      {v.name}
                      {v.loc && <span style={{ fontWeight: 400, color: C.textDim }}> — {v.loc}</span>}
                    </span>
                    <span style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                      {v.min && <span style={{ color: C.textDim, fontSize: 12 }}>{v.min}</span>}
                      <span style={{ fontSize: 11, fontWeight: 600, color: v.status === "Yes" ? C.green : v.status === "No" ? C.red : C.amber }}>
                        {v.status || "—"}
                      </span>
                      {v.good === "Yes" && <span style={{ fontSize: 10, fontWeight: 700, background: C.gold, color: "#0f1117", padding: "2px 8px", borderRadius: 99 }}>TOP</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
