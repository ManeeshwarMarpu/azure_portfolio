import React from 'react';

export default function KpiCard({ label, value, sub, icon, color }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #edebe9',
      borderRadius: 2,
      padding: '16px 18px',
      flex: 1,
      minWidth: 130,
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            fontSize: 10, color: '#a19f9d', marginBottom: 6,
            textTransform: 'uppercase', letterSpacing: '0.07em',
          }}>{label}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#323130', lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 11, color: color, marginTop: 5 }}>{sub}</div>}
        </div>
        {icon && <span style={{ fontSize: 20, opacity: 0.55 }}>{icon}</span>}
      </div>
    </div>
  );
}
