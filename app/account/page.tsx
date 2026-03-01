"use client";
import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";

const RESOURCES = [
  { id: 1, title: "Sammamish Farmers Market", type: "Event", date: "Every Wednesday", time: "3:00 PM – 8:00 PM", location: "Upper Sammamish Commons", tags: ["Community", "Food", "Family"] },
  { id: 2, title: "Volunteer @ Sammamish Landing", type: "Volunteering", date: "Sat, Feb 2", time: "9:00 AM – 12:00 PM", location: "Sammamish Landing", tags: ["Environment", "Volunteering"] },
  { id: 3, title: "Coffee with Council", type: "Event", date: "Thu, Jan 28", time: "10:00 AM – 11:30 AM", location: "City Hall", tags: ["Government", "Networking"] },
  { id: 4, title: "Youth Soccer Program", type: "Program", date: "Every Saturday", time: "10:00 AM – 12:00 PM", location: "Marymoor Park", tags: ["Youth", "Sports"] },
  { id: 5, title: "iCode Intro to Coding", type: "Workshop", date: "Fri, Feb 5", time: "6:00 PM – 8:00 PM", location: "iCode Sammamish", tags: ["Education"] },
  { id: 6, title: "Senior Fitness Classes", type: "Program", date: "Mon & Wed", time: "9:00 AM – 10:00 AM", location: "Sammamish YMCA", tags: ["Seniors", "Health"] },
];

interface HourEntry {
  id: string;
  activity: string;
  date: string;
  hours: number;
  notes: string;
}

