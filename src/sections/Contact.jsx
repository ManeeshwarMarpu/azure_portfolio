import React from 'react';
import SectionHeader from '../components/SectionHeader';

const CONTACTS = [
  { label: 'Email',    value: 'maneesh.05mm@gmail.com',      icon: '📧', href: 'mailto:maneesh.05mm@gmail.com',           color: '#0078d4' },
  { label: 'Phone',    value: '979-398-2463',                 icon: '📱', href: 'tel:9793982463',                          color: '#107c10' },
  { label: 'LinkedIn', value: 'linkedin.com/in/maneeshwar11', icon: '🔗', href: 'https://linkedin.com/in/maneeshwar11',    color: '#0a66c2' },
  { label: 'Location', value: 'Houston, TX · Open to Remote', icon: '📍', href: '#',                                       color: '#605e5c' },
];

export default function Contact() {
  return (
    <section id="contact" style={{ marginBottom: 36 }}>
      <SectionHeader
        title="Contact"
        subtitle="Reach out for DevOps, Cloud, and Platform Engineering opportunities"
        crumb="Contact"
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 10,
      }}>
        {CONTACTS.map(c => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            style={{
              background: '#fff', border: '1px solid #edebe9',
              borderRadius: 2, padding: '14px 16px',
              textDecoration: 'none',
              display: 'flex', gap: 12, alignItems: 'center',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = c.color;
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.07)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#edebe9';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 4,
              background: '#f3f2f1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>{c.icon}</div>
            <div>
              <div style={{
                fontSize: 10, color: '#a19f9d',
                textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2,
              }}>{c.label}</div>
              <div style={{ fontSize: 12, color: c.color, fontWeight: 500 }}>{c.value}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
