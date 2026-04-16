import React from 'react';
import { NAV_ITEMS } from '../data';
import { useSettings } from '../SettingsContext';

export default function Sidebar({ active, setActive }) {
  const { collapsed, t } = useSettings();
  const w = collapsed ? 48 : 220;

  return (
    <div style={{ position:'fixed', top:48, left:0, bottom:0, width:w, background:t.sidebarBg, borderRight:`1px solid ${t.border}`, zIndex:100, transition:'width 0.2s ease', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      {!collapsed && (
        <div style={{ padding:'16px', borderBottom:`1px solid ${t.border}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:38, height:38, borderRadius:'50%', background:'#0078d4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#fff', flexShrink:0 }}>MM</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:t.text }}>Maneeshwar M</div>
              <div style={{ fontSize:11, color:t.textMuted }}>Sr. DevOps Engineer</div>
            </div>
          </div>
          <div style={{ marginTop:10, display:'flex', gap:4, flexWrap:'wrap' }}>
            {['AWS','Azure','GCP'].map(p => (
              <span key={p} style={{ fontSize:10, background:`${t.accent}18`, color:t.accent, padding:'2px 8px', borderRadius:3, border:`1px solid ${t.accent}35` }}>{p}</span>
            ))}
            <span style={{ fontSize:10, background:'#107c1018', color:'#22c55e', padding:'2px 8px', borderRadius:3, border:'1px solid #22c55e35' }}>● Available</span>
          </div>
        </div>
      )}

      <div style={{ padding:'8px 0', flex:1, overflowY:'auto' }}>
        {!collapsed && (
          <div style={{ padding:'8px 16px 4px', fontSize:10, color:t.textFaint, letterSpacing:'0.1em', textTransform:'uppercase' }}>Navigation</div>
        )}
        {NAV_ITEMS.map(item => (
          <button key={item.id}
            onClick={() => { setActive(item.id); document.getElementById(item.id)?.scrollIntoView({behavior:'smooth'}); }}
            style={{ width:'100%', display:'flex', alignItems:'center', gap:collapsed?0:10, padding:collapsed?'10px 0':'9px 16px', justifyContent:collapsed?'center':'flex-start', background:active===item.id?`${t.accent}18`:'transparent', border:'none', borderLeft:active===item.id?`2px solid ${t.accent}`:'2px solid transparent', cursor:'pointer', transition:'all 0.12s', color:active===item.id?t.accent:t.text, fontSize:13, fontWeight:active===item.id?600:400 }}
            onMouseEnter={e=>{ if(active!==item.id) e.currentTarget.style.background=t.hoverBg; }}
            onMouseLeave={e=>{ if(active!==item.id) e.currentTarget.style.background='transparent'; }}
          >
            <span style={{ fontSize:14, flexShrink:0, opacity:active===item.id?1:0.65 }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {!collapsed && (
        <div style={{ borderTop:`1px solid ${t.border}`, padding:'12px 16px' }}>
          <a href="mailto:maneesh.05mm@gmail.com" style={{ fontSize:12, color:'#0078d4', textDecoration:'none', display:'block', marginBottom:5 }}>📧 maneesh.05mm@gmail.com</a>
          <a href="https://linkedin.com/in/maneeshwar11" target="_blank" rel="noreferrer" style={{ fontSize:12, color:'#0078d4', textDecoration:'none', display:'block' }}>🔗 linkedin.com/in/maneeshwar11</a>
        </div>
      )}
    </div>
  );
}
