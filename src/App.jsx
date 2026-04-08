import { useState } from "react";

const RESTAURANTS = [
  {name:"Nobu"},{name:"Harry's Steakhouse"},{name:"Tatiana",loc:"Lincoln Center"},{name:"Twin Tails",loc:"Columbus Circle"},{name:"Emmett's on Grove"},{name:"Campbell Bar",loc:"Grand Central"},{name:"The Nines"},{name:"Osteria Morini"},{name:"Soho Grand Hotel"},{name:"Theodora",desc:"Mediterranean",loc:"Downtown Brooklyn"},{name:"Ahgassi Gopchang",desc:"Korean BBQ",loc:"Korea Town"},{name:"Cote NYC",desc:"Korean Steakhouse"},{name:"Buddakan"},{name:"Torrisi"},{name:"Lure Fishbar"},{name:"Scott's Pizza Tour"},{name:"Blue Ribbon Sushi"},{name:"Cuerno",desc:"Mexican Steakhouse",loc:"Rockefeller"},{name:"Din Tai Fung",loc:"Times Square"},{name:"Grand Banks"},{name:"Polo Bar"},{name:"Boqueria",desc:"Spanish/Tapas"},{name:"Minetta Tavern",desc:"French"},{name:"Roberta's"},{name:"The Corner Store"},{name:"Monkey Bar"},{name:"Carbone or Parm"},{name:"La Pecora Bianca",desc:"Italian",loc:"Midtown"},{name:"230 Fifth",desc:"Rooftop bar"},{name:"Tao"},{name:"Via Carota",loc:"West Village"},{name:"Semma",desc:"South Indian",loc:"Greenwich Village"},{name:"LouLou",desc:"French",loc:"Chelsea"},{name:"Catch NYC"},{name:"Gramercy Tavern"},{name:"Tucci",loc:"Noho"},{name:"Brass",loc:"Kips Bay"},{name:"Beefbar",loc:"Tribeca"},{name:"Odeon",desc:"French",loc:"Tribeca"},{name:"Rubirosa",loc:"Soho"},{name:"Cafe Carmellini"},{name:"Limusina",desc:"New Mexican",loc:"Midtown"},{name:"Chinese Tuxedo",loc:"Chinatown"},{name:"Tokyo Record Bar",desc:"Omakase",loc:"West Village"},{name:"Husk",loc:"Savannah, GA"}
];

const ACTIVITIES = [
  {name:"Olafactory",loc:"West Village/Nolita"},{name:"Lucky Strike",desc:"Bowling",loc:"Times Square"},{name:"Dave & Busters / Barcade",loc:"Times Square"},{name:"Mixology Class"},{name:"Sports Games"},{name:"WWE"},{name:"Booze Cruise on the Hudson"},{name:"Little Charli",desc:"Pizza Making Class",loc:"West Village"},{name:"Broadway Show"},{name:"Music concert/show",loc:"MSG"},{name:"Tarot Card/Palm Readers"},{name:"Drunk Shakespeare",loc:"Midtown"},{name:"Comedy Club"},{name:"Chelsea Piers Golf Range"},{name:"Top Golf / Five Iron"},{name:"Inwood Country Club"},{name:"Escape Room"},{name:"Sushi Making Class"},{name:"Batsu"},{name:"Speakeasy Magick"},{name:"Spa/Nail Outings"},{name:"Puppy Yoga / Barry's"},{name:"Lawn Club",loc:"Fidi"},{name:"Swingers",desc:"Mini Golf",loc:"Midtown"},{name:"Shopping (Nike, UGG, Jo Malone)"},{name:"Haunted House"},{name:"Tidal Force VR",loc:"Flatiron"},{name:"Axe Throwing"},{name:"Break Bar",loc:"Times Square"},{name:"Brooklyn Brewery"},{name:"Big Deal Casino",loc:"Nomad"},{name:"Paint and Sip"},{name:"Red Inside Culinary Studio",loc:"Greenwich Village"},{name:"Wine and Cheese at Murray's"},{name:"Trivia/Game Night"},{name:"Karaoke"},{name:"Trapeze",loc:"Pier 40"},{name:"Custom Jeans/Shoe Bar"},{name:"Whiskey Tasting"},{name:"Shuffleboard"},{name:"Pool/Ping Pong (Slate)"},{name:"Food Tour"},{name:"Brooklyn DOP",loc:"Park Slope"},{name:"Tiro A Segno",loc:"Soho"},{name:"My Cooking Party"},{name:"Sur La Table / Miette / Eataly"},{name:"Ragery",loc:"LES"},{name:"Go Karting",loc:"Jersey City"},{name:"Concerts / Live Music"},{name:"Sports Events"},{name:"Popup Dining / Chef Collabs"},{name:"Food & Wine Festivals"},{name:"James Beard Foundation Dinners"}
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
  {val:"Eater NY",label:"Eater NY"},{val:"The Infatuation",label:"The Infatuation"},{val:"NY Times Dining",label:"NY Times Dining"},{val:"Resy hot list",label:"Resy hot list"},{val:"Tasting Table",label:"Tasting Table"},{val:"Conde Nast Traveler",label:"Conde Nast"}
];

