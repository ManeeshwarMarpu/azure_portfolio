import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS, SKILLS_DATA, EXPERIENCE, CERTS } from '../data';
import { useSettings } from '../SettingsContext';

function buildSearchIndex() {
  const items = [];
  PROJECTS.forEach(p => items.push({ id: `project-${p.id}`, type: 'Project', title: p.title, subtitle: `${p.category} · ${p.region}`, section: 'projects', keywords: [p.title, p.category, p.region, ...p.stack, p.desc].join(' ').toLowerCase(), icon: p.icon, color: '#0078d4' }));
  Object.entries(SKILLS_DATA).forEach(([cat, data]) => {
    items.push({ id: `skill-${cat}`, type: 'Skill', title: cat, subtitle: data.items.slice(0,3).join(', ')+'...', section: 'skills', keywords: [cat,...data.items].join(' ').toLowerCase(), icon: data.icon, color: data.color });
    data.items.forEach(skill => items.push({ id: `skill-item-${skill}`, type: 'Technology', title: skill, subtitle: `Under: ${cat}`, section: 'skills', keywords: skill.toLowerCase(), icon: data.icon, color: data.color }));
  });
  EXPERIENCE.forEach(e => items.push({ id: `exp-${e.company}`, type: 'Experience', title: e.company, subtitle: `${e.role} · ${e.period}`, section: 'experience', keywords: [e.company,e.role,e.location,...e.kpis,...e.bullets].join(' ').toLowerCase(), icon: '💼', color: e.color }));
  CERTS.forEach(c => items.push({ id: `cert-${c.code}`, type: 'Certification', title: c.name, subtitle: `${c.vendor} · ${c.code}`, section: 'certifications', keywords: [c.name,c.vendor,c.code].join(' ').toLowerCase(), icon: '🏅', color: c.color }));
  return items;
}
const SEARCH_INDEX = buildSearchIndex();

const NOTIFICATIONS = [
  { id:1, type:'success', title:'Pipeline deployed successfully', body:'Multi-Cloud CI/CD Platform · All 3 clouds healthy', time:'2m ago', read:false },
  { id:2, type:'info',    title:'New connection on LinkedIn',     body:'Someone viewed your profile',                     time:'1h ago', read:false },
  { id:3, type:'warning', title:'Certificate expiry reminder',    body:'AZ-400 renewal due in 90 days',                  time:'3h ago', read:true  },
  { id:4, type:'success', title:'Kubernetes cluster healthy',     body:'EKS · AKS · GKE — all nodes running',            time:'5h ago', read:true  },
  { id:5, type:'info',    title:'Portfolio viewed',               body:'Recruiter from Rackspace opened your profile',    time:'1d ago', read:true  },
];

// ── LinkedIn QR Modal ─────────────────────────────────────────────────────────
function LinkedInModal({ onClose, t }) {
  const LINKEDIN_URL = 'https://linkedin.com/in/maneeshwar11';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(LINKEDIN_URL)}&color=0a66c2&bgcolor=ffffff`;
  const [qrFailed, setQrFailed] = useState(false);

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:t.surface, border:`1px solid ${t.border}`, borderRadius:10, padding:'28px 32px', boxShadow:'0 20px 60px rgba(0,0,0,0.3)', display:'flex', flexDirection:'column', alignItems:'center', gap:16, width:280, position:'relative', animation:'popIn 0.2s ease' }}>
        <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }`}</style>
        <button onClick={onClose} style={{ position:'absolute', top:10, right:14, background:'none', border:'none', cursor:'pointer', color:t.textFaint, fontSize:22, lineHeight:1 }}>×</button>

        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:6, background:'#0a66c2', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:t.text }}>Maneeshwar M</div>
            <div style={{ fontSize:11, color:'#0a66c2' }}>Senior DevOps Engineer</div>
          </div>
        </div>

        {/* QR Code */}
        <div style={{ width:196, height:196, borderRadius:8, border:'2px solid #0a66c2', padding:6, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {!qrFailed ? (
            <img src={qrUrl} alt="LinkedIn QR" width={180} height={180} style={{ borderRadius:4, display:'block' }} onError={() => setQrFailed(true)} />
          ) : (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, color:'#605e5c', fontSize:12, textAlign:'center', padding:12 }}>
              <span style={{ fontSize:36 }}>🔗</span>
              <span>linkedin.com/in/maneeshwar11</span>
            </div>
          )}
        </div>

        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:12, color:t.textMuted, marginBottom:10 }}>Scan with phone camera to open LinkedIn</div>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" style={{ display:'inline-block', fontSize:13, color:'#fff', background:'#0a66c2', borderRadius:5, padding:'8px 22px', textDecoration:'none', fontWeight:600 }}>
            Open LinkedIn →
          </a>
        </div>
        <div style={{ fontSize:10, color:t.textFaint, fontFamily:'monospace' }}>linkedin.com/in/maneeshwar11</div>
      </div>
    </div>
  );
}

