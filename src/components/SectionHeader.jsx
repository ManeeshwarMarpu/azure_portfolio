import React from 'react';

export default function SectionHeader({ title, subtitle, crumb }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {crumb && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#0078d4', cursor: 'pointer' }}>Home</span>
          <span style={{ fontSize: 12, color: '#a19f9d' }}>›</span>
          <span style={{ fontSize: 12, color: '#605e5c' }}>{crumb}</span>
        </div>
      )}
      <h2 style={{
        fontSize: 22, fontWeight: 600, color: '#323130', marginBottom: 4,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}>{title}</h2>
      {subtitle && (
        <p style={{ fontSize: 13, color: '#605e5c', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
          {subtitle}
        </p>
      )}
      <div style={{ height: 1, background: '#edebe9', marginTop: 14 }} />
    </div>
  );
}
