import React from 'react';
import SectionHeader from '../components/SectionHeader';
import KpiCard from '../components/KpiCard';
import { CERTS } from '../data';

export default function Overview() {
  return (
    <section id="overview" style={{ marginBottom: 36 }}>
      <SectionHeader
        title="Maneeshwar M — Engineer Profile"
        subtitle="DevOps · CI/CD · Cloud Infrastructure · Platform Engineering"
        crumb="Engineer Profile"
      />

      {/* Hero card */}
      <div style={{
        background: '#fff', border: '1px solid #edebe9', borderRadius: 2,
        padding: '20px 24px', marginBottom: 16,
        display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap',
      }}>
        <div style={{
          width: 68, height: 68, borderRadius: '50%', background: '#0078d4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>MM</div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20, fontWeight: 600, color: '#323130' }}>Maneeshwar M</span>
            <span style={{
              fontSize: 11, background: '#dff6dd', color: '#107c10',
              padding: '2px 10px', borderRadius: 10,
              border: '1px solid #bad7b8', fontWeight: 600,
            }}>● Available for Opportunities</span>
          </div>
          <div style={{ fontSize: 14, color: '#0078d4', marginBottom: 8, fontWeight: 500 }}>
            Senior DevOps / CI/CD Engineer
          </div>
          <div style={{ fontSize: 13, color: '#605e5c', lineHeight: 1.8, maxWidth: 680 }}>
            Results-driven DevOps and CI/CD Engineer with 4+ years designing, building, and maintaining
            CI/CD pipelines and cloud infrastructure across AWS, Azure, and GCP. Currently pursuing
            M.S. Engineering Data Science at University of Houston (GPA 3.9/4.0).
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            ['📧', 'maneesh.05mm@gmail.com'],
            ['📱', '979-398-2463'],
            ['📍', 'Houston, TX'],
            ['🎓', 'UH · MS Data Science · GPA 3.9/4.0'],
          ].map(([ic, v]) => (
            <div key={v} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, width: 18, textAlign: 'center' }}>{ic}</span>
              <span style={{ fontSize: 12, color: '#444' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
        <KpiCard label="Years Experience"     value="4+"      sub="DevOps & Cloud"       icon="⚡" color="#0078d4" />
        <KpiCard label="Cloud Providers"      value="3"       sub="AWS · Azure · GCP"    icon="☁️" color="#ff9900" />
        <KpiCard label="Client Environments"  value="150+"    sub="Enterprise grade"     icon="🏢" color="#0078d4" />
        <KpiCard label="Uptime SLA"           value="99.97%"  sub="Production envs"      icon="✅" color="#107c10" />
        <KpiCard label="Cost Recovered"       value="$200K"   sub="FinOps Q1 savings"    icon="💰" color="#107c10" />
        <KpiCard label="Projects Delivered"   value="12+"     sub="Industry-level"       icon="🚀" color="#7b42bc" />
      </div>

      {/* Certs bar */}
      <div style={{
        background: '#fff', border: '1px solid #edebe9', borderRadius: 2,
        padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 12, color: '#605e5c', fontWeight: 500 }}>Active Certifications:</span>
        {CERTS.map(c => (
          <div key={c.code} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: c.bg, border: `1px solid ${c.color}44`,
            borderRadius: 3, padding: '5px 12px',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{c.code}</span>
            <span style={{ fontSize: 11, color: '#444' }}>{c.vendor.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
