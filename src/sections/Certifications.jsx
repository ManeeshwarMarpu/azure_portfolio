import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { CERTS } from '../data';

export default function Certifications() {
  return (
    <section id="certifications" style={{ marginBottom: 36 }}>
      <SectionHeader
        title="Certifications"
        subtitle="Industry-recognized cloud and DevOps certifications"
        crumb="Certifications"
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: 10,
      }}>
        {CERTS.map(cert => (
          <div key={cert.code} style={{
            background: '#fff',
            border: '1px solid #edebe9',
            borderRadius: 2,
            padding: '18px 20px',
            borderTop: `3px solid ${cert.color}`,
            display: 'flex', gap: 14, alignItems: 'flex-start',
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: 6,
              background: cert.bg, border: `2px solid ${cert.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: cert.color, flexShrink: 0,
            }}>{cert.code}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#323130', marginBottom: 4 }}>
                {cert.name}
              </div>
              <div style={{ fontSize: 12, color: cert.color, fontWeight: 500, marginBottom: 8 }}>
                {cert.vendor}
              </div>
              <span style={{
                fontSize: 11, background: '#dff6dd', color: '#107c10',
                padding: '2px 8px', borderRadius: 2, border: '1px solid #bad7b8',
              }}>✓ Active</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
