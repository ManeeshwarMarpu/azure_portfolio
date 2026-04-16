import React, { useState, useEffect } from 'react';
import { SettingsProvider, useSettings } from './SettingsContext';
import TopBar         from './components/TopBar';
import Sidebar        from './components/Sidebar';
import Chatbot        from './components/Chatbot';
import Overview       from './sections/Overview';
import Projects       from './sections/Projects';
import Skills         from './sections/Skills';
import Experience     from './sections/Experience';
import Certifications from './sections/Certifications';
import Contact        from './sections/Contact';
import About         from './sections/About';
import { NAV_ITEMS }  from './data';

// Inner app reads from context
function PortfolioApp() {
  const { collapsed, t } = useSettings();
  const [active, setActive] = useState('overview');
  const sideW = collapsed ? 48 : 220;

  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.id);
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.25 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily:"'Segoe UI','Segoe UI Web (West European)',system-ui,-apple-system,sans-serif", background: t.bg, minHeight:'100vh', color: t.text, transition:'background 0.25s, color 0.25s' }}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:${t.bg}; }
        ::-webkit-scrollbar-thumb { background:${t.border}; border-radius:3px; }
        button, a, input, textarea, select { font-family:inherit; }
      `}</style>

      <TopBar />
      <Sidebar active={active} setActive={setActive} />

      <main style={{ marginLeft:sideW, marginTop:48, padding:'24px 28px', transition:'margin-left 0.2s ease', minHeight:'calc(100vh - 48px)' }}>
        <Overview />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />

        <div style={{ borderTop:`1px solid ${t.border}`, paddingTop:14, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8, marginTop:8 }}>
          <span style={{ fontSize:12, color:t.textFaint }}>© 2025 Maneeshwar M · Senior DevOps Engineer · Houston, TX</span>
          <div style={{ display:'flex', gap:12 }}>
            {['AWS SAA-C03','AZ-400','AZ-104','CLF-C02'].map(c => <span key={c} style={{ fontSize:11, color:t.textFaint }}>{c}</span>)}
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  );
}

// Outer wrapper provides settings state
export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SettingsProvider collapsed={collapsed} setCollapsed={setCollapsed}>
      <PortfolioApp />
    </SettingsProvider>
  );
}
