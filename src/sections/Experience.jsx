import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { EXPERIENCE } from '../data';

export default function Experience() {
  const [active, setActive] = useState(0);
  const exp = EXPERIENCE[active];

  return (
    <section id="experience" style={{ marginBottom: 36 }}>
      <SectionHeader
        title="Work Experience"
        subtitle="Career history, roles, and key achievements"
        crumb="Experience"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 10 }}>
        {/* Left panel — company selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {EXPERIENCE.map((e, i) => (
            <button
              key={e.company}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? '#e6f3fb' : '#fff',
                border: '1px solid #edebe9',
                borderLeft: active === i ? `3px solid ${e.color}` : '3px solid transparent',
                borderRadius: 2,
                padding: '12px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.12s',
                fontFamily: "'Segoe UI', system-ui, sans-serif",
              }}
              onMouseEnter={ev => { if (active !== i) ev.currentTarget.style.background = '#f3f2f1'; }}
              onMouseLeave={ev => { if (active !== i) ev.currentTarget.style.background = '#fff'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 5, background: e.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>{e.logo}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#323130' }}>{e.company}</div>
                  <div style={{ fontSize: 11, color: '#a19f9d' }}>{e.period}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {e.kpis.slice(0, 2).map(k => (
                  <span key={k} style={{
                    fontSize: 10, background: '#e6f3fb', color: '#0078d4',
                    padding: '1px 6px', borderRadius: 2, border: '1px solid #c7e0f4',
                  }}>{k}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Right panel — detail */}
        <div style={{
          background: '#fff', border: '1px solid #edebe9',
          borderRadius: 2, padding: '20px 24px',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 10, marginBottom: 14,
            paddingBottom: 14, borderBottom: '1px solid #f3f2f1',
          }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#323130', marginBottom: 4 }}>
                {exp.role}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: exp.color, fontWeight: 500 }}>{exp.company}</span>
                <span style={{ fontSize: 12, color: '#d2d0ce' }}>·</span>
                <span style={{ fontSize: 12, color: '#605e5c' }}>{exp.location}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
              <span style={{
                fontSize: 12, background: '#f3f2f1', color: '#605e5c',
                padding: '3px 10px', borderRadius: 2, border: '1px solid #edebe9',
              }}>{exp.period}</span>
              <span style={{
                fontSize: 11, background: '#e6f3fb', color: '#0078d4',
                padding: '2px 8px', borderRadius: 2, border: '1px solid #c7e0f4',
              }}>Full-time</span>
            </div>
          </div>

          {/* KPI chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {exp.kpis.map(k => (
              <span key={k} style={{
                fontSize: 11, background: '#dff6dd', color: '#107c10',
                padding: '3px 10px', borderRadius: 10,
                border: '1px solid #bad7b8', fontWeight: 500,
              }}>✓ {k}</span>
            ))}
          </div>

          {/* Bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {exp.bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: exp.color, marginTop: 7, flexShrink: 0,
                }} />
                <span style={{ fontSize: 13, color: '#605e5c', lineHeight: 1.75 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
