import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { PROJECTS } from '../data';

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const sc = project.status === 'Production' ? '#107c10' : '#0078d4';
  const sb = project.status === 'Production' ? '#dff6dd' : '#e6f3fb';

  return (
    <div
      style={{
        background: '#fff', border: '1px solid #edebe9',
        borderRadius: 2, cursor: 'pointer', overflow: 'hidden',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.09)';
        e.currentTarget.style.borderColor = '#c7e0f4';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#edebe9';
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid #f3f2f1',
        display: 'flex', alignItems: 'flex-start', gap: 12,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 5,
          background: '#f0f6ff', border: '1px solid #c7e0f4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 17, flexShrink: 0,
        }}>{project.icon}</div>

        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', flexWrap: 'wrap', gap: 4,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#323130' }}>{project.title}</span>
            <div style={{ display: 'flex', gap: 5 }}>
              <span style={{
                fontSize: 10, background: sb, color: sc,
                padding: '2px 8px', borderRadius: 10,
                border: `1px solid ${sc}30`, fontWeight: 500,
              }}>● {project.status}</span>
              {project.tier === 'Premium' && (
                <span style={{
                  fontSize: 10, background: '#f7f3ff', color: '#7b42bc',
                  padding: '2px 8px', borderRadius: 10,
                  border: '1px solid #c9b3e8', fontWeight: 500,
                }}>★ Premium</span>
              )}
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#0078d4', marginTop: 2 }}>
            {project.category} · {project.region}
          </div>
        </div>
      </div>

      {/* Metrics row */}
      <div style={{ display: 'flex', borderBottom: '1px solid #f3f2f1' }}>
        {project.metrics.map((m, i) => (
          <div key={i} style={{
            flex: 1, padding: '9px 12px',
            borderRight: i < project.metrics.length - 1 ? '1px solid #f3f2f1' : 'none',
          }}>
            <div style={{
              fontSize: 10, color: '#a19f9d', marginBottom: 2,
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>{m.label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Stack tags */}
      <div style={{
        padding: '9px 14px',
        display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center',
      }}>
        {project.stack.map(s => (
          <span key={s} style={{
            fontSize: 11, color: '#444',
            background: '#f3f2f1', border: '1px solid #edebe9',
            borderRadius: 2, padding: '2px 7px',
          }}>{s}</span>
        ))}
        <span style={{ fontSize: 11, color: '#0078d4', marginLeft: 'auto' }}>
          {expanded ? '▲ less' : '▼ details'}
        </span>
      </div>

      {/* Expanded description */}
      {expanded && (
        <div style={{ padding: '0 16px 14px', borderTop: '1px solid #f3f2f1' }}>
          <p style={{ fontSize: 13, color: '#605e5c', lineHeight: 1.75, marginTop: 12 }}>
            {project.desc}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'CI/CD', 'Infrastructure', 'Observability', 'Security', 'Platform', 'FinOps'];
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ marginBottom: 36 }}>
      <SectionHeader
        title="Projects"
        subtitle="Production-grade cloud engineering deployments across multi-cloud environments"
        crumb="Projects"
      />

      {/* Tab filter */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 18, borderBottom: '1px solid #edebe9' }}>
        {cats.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: 'transparent', border: 'none',
              borderBottom: filter === cat ? '2px solid #0078d4' : '2px solid transparent',
              padding: '8px 14px', fontSize: 13, cursor: 'pointer',
              color: filter === cat ? '#0078d4' : '#605e5c',
              fontWeight: filter === cat ? 600 : 400,
              transition: 'all 0.12s', marginBottom: -1,
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            {cat}{filter === cat ? ` (${filtered.length})` : ''}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: 10,
      }}>
        {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}