// ── Search Dropdown ───────────────────────────────────────────────────────────
function SearchDropdown({ query, results, onSelect, t }) {
  if (!query) return null;
  return (
    <div style={{ position:'absolute', top:'100%', left:0, right:0, background:t.surface, border:`1px solid ${t.border}`, borderTop:'none', borderRadius:'0 0 4px 4px', boxShadow:'0 8px 24px rgba(0,0,0,0.12)', maxHeight:360, overflowY:'auto', zIndex:300 }}>
      {results.length === 0 ? (
        <div style={{ padding:16, fontSize:13, color:t.textFaint, textAlign:'center' }}>No results for "{query}"</div>
      ) : (
        <>
          <div style={{ padding:'6px 14px 4px', fontSize:10, color:t.textFaint, letterSpacing:'0.08em', textTransform:'uppercase', background:t.subtleBg, borderBottom:`1px solid ${t.border}` }}>{results.length} result{results.length!==1?'s':''}</div>
          {results.map(r => (
            <div key={r.id} onClick={() => onSelect(r)} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 14px', cursor:'pointer', borderBottom:`1px solid ${t.subtleBg}`, transition:'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background=t.hoverBg}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <div style={{ width:28, height:28, borderRadius:4, background:`${r.color}14`, border:`1px solid ${r.color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{r.icon}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:500, color:t.text, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.title}</div>
                <div style={{ fontSize:11, color:t.textFaint, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.subtitle}</div>
              </div>
              <span style={{ fontSize:10, color:r.color, background:`${r.color}12`, border:`1px solid ${r.color}25`, borderRadius:3, padding:'2px 7px', flexShrink:0 }}>{r.type}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ── Notifications ─────────────────────────────────────────────────────────────
function NotificationsPanel({ onClose, t }) {
  const [items, setItems] = useState(NOTIFICATIONS);
  const unread = items.filter(n => !n.read).length;
  const tc = { success:'#107c10', info:'#0078d4', warning:'#d83b01' };
  const tb = { success:'#dff6dd', info:'#e6f3fb',  warning:'#fff4ce' };
  const ti = { success:'✓', info:'ℹ', warning:'⚠' };
  return (
    <div style={{ position:'absolute', top:'100%', right:0, width:340, background:t.surface, border:`1px solid ${t.border}`, borderRadius:4, boxShadow:'0 8px 24px rgba(0,0,0,0.12)', zIndex:300, overflow:'hidden' }}>
      <div style={{ padding:'12px 16px', borderBottom:`1px solid ${t.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <span style={{ fontSize:14, fontWeight:600, color:t.text }}>Notifications</span>
          {unread > 0 && <span style={{ marginLeft:8, fontSize:11, background:'#0078d4', color:'#fff', padding:'1px 7px', borderRadius:10, fontWeight:600 }}>{unread}</span>}
        </div>
        {unread > 0 && <button onClick={() => setItems(p => p.map(n=>({...n,read:true})))} style={{ fontSize:11, color:'#0078d4', background:'none', border:'none', cursor:'pointer' }}>Mark all read</button>}
      </div>
      <div style={{ maxHeight:380, overflowY:'auto' }}>
        {items.map(n => (
          <div key={n.id} onClick={() => setItems(p => p.map(x => x.id===n.id?{...x,read:true}:x))}
            style={{ display:'flex', gap:10, padding:'11px 16px', borderBottom:`1px solid ${t.subtleBg}`, background:n.read?t.surface:t.subtleBg, cursor:'pointer', transition:'background 0.1s' }}
            onMouseEnter={e => e.currentTarget.style.background=t.hoverBg}
            onMouseLeave={e => e.currentTarget.style.background=n.read?t.surface:t.subtleBg}
          >
            <div style={{ width:28, height:28, borderRadius:'50%', flexShrink:0, background:tb[n.type], border:`1px solid ${tc[n.type]}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:tc[n.type], fontWeight:700 }}>{ti[n.type]}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <span style={{ fontSize:13, fontWeight:n.read?400:600, color:t.text }}>{n.title}</span>
                {!n.read && <div style={{ width:7, height:7, borderRadius:'50%', background:'#0078d4', flexShrink:0, marginTop:4 }} />}
              </div>
              <div style={{ fontSize:11, color:t.textMuted, marginTop:2 }}>{n.body}</div>
              <div style={{ fontSize:10, color:t.textFaint, marginTop:3 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings Panel ────────────────────────────────────────────────────────────
function SettingsPanel({ onClose, t }) {
  const s = useSettings();
  const [tab, setTab] = useState('Appearance');
  const [draft, setDraft] = useState({
    theme: s.theme, collapsed: s.collapsed,
    compactCards: s.compactCards, showPremiumBadges: s.showPremiumBadges,
    animateScroll: s.animateScroll, defaultFilter: s.defaultFilter,
    aiModel: s.aiModel, showSuggestions: s.showSuggestions,
  });
  const setD = (k, v) => setDraft(d => ({ ...d, [k]: v }));
  const save = () => {
    s.setTheme(draft.theme); s.setCollapsed(draft.collapsed);
    s.setCompactCards(draft.compactCards); s.setShowPremiumBadges(draft.showPremiumBadges);
    s.setAnimateScroll(draft.animateScroll); s.setDefaultFilter(draft.defaultFilter);
    s.setAiModel(draft.aiModel); s.setShowSuggestions(draft.showSuggestions);
    onClose();
  };
  const Toggle = ({ val, k }) => (
    <div onClick={() => setD(k, !val)} style={{ width:40, height:22, borderRadius:11, cursor:'pointer', background:val?'#0078d4':'#c8c6c4', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:2, left:val?20:2, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }} />
    </div>
  );
  const Row = ({ label, children }) => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 16px', borderBottom:`1px solid ${t.subtleBg}` }}>
      <span style={{ fontSize:13, color:t.text }}>{label}</span>{children}
    </div>
  );
  const Sel = ({ k, val, opts }) => (
    <select value={val} onChange={e => setD(k, e.target.value)} style={{ fontSize:12, border:`1px solid ${t.border}`, borderRadius:3, padding:'4px 8px', color:t.text, background:t.inputBg, cursor:'pointer', outline:'none', fontFamily:'inherit' }}>
      {opts.map(o => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div style={{ position:'absolute', top:'100%', right:0, width:360, background:t.surface, border:`1px solid ${t.border}`, borderRadius:4, boxShadow:'0 8px 24px rgba(0,0,0,0.15)', zIndex:300, overflow:'hidden' }}>
      <div style={{ padding:'12px 16px', borderBottom:`1px solid ${t.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:14, fontWeight:600, color:t.text }}>⚙ Settings</span>
        <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:t.textFaint, fontSize:18 }}>×</button>
      </div>
      <div style={{ display:'flex', borderBottom:`1px solid ${t.border}` }}>
        {['Appearance','Layout','Portfolio','Chatbot'].map(tb => (
          <button key={tb} onClick={() => setTab(tb)} style={{ flex:1, padding:'8px 4px', background:'none', border:'none', borderBottom:tab===tb?'2px solid #0078d4':'2px solid transparent', fontSize:12, cursor:'pointer', color:tab===tb?'#0078d4':t.textMuted, fontWeight:tab===tb?600:400, fontFamily:'inherit', marginBottom:-1 }}>{tb}</button>
        ))}
      </div>
      <div style={{ padding:'4px 0' }}>
        {tab === 'Appearance' && <Row label="Theme"><Sel k="theme" val={draft.theme} opts={['Light (Azure)','Dark','System']} /></Row>}
        {tab === 'Layout' && <>
          <Row label="Collapse sidebar by default"><Toggle val={draft.collapsed} k="collapsed" /></Row>
          <Row label="Compact card layout"><Toggle val={draft.compactCards} k="compactCards" /></Row>
        </>}
        {tab === 'Portfolio' && <>
          <Row label="Default project filter"><Sel k="defaultFilter" val={draft.defaultFilter} opts={['All','CI/CD','Infrastructure','Observability','Security','Platform','FinOps']} /></Row>
          <Row label="Show Premium badges"><Toggle val={draft.showPremiumBadges} k="showPremiumBadges" /></Row>
          <Row label="Animate on scroll"><Toggle val={draft.animateScroll} k="animateScroll" /></Row>
        </>}
        {tab === 'Chatbot' && <>
          <Row label="AI Model"><Sel k="aiModel" val={draft.aiModel} opts={['claude-opus-4-5','claude-sonnet-4-5','claude-haiku-4-5-20251001']} /></Row>
          <Row label="Show suggested questions"><Toggle val={draft.showSuggestions} k="showSuggestions" /></Row>
        </>}
      </div>
      <div style={{ padding:'12px 16px', borderTop:`1px solid ${t.border}`, display:'flex', gap:8, justifyContent:'flex-end' }}>
        <button onClick={onClose} style={{ fontSize:12, color:t.textMuted, background:t.subtleBg, border:`1px solid ${t.border}`, borderRadius:3, padding:'6px 14px', cursor:'pointer', fontFamily:'inherit' }}>Cancel</button>
        <button onClick={save} style={{ fontSize:12, color:'#fff', background:'#0078d4', border:'none', borderRadius:3, padding:'6px 14px', cursor:'pointer', fontWeight:600, fontFamily:'inherit' }}>Save</button>
      </div>
    </div>
  );
}

// ── Help Panel ────────────────────────────────────────────────────────────────
function HelpPanel({ onClose, t }) {
  const rows = [['Navigate sections','Sidebar items'],['Search anything','Top search bar'],['Filter projects','Category tabs'],['View details','Click project card'],['Change theme','⚙ Settings → Appearance'],['Collapse sidebar','⚙ Settings → Layout'],['AI chatbot','🤖 bottom right'],['LinkedIn profile','Click MM avatar']];
  return (
    <div style={{ position:'absolute', top:'100%', right:0, width:300, background:t.surface, border:`1px solid ${t.border}`, borderRadius:4, boxShadow:'0 8px 24px rgba(0,0,0,0.12)', zIndex:300 }}>
      <div style={{ padding:'12px 16px', borderBottom:`1px solid ${t.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:14, fontWeight:600, color:t.text }}>? Help</span>
        <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:t.textFaint, fontSize:18 }}>×</button>
      </div>
      {rows.map(([a,h]) => (
        <div key={a} style={{ display:'flex', justifyContent:'space-between', padding:'8px 16px', borderBottom:`1px solid ${t.subtleBg}`, alignItems:'center' }}>
          <span style={{ fontSize:12, color:t.text }}>{a}</span>
          <span style={{ fontSize:11, color:t.textMuted, background:t.subtleBg, border:`1px solid ${t.border}`, borderRadius:3, padding:'2px 8px' }}>{h}</span>
        </div>
      ))}
    </div>
  );
}

// ── MAIN TOPBAR ───────────────────────────────────────────────────────────────
export default function TopBar() {
  const { collapsed, setCollapsed, t } = useSettings();
  const [searchQuery,  setSearchQuery]  = useState('');
  const [searchResults,setSearchResults]= useState([]);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [showNotifs,   setShowNotifs]   = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp,     setShowHelp]     = useState(false);
  const [showQR,       setShowQR]       = useState(false);
  const [unread,       setUnread]       = useState(NOTIFICATIONS.filter(n=>!n.read).length);

  const searchRef = useRef(null), notifsRef = useRef(null), settingsRef = useRef(null), helpRef = useRef(null);

  useEffect(() => {
    const h = e => {
      if (searchRef.current   && !searchRef.current.contains(e.target))   setSearchOpen(false);
      if (notifsRef.current   && !notifsRef.current.contains(e.target))   setShowNotifs(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setShowSettings(false);
      if (helpRef.current     && !helpRef.current.contains(e.target))     setShowHelp(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleSearch = q => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const lo = q.toLowerCase();
    setSearchResults(SEARCH_INDEX.filter(i => i.keywords.includes(lo)||i.title.toLowerCase().includes(lo)||i.subtitle.toLowerCase().includes(lo)).slice(0,10));
  };

  const closeAll = () => { setShowNotifs(false); setShowSettings(false); setShowHelp(false); };
  const toggle = p => {
    const was = p==='notifs'?showNotifs:p==='settings'?showSettings:showHelp;
    closeAll();
    if (!was) {
      if (p==='notifs')   { setShowNotifs(true);  setUnread(0); }
      if (p==='settings') setShowSettings(true);
      if (p==='help')     setShowHelp(true);
    }
  };

  const Btn = ({ children, active, onClick, title }) => (
    <button onClick={onClick} title={title} style={{ width:32, height:32, borderRadius:4, background:active?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:15, color:'#fff', transition:'background 0.15s', position:'relative' }}
      onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.2)'}
      onMouseLeave={e=>e.currentTarget.style.background=active?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.08)'}
    >{children}</button>
  );

  return (
    <>
      <div style={{ height:48, background:t.topbar, display:'flex', alignItems:'center', padding:'0 16px', gap:12, position:'fixed', top:0, left:0, right:0, zIndex:200, boxShadow:'0 2px 8px rgba(0,0,0,0.18)' }}>
        {/* Hamburger */}
        <button onClick={()=>setCollapsed(!collapsed)} style={{ background:'rgba(255,255,255,0.1)', border:'none', cursor:'pointer', padding:'7px 8px', borderRadius:4, display:'flex', flexDirection:'column', gap:4, alignItems:'center', transition:'background 0.15s' }}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.2)'}
          onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
        >{[0,1,2].map(i=><span key={i} style={{ display:'block', width:16, height:2, background:'#fff', borderRadius:1 }}/>)}</button>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:5, background:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>⚡</div>
          <span style={{ color:'#fff', fontSize:15, fontWeight:600 }}>Maneeshwar M</span>
          <span style={{ color:'rgba(255,255,255,0.45)', fontSize:14 }}>|</span>
          <span style={{ color:'rgba(255,255,255,0.85)', fontSize:13 }}>Cloud Engineer Portfolio</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5, marginLeft:4 }}>
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.55)' }}>Home</span>
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>›</span>
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.85)' }}>Engineer Profile</span>
        </div>

        <div style={{ flex:1 }} />

        {/* Search */}
        <div ref={searchRef} style={{ position:'relative', width:240 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.12)', borderRadius:searchOpen?'4px 4px 0 0':4, padding:'0 12px', border:'1px solid rgba(255,255,255,0.18)', height:32 }}>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.65)', flexShrink:0 }}>🔍</span>
            <input type="text" value={searchQuery} onChange={e=>{ handleSearch(e.target.value); setSearchOpen(true); }} onFocus={()=>setSearchOpen(true)}
              placeholder="Search skills, projects, tools..."
              style={{ background:'transparent', border:'none', outline:'none', color:'#fff', fontSize:12, flex:1, fontFamily:'inherit' }}
            />
            {searchQuery && <button onClick={()=>{ setSearchQuery(''); setSearchResults([]); setSearchOpen(false); }} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.7)', fontSize:16, padding:0 }}>×</button>}
          </div>
          {searchOpen && <SearchDropdown query={searchQuery} results={searchResults} onSelect={r=>{ setSearchQuery(''); setSearchResults([]); setSearchOpen(false); document.getElementById(r.section)?.scrollIntoView({behavior:'smooth'}); }} t={t} />}
        </div>

        {/* Notifications */}
        <div ref={notifsRef} style={{ position:'relative' }}>
          <Btn active={showNotifs} onClick={()=>toggle('notifs')} title="Notifications">
            🔔{unread>0 && <div style={{ position:'absolute', top:4, right:4, width:8, height:8, borderRadius:'50%', background:'#d13438', border:'1.5px solid #0078d4' }}/>}
          </Btn>
          {showNotifs && <NotificationsPanel onClose={()=>setShowNotifs(false)} t={t} />}
        </div>

        {/* Settings */}
        <div ref={settingsRef} style={{ position:'relative' }}>
          <Btn active={showSettings} onClick={()=>toggle('settings')} title="Settings">⚙</Btn>
          {showSettings && <SettingsPanel onClose={()=>setShowSettings(false)} t={t} />}
        </div>

        {/* Help */}
        <div ref={helpRef} style={{ position:'relative' }}>
          <Btn active={showHelp} onClick={()=>toggle('help')} title="Help">?</Btn>
          {showHelp && <HelpPanel onClose={()=>setShowHelp(false)} t={t} />}
        </div>

        {/* MM Avatar → LinkedIn QR */}
        <div onClick={()=>setShowQR(true)} title="View LinkedIn Profile"
          style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.18)', border:'2px solid rgba(255,255,255,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff', cursor:'pointer', marginLeft:2, transition:'all 0.15s', position:'relative' }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.7)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.18)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.4)'; }}
        >
          MM
          <div style={{ position:'absolute', bottom:0, right:0, width:9, height:9, borderRadius:'50%', background:'#0a66c2', border:'1.5px solid #0078d4' }}/>
        </div>
      </div>

      {showQR && <LinkedInModal onClose={()=>setShowQR(false)} t={t} />}
    </>
  );
}