const TABS = ["Volunteer Hours", "Events & Activities", "Saved Resources", "My Goals"];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);

  // Volunteer hours
  const [hourEntries, setHourEntries] = useState<HourEntry[]>([]);
  const [showHourForm, setShowHourForm] = useState(false);
  const [hourForm, setHourForm] = useState({ activity: "", date: "", hours: "", notes: "" });

  // Events
  const [attendedIds, setAttendedIds] = useState<number[]>([]);

  // Saved
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // Goals
  const [goalHours, setGoalHours] = useState(0);
  const [goalInput, setGoalInput] = useState("");

  useEffect(() => {
    try {
      const h = localStorage.getItem("sc_volunteer_hours");
      if (h) setHourEntries(JSON.parse(h));
      const a = localStorage.getItem("sc_attended_events");
      if (a) setAttendedIds(JSON.parse(a));
      const s = localStorage.getItem("sc_saved_resources");
      if (s) setSavedIds(JSON.parse(s));
      const g = localStorage.getItem("sc_volunteer_goal");
      if (g) setGoalHours(Number(g));
    } catch {}
  }, []);

  const save = (key: string, val: unknown) => localStorage.setItem(key, JSON.stringify(val));

  const totalHours = hourEntries.reduce((s, e) => s + e.hours, 0);

  const addEntry = () => {
    if (!hourForm.activity || !hourForm.date || !hourForm.hours) return;
    const entry: HourEntry = { id: Date.now().toString(), activity: hourForm.activity, date: hourForm.date, hours: Number(hourForm.hours), notes: hourForm.notes };
    const updated = [entry, ...hourEntries];
    setHourEntries(updated);
    save("sc_volunteer_hours", updated);
    setHourForm({ activity: "", date: "", hours: "", notes: "" });
    setShowHourForm(false);
  };

  const deleteEntry = (id: string) => {
    const updated = hourEntries.filter((e) => e.id !== id);
    setHourEntries(updated);
    save("sc_volunteer_hours", updated);
  };

  const toggleAttended = (id: number) => {
    const updated = attendedIds.includes(id) ? attendedIds.filter((i) => i !== id) : [...attendedIds, id];
    setAttendedIds(updated);
    save("sc_attended_events", updated);
  };

  const toggleSaved = (id: number) => {
    const updated = savedIds.includes(id) ? savedIds.filter((i) => i !== id) : [...savedIds, id];
    setSavedIds(updated);
    save("sc_saved_resources", updated);
  };

  const setGoal = () => {
    const val = Number(goalInput);
    if (!val || val <= 0) return;
    setGoalHours(val);
    save("sc_volunteer_goal", val);
    setGoalInput("");
  };

  const goalProgress = goalHours > 0 ? Math.min((totalHours / goalHours) * 100, 100) : 0;
  const sortedResources = [...RESOURCES].sort((a, b) => (attendedIds.includes(b.id) ? 1 : 0) - (attendedIds.includes(a.id) ? 1 : 0));
  const savedResources = RESOURCES.filter((r) => savedIds.includes(r.id));
  const unsavedResources = RESOURCES.filter((r) => !savedIds.includes(r.id));

  return (
    <div className="acc-page">
      <style>{`
        .acc-page { min-height: 100vh; background: linear-gradient(160deg, #0f2828 0%, #1a3a3a 100%); color: white; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; }
        .acc-main { flex: 1; padding: 40px 80px 60px; max-width: 1100px; margin: 0 auto; width: 100%; box-sizing: border-box; }

        .acc-profile { display: flex; align-items: center; justify-content: space-between; margin-bottom: 36px; flex-wrap: wrap; gap: 16px; }
        .acc-profile-left { display: flex; align-items: center; gap: 18px; }
        .acc-avatar { width: 60px; height: 60px; border-radius: 50%; background: #FFC300; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; color: #0f2828; flex-shrink: 0; }
        .acc-pill { display: inline-block; background: #FFC300; color: #0f2828; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; padding: 3px 10px; border-radius: 999px; margin-bottom: 4px; }
        .acc-email { font-size: 13px; color: rgba(255,244,210,0.55); }
        .acc-logout { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.65); padding: 8px 20px; border-radius: 8px; cursor: pointer; font-size: 13px; font-family: 'Inter', sans-serif; transition: all 0.2s; }
        .acc-logout:hover { border-color: rgba(255,255,255,0.45); color: white; }

        .acc-tabs { display: flex; gap: 4px; margin-bottom: 28px; background: rgba(255,255,255,0.05); padding: 5px; border-radius: 12px; width: fit-content; flex-wrap: wrap; }
        .acc-tab { padding: 9px 18px; border-radius: 8px; border: none; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; transition: all 0.2s; background: transparent; color: rgba(255,244,210,0.5); }
        .acc-tab.active { background: #FFC300; color: #0f2828; font-weight: 600; }
        .acc-tab:not(.active):hover { background: rgba(255,255,255,0.08); color: #FFF4D2; }

        .acc-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; padding: 28px; }
        .acc-title { font-family: 'Source Serif Pro', serif; font-size: 22px; color: #FFF4D2; margin: 0 0 4px; }
        .acc-sub { font-size: 13px; color: rgba(255,244,210,0.45); margin: 0 0 24px; }

        /* Hours */
        .acc-hours-hero { text-align: center; padding: 24px; background: rgba(255,195,0,0.07); border: 1px solid rgba(255,195,0,0.18); border-radius: 12px; margin-bottom: 20px; }
        .acc-hours-num { font-size: 60px; font-weight: 700; color: #FFC300; line-height: 1; }
        .acc-hours-lbl { font-size: 13px; color: rgba(255,244,210,0.5); margin-top: 6px; }
        .acc-add-btn { background: #FFC300; color: #0f2828; border: none; border-radius: 8px; padding: 10px 20px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.2s; }
        .acc-add-btn:hover { background: #e6b000; }
        .acc-form { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px; margin: 14px 0; display: grid; gap: 10px; }
        .acc-inp { width: 100%; padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.13); background: rgba(255,255,255,0.07); color: #FFF4D2; font-family: 'Inter', sans-serif; font-size: 13px; outline: none; box-sizing: border-box; }
        .acc-inp::placeholder { color: rgba(255,244,210,0.3); }
        .acc-inp:focus { border-color: rgba(255,195,0,0.45); }
        .acc-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .acc-form-btns { display: flex; gap: 10px; }
        .acc-cancel-btn { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,244,210,0.55); border-radius: 8px; padding: 10px 18px; font-size: 13px; cursor: pointer; font-family: 'Inter', sans-serif; }
        .acc-entry-list { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
        .acc-entry { display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 12px 14px; }
        .acc-entry-date { font-size: 11px; color: rgba(255,244,210,0.4); min-width: 76px; }
        .acc-entry-name { flex: 1; font-size: 14px; color: #FFF4D2; }
        .acc-entry-note { font-size: 11px; color: rgba(255,244,210,0.4); margin-top: 2px; }
        .acc-hrs-badge { background: rgba(255,195,0,0.12); color: #FFC300; border: 1px solid rgba(255,195,0,0.25); border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 600; white-space: nowrap; }
        .acc-del { background: transparent; border: none; color: rgba(255,255,255,0.25); cursor: pointer; font-size: 18px; padding: 0 4px; line-height: 1; transition: color 0.2s; }
        .acc-del:hover { color: #ff6b6b; }
        .acc-empty { text-align: center; padding: 40px 20px; color: rgba(255,244,210,0.4); font-size: 14px; line-height: 1.6; }

        /* Resource cards */
        .acc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
        .acc-rc { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; transition: border-color 0.2s; }
        .acc-rc.attended { border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.04); }
        .acc-rc.saved { border-color: rgba(255,195,0,0.25); }
        .acc-rc-type { font-size: 10px; font-weight: 600; letter-spacing: 0.07em; color: rgba(255,244,210,0.4); text-transform: uppercase; margin-bottom: 5px; }
        .acc-rc-title { font-size: 14px; font-weight: 600; color: #FFF4D2; margin-bottom: 6px; }
        .acc-rc-meta { font-size: 12px; color: rgba(255,244,210,0.45); margin-bottom: 3px; }
        .acc-rc-tags { display: flex; gap: 5px; flex-wrap: wrap; margin: 8px 0 12px; }
        .acc-rc-tag { font-size: 10px; padding: 2px 7px; border-radius: 999px; background: rgba(255,255,255,0.06); color: rgba(255,244,210,0.55); border: 1px solid rgba(255,255,255,0.09); }
        .acc-toggle-btn { width: 100%; padding: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: rgba(255,244,210,0.6); font-size: 12px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .acc-toggle-btn.on-attended { background: rgba(16,185,129,0.12); border-color: rgba(16,185,129,0.35); color: #10B981; }
        .acc-toggle-btn.on-saved { background: rgba(255,195,0,0.1); border-color: rgba(255,195,0,0.35); color: #FFC300; }
        .acc-toggle-btn:not(.on-attended):not(.on-saved):hover { background: rgba(255,255,255,0.07); color: #FFF4D2; }
        .acc-section-lbl { font-size: 12px; color: rgba(255,244,210,0.35); margin: 22px 0 10px; }

        /* Goals */
        .acc-goal-box { background: rgba(255,195,0,0.06); border: 1px solid rgba(255,195,0,0.18); border-radius: 12px; padding: 24px; margin-bottom: 20px; }
        .acc-goal-row { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .acc-goal-txt { font-size: 15px; color: rgba(255,244,210,0.7); }
        .acc-goal-pct { font-size: 24px; font-weight: 700; color: #FFC300; }
        .acc-bar-wrap { height: 10px; background: rgba(255,255,255,0.07); border-radius: 999px; overflow: hidden; }
        .acc-bar-fill { height: 100%; border-radius: 999px; background: #FFC300; transition: width 0.6s ease; }
        .acc-bar-lbls { display: flex; justify-content: space-between; margin-top: 5px; font-size: 11px; color: rgba(255,244,210,0.4); }
        .acc-goal-success { text-align: center; padding: 12px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: 8px; margin-top: 12px; color: #10B981; font-size: 14px; font-weight: 600; }
        .acc-goal-set { display: flex; gap: 10px; align-items: center; margin-top: 20px; }
        .acc-goal-inp { padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.13); background: rgba(255,255,255,0.07); color: #FFF4D2; font-family: 'Inter', sans-serif; font-size: 13px; outline: none; width: 160px; }
        .acc-goal-inp::placeholder { color: rgba(255,244,210,0.3); }
        .acc-goal-inp:focus { border-color: rgba(255,195,0,0.45); }
        .acc-milestones { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 18px; }
        .acc-ms { text-align: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 14px 8px; }
        .acc-ms.done { background: rgba(255,195,0,0.08); border-color: rgba(255,195,0,0.25); }
        .acc-ms-val { font-size: 18px; font-weight: 700; color: rgba(255,244,210,0.25); }
        .acc-ms.done .acc-ms-val { color: #FFC300; }
        .acc-ms-lbl { font-size: 11px; color: rgba(255,244,210,0.35); margin-top: 4px; }
        .acc-ms.done .acc-ms-lbl { color: rgba(255,244,210,0.6); }

        @media (max-width: 768px) {
          .acc-main { padding: 24px 16px 40px; }
          .acc-form-row { grid-template-columns: 1fr; }
          .acc-milestones { grid-template-columns: repeat(2, 1fr); }
          .acc-tabs { width: 100%; }
          .acc-tab { flex: 1; text-align: center; font-size: 12px; padding: 8px 10px; }
        }
      `}</style>

      <Header />

      <main className="acc-main">
        {/* Tabs */}
        <div className="acc-tabs">
          {TABS.map((t, i) => (
            <button key={t} className={`acc-tab${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
          ))}
        </div>

        {/* ── Volunteer Hours ── */}
        {activeTab === 0 && (
          <div className="acc-card">
            <h2 className="acc-title">Volunteer Hours</h2>
            <p className="acc-sub">Track the time you give back to the community.</p>

            <div className="acc-hours-hero">
              <div className="acc-hours-num">{totalHours}</div>
              <div className="acc-hours-lbl">total hours volunteered</div>
            </div>

            <button className="acc-add-btn" onClick={() => setShowHourForm((v) => !v)}>
              {showHourForm ? "Cancel" : "+ Log Hours"}
            </button>

            {showHourForm && (
              <div className="acc-form">
                <input className="acc-inp" placeholder="Activity name (e.g. Sammamish Landing cleanup)" value={hourForm.activity} onChange={(e) => setHourForm((f) => ({ ...f, activity: e.target.value }))} />
                <div className="acc-form-row">
                  <input className="acc-inp" type="date" value={hourForm.date} onChange={(e) => setHourForm((f) => ({ ...f, date: e.target.value }))} />
                  <input className="acc-inp" type="number" min="0.5" step="0.5" placeholder="Hours (e.g. 2.5)" value={hourForm.hours} onChange={(e) => setHourForm((f) => ({ ...f, hours: e.target.value }))} />
                </div>
                <input className="acc-inp" placeholder="Notes (optional)" value={hourForm.notes} onChange={(e) => setHourForm((f) => ({ ...f, notes: e.target.value }))} />
                <div className="acc-form-btns">
                  <button className="acc-add-btn" onClick={addEntry}>Save Entry</button>
                  <button className="acc-cancel-btn" onClick={() => setShowHourForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="acc-entry-list">
              {hourEntries.length === 0 && <div className="acc-empty">No hours logged yet.<br /><span style={{ fontSize: 13 }}>Click &quot;+ Log Hours&quot; to get started!</span></div>}
              {hourEntries.map((e) => (
                <div key={e.id} className="acc-entry">
                  <div className="acc-entry-date">{e.date}</div>
                  <div style={{ flex: 1 }}>
                    <div className="acc-entry-name">{e.activity}</div>
                    {e.notes && <div className="acc-entry-note">{e.notes}</div>}
                  </div>
                  <div className="acc-hrs-badge">{e.hours}h</div>
                  <button className="acc-del" onClick={() => deleteEntry(e.id)} aria-label="Delete">×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Events & Activities ── */}
        {activeTab === 1 && (
          <div className="acc-card">
            <h2 className="acc-title">Events & Activities</h2>
            <p className="acc-sub">Mark community events and activities you&apos;ve attended.</p>
            <div className="acc-grid">
              {sortedResources.map((r) => {
                const attended = attendedIds.includes(r.id);
                return (
                  <div key={r.id} className={`acc-rc${attended ? " attended" : ""}`}>
                    <div className="acc-rc-type">{r.type}</div>
                    <div className="acc-rc-title">{r.title}</div>
                    <div className="acc-rc-meta">{r.date} · {r.time}</div>
                    <div className="acc-rc-meta">{r.location}</div>
                    <div className="acc-rc-tags">{r.tags.map((t) => <span key={t} className="acc-rc-tag">{t}</span>)}</div>
                    <button className={`acc-toggle-btn${attended ? " on-attended" : ""}`} onClick={() => toggleAttended(r.id)}>
                      {attended ? <><span>✓</span> Attended</> : "Mark as Attended"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Saved Resources ── */}
        {activeTab === 2 && (
          <div className="acc-card">
            <h2 className="acc-title">Saved Resources</h2>
            <p className="acc-sub">Bookmark resources you want to come back to.</p>

            {savedResources.length === 0
              ? <div className="acc-empty">No saved resources yet.<br /><span style={{ fontSize: 13 }}>Save resources below or visit the <a href="/directory" style={{ color: "#FFC300" }}>Directory</a>.</span></div>
              : (
                <>
                  <div className="acc-grid">
                    {savedResources.map((r) => (
                      <div key={r.id} className="acc-rc saved">
                        <div className="acc-rc-type">{r.type}</div>
                        <div className="acc-rc-title">{r.title}</div>
                        <div className="acc-rc-meta">{r.date} · {r.time}</div>
                        <div className="acc-rc-meta">{r.location}</div>
                        <div className="acc-rc-tags">{r.tags.map((t) => <span key={t} className="acc-rc-tag">{t}</span>)}</div>
                        <button className="acc-toggle-btn on-saved" onClick={() => toggleSaved(r.id)}><span>★</span> Saved — remove</button>
                      </div>
                    ))}
                  </div>
                </>
              )}

            {unsavedResources.length > 0 && (
              <>
                <p className="acc-section-lbl">All resources — click to save:</p>
                <div className="acc-grid">
                  {unsavedResources.map((r) => (
                    <div key={r.id} className="acc-rc">
                      <div className="acc-rc-type">{r.type}</div>
                      <div className="acc-rc-title">{r.title}</div>
                      <div className="acc-rc-meta">{r.date} · {r.time}</div>
                      <div className="acc-rc-meta">{r.location}</div>
                      <div className="acc-rc-tags">{r.tags.map((t) => <span key={t} className="acc-rc-tag">{t}</span>)}</div>
                      <button className="acc-toggle-btn" onClick={() => toggleSaved(r.id)}><span>☆</span> Save Resource</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── My Goals ── */}
        {activeTab === 3 && (
          <div className="acc-card">
            <h2 className="acc-title">My Goals</h2>
            <p className="acc-sub">Set a volunteer hours goal and track your progress.</p>

            <div className="acc-goal-box">
              <div className="acc-goal-row">
                <div className="acc-goal-txt">
                  {goalHours > 0 ? `${totalHours} of ${goalHours} hours completed` : "No goal set yet"}
                </div>
                {goalHours > 0 && <div className="acc-goal-pct">{Math.round(goalProgress)}%</div>}
              </div>
              {goalHours > 0 && (
                <>
                  <div className="acc-bar-wrap">
                    <div className="acc-bar-fill" style={{ width: `${goalProgress}%` }} />
                  </div>
                  <div className="acc-bar-lbls"><span>0h</span><span>{goalHours}h</span></div>
                </>
              )}
              {goalProgress >= 100 && (
                <div className="acc-goal-success">Goal reached! You&apos;ve volunteered {totalHours} hours — amazing work!</div>
              )}
            </div>

            <div className="acc-goal-set">
              <input
                className="acc-goal-inp"
                type="number"
                min="1"
                placeholder={goalHours > 0 ? `Current: ${goalHours}h` : "e.g. 20"}
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setGoal()}
              />
              <button className="acc-add-btn" onClick={setGoal}>{goalHours > 0 ? "Update Goal" : "Set Goal"}</button>
            </div>

            {goalHours > 0 && (
              <>
                <p className="acc-section-lbl">Milestones</p>
                <div className="acc-milestones">
                  {[25, 50, 75, 100].map((pct) => {
                    const reached = goalProgress >= pct;
                    return (
                      <div key={pct} className={`acc-ms${reached ? " done" : ""}`}>
                        <div className="acc-ms-val">{reached ? "✓" : `${pct}%`}</div>
                        <div className="acc-ms-lbl">{Math.round(goalHours * pct / 100)}h</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
