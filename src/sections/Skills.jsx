import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { SKILLS_DATA } from '../data';

export default function Skills() {
  return (
    <section id="skills" style={{ marginBottom: 36 }}>
      <SectionHeader
        title="Skills & Technologies"
        subtitle="Technical stack and tooling proficiency"
        crumb="Skills"
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 10,
      }}>
        {Object.entries(SKILLS_DATA).map(([cat, data]) => (
          <div key={cat} style={{
            background: '#fff',
            border: '1px solid #edebe9',
            borderRadius: 2,
            padding: '15px 16px',
            borderLeft: `4px solid ${data.color}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 17 }}>{data.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#323130' }}>{cat}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {data.items.map(skill => (
                <span key={skill} style={{
                  fontSize: 12, color: '#323130',
                  background: '#f3f2f1', border: '1px solid #edebe9',
                  borderRadius: 2, padding: '3px 9px',
                }}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