function PillGroup({ pills, active, onToggle }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
      {pills.map(p => (
        <button key={p.val} onClick={() => onToggle(p.val)} style={{
          fontSize:13, padding:"5px 13px", borderRadius:99, cursor:"pointer",
          border: active.includes(p.val) ? "0.5px solid #888" : "0.5px solid #ccc",
          background: active.includes(p.val) ? "#f0f0f0" : "white",
          fontWeight: active.includes(p.val) ? 500 : 400
        }}>{p.label}</button>
      ))}
    </div>
  );
}

function Checkbox({ on, onClick, children }) {
  return (
    <div onClick={onClick} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", borderRadius:8, cursor:"pointer", fontSize:13, userSelect:"none", border: on ? "0.5px solid #888" : "0.5px solid #ddd", background: on ? "#f0f0f0" : "white" }}>
      <div style={{ width:14, height:14, borderRadius:3, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", border: on ? "1.5px solid #111" : "1.5px solid #ccc", background: on ? "#111" : "white" }}>
        {on && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><polyline points="1,4 3,6.5 7,1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      {children}
    </div>
  );
}

function RadioBox({ on, onClick, children }) {
  return (
    <div onClick={onClick} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", borderRadius:8, cursor:"pointer", fontSize:13, userSelect:"none", border: on ? "0.5px solid #888" : "0.5px solid #ddd", background: on ? "#f0f0f0" : "white" }}>
      <div style={{ width:8, height:8, borderRadius:"50%", flexShrink:0, border: on ? "1.5px solid #111" : "1.5px solid #ccc", background: on ? "#111" : "white" }} />
      {children}
    </div>
  );
}

const SectionLabel = ({ text }) => (
  <p style={{ fontSize:11, fontWeight:500, color:"#888", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{text}</p>
);

const inputStyle = { fontSize:13, padding:"7px 10px", border:"0.5px solid #ccc", borderRadius:8, width:"100%", background:"white", boxSizing:"border-box" };

function VenueCard({ venue, onMore, onAlt }) {
  return (
    <div style={{ border: venue.top_pick ? "1.5px solid #1D9E75" : "0.5px solid #e0e0e0", borderRadius:12, padding:"16px 20px", marginBottom:12, background:"white" }}>
      {venue.top_pick && <span style={{ fontSize:11, fontWeight:500, background:"#E1F5EE", color:"#085041", padding:"2px 9px", borderRadius:99, display:"inline-block", marginBottom:6 }}>top pick</span>}
      {venue.on_team_list && <span style={{ fontSize:11, fontWeight:500, background:"#EEEDFE", color:"#3C3489", padding:"2px 9px", borderRadius:99, display:"inline-block", marginBottom:6, marginLeft:6 }}>on your list</span>}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
        <span style={{ fontSize:15, fontWeight:500 }}>{venue.name}</span>
        <span style={{ fontSize:13, color:"#888" }}>{venue.price_range}</span>
      </div>
      {venue.neighborhood && <div style={{ fontSize:12, color:"#888", marginBottom:8 }}>{venue.neighborhood}</div>}
      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:8 }}>
        {(venue.sources_mentioned || []).map(s => (
          <span key={s} style={{ fontSize:11, padding:"3px 8px", borderRadius:6, fontWeight:500, background: s.toLowerCase().includes("eater") ? "#FAECE7" : s.toLowerCase().includes("infat") ? "#FBEAF0" : s.toLowerCase().includes("times") ? "#E6F1FB" : "#FAEEDA", color: s.toLowerCase().includes("eater") ? "#712B13" : s.toLowerCase().includes("infat") ? "#72243E" : s.toLowerCase().includes("times") ? "#0C447C" : "#633806" }}>{s}</span>
        ))}
        {(venue.tags || []).map(t => <span key={t} style={{ fontSize:11, padding:"3px 8px", borderRadius:6, fontWeight:500, background:"#EEEDFE", color:"#3C3489" }}>{t}</span>)}
      </div>
      {venue.source_notes && <div style={{ fontSize:13, color:"#666", lineHeight:1.6, borderLeft:"2px solid #e0e0e0", paddingLeft:10, marginBottom:8 }}>{venue.source_notes}</div>}
      {venue.why_it_fits && <div style={{ fontSize:13, color:"#666", lineHeight:1.6, borderLeft:"2px solid #e0e0e0", paddingLeft:10, marginBottom:8 }}>{venue.why_it_fits}</div>}
      {venue.reservation_tip && <div style={{ fontSize:12, color:"#888", marginBottom:10 }}>{venue.reservation_tip}</div>}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        <button onClick={() => onMore(venue.name)} style={{ fontSize:12, padding:"5px 12px", borderRadius:8, border:"0.5px solid #ccc", background:"white", cursor:"pointer" }}>more details</button>
        <button onClick={() => onAlt(venue.name)} style={{ fontSize:12, padding:"5px 12px", borderRadius:8, border:"0.5px solid #ccc", background:"white", cursor:"pointer" }}>find alternatives</button>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("search");
  const [occasion, setOccasion] = useState(["client dinner"]);
  const [vibe, setVibe] = useState(["impressive, wow factor"]);
  const [type, setType] = useState(["restaurant"]);
  const [sources, setSources] = useState(["Eater NY","The Infatuation","NY Times Dining"]);
  const [culinaryEvents, setCulinaryEvents] = useState(false);
  const [neighborhood, setNeighborhood] = useState("");
  const [headcount, setHeadcount] = useState(4);
  const [time, setTime] = useState("dinner (6-10pm)");
  const [budget, setBudget] = useState("$100-150");
  const [cuisine, setCuisine] = useState("");
  const [notes, setNotes] = useState("");
  const [dates, setDates] = useState([]);
  const [dateInput, setDateInput] = useState("");
  const [count, setCount] = useState("3");
  const [useTeam, setUseTeam] = useState("yes");
  const [delivery, setDelivery] = useState(false);
  const [walkIn, setWalkIn] = useState(false);
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

  const buildPrompt = (extra) => {
    const loc = neighborhood || "Manhattan, NYC";
    const dateStr = dates.length ? dates.map(d => new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" })).join(", ") : "flexible / no specific date";
    const allSources = sources.length ? sources.join(", ") : "Eater NY, The Infatuation";
    const resPlatforms = [resResy && "Resy", resOT && "OpenTable", resSR && "SevenRooms", resTock && "Tock"].filter(Boolean);
    const extraOccasion = culinaryEvents ? ["culinary events & festivals"] : [];
    const occasionStr = [...occasion, ...extraOccasion].join(", ") || "dining out";

    const culinaryNote = culinaryEvents ? "\nCULINARY EVENTS MODE: Search broadly for ALL upcoming food & wine festivals, James Beard Foundation dinners, chef collaboration dinners, ticketed tasting events, immersive dining, and culinary popups in or near " + loc + (dates.length ? " around " + dateStr : " in the coming weeks and months") + ". For each event include: name, organizer, dates, ticket price, how to purchase, and why it is worth attending." : "";
    const deliveryNote = delivery ? "\nOnly recommend venues that offer delivery. Include which platform(s)." : "";
    const walkNote = walkIn ? "\nInclude walk-in only venues and note typical wait times." : "\nExclude walk-in only venues.";
    const resNote = resPlatforms.length ? "\nNote booking platform (" + resPlatforms.join(", ") + ") and include direct booking links." + (dates.length ? " Flag if hard to book on " + dateStr + "." : "") : "";
    const allItems = [...RESTAURANTS.map(x => x.name), ...ACTIVITIES.map(x => x.name), ...VENUES.map(x => x.name + (x.good === "Yes" ? " [TEAM FAVORITE]" : ""))];
    const teamCtx = useTeam === "yes" ? "\nCross-reference our team list and flag matches: " + allItems.join(", ") : "";

    if (extra) return extra;

    return "You are an expert NYC dining and nightlife scout. Search the web for current recommendations from " + allSources + ".\n\nOccasion: " + occasionStr + "\nType: " + (type.join(", ") || "restaurant") + "\nVibe: " + (vibe.join(", ") || "good atmosphere") + "\nLocation: " + loc + "\nHeadcount: " + headcount + " people\nTime: " + time + "\nDate(s): " + dateStr + "\nBudget: " + budget + " per person\nCuisine/focus: " + (cuisine || "open") + "\nNotes: " + (notes || "none") + culinaryNote + deliveryNote + walkNote + resNote + teamCtx + "\n\nReturn ONLY a valid JSON array, no markdown, no explanation. Each object:\n{\"name\":\"\",\"neighborhood\":\"\",\"price_range\":\"\",\"sources_mentioned\":[],\"source_notes\":\"\",\"tags\":[],\"why_it_fits\":\"\",\"reservation_tip\":\"\",\"on_team_list\":false,\"top_pick\":false}\n\nOnly one item should have top_pick: true.";
  };

  const callClaude = async (prompt) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, tools: [{ type: "web_search_20250305", name: "web_search" }], messages: [{ role: "user", content: prompt }] })
    });
    if (!res.ok) throw new Error("API error " + res.status);
    const data = await res.json();
    return data.content.filter(b => b.type === "text").map(b => b.text).join("\n");
  };

  const runSearch = async () => {
    setLoading(true);
    setResults(null);
    setError(null);
    setFollowUpResult(null);
    try {
      const text = await callClaude(buildPrompt());
      const start = text.indexOf("[");
      const end = text.lastIndexOf("]");
      if (start === -1 || end === -1) throw new Error("No results found");
      const venues = JSON.parse(text.slice(start, end + 1));
      setResults(venues);
    } catch (e) {
      setError("Something went wrong — please try again. " + e.message);
    }
    setLoading(false);
  };

  const runFollowUp = async (prompt) => {
    setFollowUpLoading(true);
    setFollowUpResult(null);
    try {
      const text = await callClaude(prompt);
      setFollowUpResult(text);
    } catch (e) {
      setFollowUpResult("Error: " + e.message);
    }
    setFollowUpLoading(false);
  };

  return (
    <div style={{ maxWidth:720, margin:"0 auto", padding:"24px 20px 60px", fontFamily:"system-ui, sans-serif" }}>
      <div style={{ display:"flex", marginBottom:24, borderBottom:"0.5px solid #e0e0e0" }}>
        {["search","team"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ fontSize:13, padding:"8px 16px", cursor:"pointer", background:"none", border:"none", borderBottom: tab === t ? "2px solid #111" : "2px solid transparent", fontWeight: tab === t ? 500 : 400, color: tab === t ? "#111" : "#888", marginBottom:-1 }}>
            {t === "search" ? "find venues" : "team list"}
          </button>
        ))}
      </div>

      {tab === "search" && (
        <div>
          <SectionLabel text="occasion" />
          <PillGroup pills={OCCASION_PILLS} active={occasion} onToggle={v => toggle(setOccasion, v)} />
          <button onClick={() => setCulinaryEvents(prev => !prev)} style={{ fontSize:13, padding:"5px 13px", borderRadius:99, cursor:"pointer", marginBottom:8, border: culinaryEvents ? "0.5px solid #888" : "0.5px solid #ccc", background: culinaryEvents ? "#f0f0f0" : "white", fontWeight: culinaryEvents ? 500 : 400 }}>
            culinary events & festivals
          </button>
          {culinaryEvents && <p style={{ fontSize:12, color:"#888", marginBottom:16, marginTop:6 }}>Searching all upcoming food & wine festivals, James Beard dinners, chef popups, and immersive dining in your selected location.</p>}
          {!culinaryEvents && <div style={{ marginBottom:16 }} />}

          <SectionLabel text="vibe" />
          <PillGroup pills={VIBE_PILLS} active={vibe} onToggle={v => toggle(setVibe, v)} />

          <SectionLabel text="type" />
          <PillGroup pills={TYPE_PILLS} active={type} onToggle={v => toggle(setType, v)} />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:16 }}>
            <div><label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>neighborhood / city</label><input style={inputStyle} placeholder="e.g. NYC, Savannah..." value={neighborhood} onChange={e => setNeighborhood(e.target.value)} /></div>
            <div><label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>headcount</label><input style={inputStyle} type="number" min={1} max={500} value={headcount} onChange={e => setHeadcount(e.target.value)} /></div>
            <div><label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>time of day</label>
              <select style={inputStyle} value={time} onChange={e => setTime(e.target.value)}>
                {["breakfast / brunch","lunch (12-3pm)","happy hour (4-7pm)","dinner (6-10pm)","late night (10pm+)","anytime / multi-day"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <SectionLabel text="date(s)" />
          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
            <input style={{ ...inputStyle, flex:1 }} type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} />
            <button onClick={addDate} style={{ fontSize:13, padding:"7px 14px", borderRadius:8, border:"0.5px solid #ccc", background:"white", cursor:"pointer", whiteSpace:"nowrap" }}>+ add date</button>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:4 }}>
            {dates.map(d => (
              <span key={d} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, padding:"4px 10px", borderRadius:99, border:"0.5px solid #ccc", background:"#f5f5f5" }}>
                {fmtDate(d)}<button onClick={() => setDates(prev => prev.filter(x => x !== d))} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:"#888", padding:0, lineHeight:1 }}>x</button>
              </span>
            ))}
          </div>
          <p style={{ fontSize:12, color:"#aaa", marginBottom:16, marginTop:4 }}>Add one or more dates — recommendations will be filtered for availability.</p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            <div><label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>per-person budget</label>
              <select style={inputStyle} value={budget} onChange={e => setBudget(e.target.value)}>
                {["under $30","$30-60","$60-100","$100-150","$150-250","$250-500","no limit / expense account"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div><label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>cuisine / focus</label><input style={inputStyle} placeholder="e.g. Japanese, open..." value={cuisine} onChange={e => setCuisine(e.target.value)} /></div>
          </div>

          <SectionLabel text="ordering options" />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
            <Checkbox on={delivery} onClick={() => setDelivery(prev => !prev)}>offers delivery</Checkbox>
            <Checkbox on={walkIn} onClick={() => setWalkIn(prev => !prev)}>include walk-in only</Checkbox>
          </div>

          <SectionLabel text="reservation platforms" />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
            <RadioBox on={resResy} onClick={() => setResResy(p => !p)}>Resy</RadioBox>
            <RadioBox on={resOT} onClick={() => setResOT(p => !p)}>OpenTable</RadioBox>
            <RadioBox on={resSR} onClick={() => setResSR(p => !p)}>SevenRooms</RadioBox>
            <RadioBox on={resTock} onClick={() => setResTock(p => !p)}>Tock</RadioBox>
          </div>
          <p style={{ fontSize:12, color:"#aaa", marginBottom:16 }}>I'll note each venue's booking platform and include direct links where possible.</p>

          <SectionLabel text="sources" />
          <PillGroup pills={SOURCE_PILLS} active={sources} onToggle={v => toggle(setSources, v)} />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            <div><label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>number of results</label>
              <select style={inputStyle} value={count} onChange={e => setCount(e.target.value)}>{["2","3","5"].map(o => <option key={o}>{o}</option>)}</select>
            </div>
            <div><label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>include team list picks?</label>
              <select style={inputStyle} value={useTeam} onChange={e => setUseTeam(e.target.value)}>
                <option value="yes">yes - cross-reference our list</option>
                <option value="no">no - find new spots only</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:12, color:"#888", display:"block", marginBottom:4 }}>anything else? (dietary needs, dress code, special requests...)</label>
            <textarea style={{ ...inputStyle, resize:"vertical" }} rows={2} value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          <button onClick={runSearch} disabled={loading} style={{ width:"100%", padding:11, borderRadius:8, border:"0.5px solid #ccc", background: loading ? "#f0f0f0" : "#f5f5f5", fontSize:14, fontWeight:500, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Searching..." : "Find recommendations"}
          </button>

          {error && <div style={{ marginTop:16, padding:"12px 16px", borderRadius:8, background:"#fff0f0", border:"0.5px solid #ffcccc", fontSize:13, color:"#cc0000" }}>{error}</div>}

          {results && (
            <div style={{ marginTop:20 }}>
              {results.map((v, i) => (
                <VenueCard key={i} venue={v}
                  onMore={name => runFollowUp("Tell me more about " + name + " in detail — what to order, insider tips, vibe, and what the space is like inside.")}
                  onAlt={name => runFollowUp("Find me 3 alternatives similar to " + name + " for the same occasion and location.")}
                />
              ))}
            </div>
          )}

          {(followUpLoading || followUpResult) && (
            <div style={{ marginTop:20, padding:"16px 20px", borderRadius:12, border:"0.5px solid #e0e0e0", background:"white" }}>
              {followUpLoading && <p style={{ fontSize:13, color:"#888" }}>Searching...</p>}
              {followUpResult && <p style={{ fontSize:13, color:"#333", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{followUpResult}</p>}
            </div>
          )}

          <div style={{ marginTop:20 }}>
            <label style={{ fontSize:12, color:"#888", display:"block", marginBottom:6 }}>ask a follow-up question</label>
            <div style={{ display:"flex", gap:8 }}>
              <input style={{ ...inputStyle, flex:1 }} placeholder="e.g. Does Gramercy Tavern have a private room?" value={followUp} onChange={e => setFollowUp(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && followUp.trim()) { runFollowUp(followUp); setFollowUp(""); }}} />
              <button onClick={() => { if (followUp.trim()) { runFollowUp(followUp); setFollowUp(""); }}} style={{ fontSize:13, padding:"7px 14px", borderRadius:8, border:"0.5px solid #ccc", background:"white", cursor:"pointer", whiteSpace:"nowrap" }}>Ask</button>
            </div>
          </div>
        </div>
      )}

      {tab === "team" && (
        <div>
          <SectionLabel text="restaurants" />
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
            {RESTAURANTS.map(r => <span key={r.name} title={[r.desc,r.loc,r.note].filter(Boolean).join(" - ")} style={{ fontSize:12, padding:"4px 11px", borderRadius:99, border:"0.5px solid #ddd", background:"#fafafa" }}>{r.name}</span>)}
          </div>
          <hr style={{ border:"none", borderTop:"0.5px solid #eee", margin:"0 0 18px" }} />
          <SectionLabel text="activities" />
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
            {ACTIVITIES.map(a => <span key={a.name} title={[a.desc,a.loc].filter(Boolean).join(" - ")} style={{ fontSize:12, padding:"4px 11px", borderRadius:99, border:"0.5px solid #ddd", background:"#fafafa" }}>{a.name}</span>)}
          </div>
          <hr style={{ border:"none", borderTop:"0.5px solid #eee", margin:"0 0 18px" }} />
          <SectionLabel text="event spaces / venues" />
          <div>
            {VENUES.map(v => (
              <div key={v.name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"0.5px solid #f0f0f0", fontSize:13, gap:8 }}>
                <span style={{ fontWeight:500 }}>{v.name}{v.loc && <span style={{ fontWeight:400, color:"#888" }}> - {v.loc}</span>}</span>
                <span style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                  {v.min && <span style={{ color:"#888", fontSize:12 }}>{v.min}</span>}
                  <span style={{ fontSize:11, fontWeight:500, color: v.status==="Yes" ? "#1D9E75" : v.status==="No" ? "#E24B4A" : "#BA7517" }}>{v.status || "-"}</span>
                  {v.good === "Yes" && <span style={{ fontSize:11, fontWeight:500, background:"#E1F5EE", color:"#085041", padding:"2px 8px", borderRadius:99 }}>top pick</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
