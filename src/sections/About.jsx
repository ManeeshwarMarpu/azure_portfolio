import React, { useState } from 'react';
import { useSettings } from '../SettingsContext';

const InfoRow = ({ icon, label, value, highlight, t }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: 12,
    padding: '11px 0', borderBottom: `1px solid ${t.border}`,
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: 8,
      background: `${t.accent}15`, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontSize: 16, flexShrink: 0,
    }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: highlight ? t.accent : t.text, fontWeight: highlight ? 600 : 400 }}>{value}</div>
    </div>
  </div>
);

const BadgeChip = ({ label, color, bg, border }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    background: bg, color: color, border: `1px solid ${border}`,
    borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 600,
  }}>{label}</span>
);

export default function About() {
  const { t } = useSettings();
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: '👤 Personal', icon: '👤' },
    { id: 'education', label: '🎓 Education', icon: '🎓' },
    { id: 'visa', label: '🌐 Visa & Work Auth', icon: '🌐' },
    { id: 'interests', label: '💡 Interests', icon: '💡' },
  ];

  return (
    <section id="about" style={{ marginBottom: 36 }}>
      {/* Section Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>Home</span>
          <span style={{ color: t.border }}>›</span>
          <span>About Me</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 4 }}>About Maneeshwar</h1>
        <p style={{ fontSize: 13, color: t.textMuted }}>Personal background · Education · Work Authorization</p>
      </div>

      {/* Hero Card */}
      <div style={{
        background: `linear-gradient(135deg, #0078d4 0%, #005a9e 60%, #004578 100%)`,
        borderRadius: 12, padding: '28px 28px', marginBottom: 20,
        display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.05)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, right:80, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />

        {/* Avatar */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 700, color: '#fff', flexShrink: 0, letterSpacing: 1,
        }}>MM</div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Maneeshwar M</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 12 }}>
            Sr. DevOps / CI/CD Engineer · Houston, TX
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <BadgeChip label="● Available for Opportunities" color="#dff6dd" bg="rgba(16,124,16,0.25)" border="rgba(186,215,184,0.4)" />
            <BadgeChip label="🎓 M.S. Data Science @ UH" color="#fff" bg="rgba(255,255,255,0.15)" border="rgba(255,255,255,0.25)" />
            <BadgeChip label="📍 Houston, TX" color="#fff" bg="rgba(255,255,255,0.1)" border="rgba(255,255,255,0.2)" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
          {[
            { emoji: '📧', val: 'maneesh.05mm@gmail.com' },
            { emoji: '📱', val: '979-398-2463' },
            { emoji: '💼', val: 'linkedin.com/in/maneeshwar11' },
          ].map(({ emoji, val }) => (
            <div key={val} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13 }}>{emoji}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', wordBreak: 'break-all' }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: `2px solid ${t.border}`, paddingBottom: 0 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '9px 18px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
              color: activeTab === tab.id ? t.accent : t.textMuted,
              borderBottom: activeTab === tab.id ? `2px solid ${t.accent}` : '2px solid transparent',
              marginBottom: -2, transition: 'all 0.15s',
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>

        {/* PERSONAL TAB */}
        {activeTab === 'personal' && (
          <>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>👤</span> Personal Details
              </div>
              <InfoRow icon="🏠" label="Full Name" value="Maneeshwar M" t={t} />
              <InfoRow icon="📍" label="Current Location" value="Houston, TX, USA" t={t} />
              <InfoRow icon="📧" label="Email" value="maneesh.05mm@gmail.com" highlight t={t} />
              <InfoRow icon="📱" label="Phone" value="979-398-2463" t={t} />
              <InfoRow icon="🌐" label="LinkedIn" value="linkedin.com/in/maneeshwar11" highlight t={t} />
              <InfoRow icon="🗣️" label="Languages" value="English (Professional), Telugu (Native), Hindi (Conversational)" t={t} />
            </div>

            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>📊</span> Career Summary
              </div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.8, marginBottom: 14 }}>
                Results-driven DevOps and CI/CD Engineer with <strong style={{ color: t.text }}>4+ years</strong> of experience designing, building, and maintaining CI/CD pipelines and cloud infrastructure across <strong style={{ color: t.text }}>AWS, Azure, and GCP</strong>. Currently completing an <strong style={{ color: t.text }}>M.S. in Engineering Data Science</strong> at the University of Houston (GPA 3.9/4.0).
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['DevOps', 'CI/CD', 'Kubernetes', 'Terraform', 'Cloud Architecture', 'FinOps', 'DevSecOps'].map(tag => (
                  <span key={tag} style={{
                    fontSize: 11, background: `${t.accent}15`, color: t.accent,
                    border: `1px solid ${t.accent}30`, borderRadius: 20, padding: '3px 10px', fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <>
            {/* UH */}
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 10,
                  background: 'linear-gradient(135deg, #c8102e, #8a0000)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0, color: '#fff', fontWeight: 700,
                }}>UH</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>University of Houston</div>
                  <div style={{ fontSize: 12, color: t.accent, fontWeight: 500, marginTop: 2 }}>Houston, TX, USA</div>
                  <div style={{ fontSize: 11, color: t.textFaint, marginTop: 1 }}>Aug 2024 – May 2026</div>
                </div>
              </div>
              <InfoRow icon="🎓" label="Degree" value="Master of Science (M.S.)" t={t} />
              <InfoRow icon="📚" label="Field of Study" value="Engineering Data Science" t={t} />
              <InfoRow icon="⭐" label="GPA" value="3.9 / 4.0" highlight t={t} />
              <InfoRow icon="📅" label="Expected Graduation" value="May 2026" t={t} />
              <InfoRow icon="🌍" label="Campus" value="Main Campus · Houston, TX" t={t} />
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Relevant Coursework</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Machine Learning', 'Big Data Analytics', 'Cloud Computing', 'Data Pipelines', 'Statistical Modeling', 'Deep Learning'].map(c => (
                    <span key={c} style={{ fontSize: 11, background: '#c8102e15', color: '#c8102e', border: '1px solid #c8102e30', borderRadius: 20, padding: '3px 10px' }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Undergrad */}
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 10,
                  background: 'linear-gradient(135deg, #ff6b00, #c84b00)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0, color: '#fff', fontWeight: 700,
                }}>BE</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Bachelor of Engineering</div>
                  <div style={{ fontSize: 12, color: '#ff6b00', fontWeight: 500, marginTop: 2 }}>India</div>
                  <div style={{ fontSize: 11, color: t.textFaint, marginTop: 1 }}>Graduated 2020</div>
                </div>
              </div>
              <InfoRow icon="🎓" label="Degree" value="Bachelor of Engineering (B.E.)" t={t} />
              <InfoRow icon="📚" label="Field of Study" value="Computer Science & Engineering" t={t} />
              <InfoRow icon="📅" label="Graduation Year" value="2020" t={t} />
              <div style={{ marginTop: 12, padding: '12px 14px', background: `${t.accent}08`, border: `1px solid ${t.accent}20`, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.7 }}>
                  After completing undergrad, Maneeshwar joined industry immediately — accumulating <strong style={{ color: t.text }}>3+ years of hands-on DevOps experience</strong> before returning to academia for his Master's degree.
                </div>
              </div>
            </div>
          </>
        )}

        {/* VISA TAB */}
        {activeTab === 'visa' && (
          <>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🌐</span> Work Authorization Status
              </div>

              {/* Status Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #dff6dd, #c8f0c8)',
                border: '1px solid #bad7b8', borderRadius: 8, padding: '14px 16px', marginBottom: 16,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ fontSize: 24 }}>✅</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#107c10' }}>Authorized to Work in the United States</div>
                  <div style={{ fontSize: 11, color: '#107c10', opacity: 0.8 }}>No sponsorship required for OPT period</div>
                </div>
              </div>

              <InfoRow icon="🪪" label="Current Visa Type" value="F-1 Student Visa" highlight t={t} />
              <InfoRow icon="📋" label="Work Authorization" value="OPT (Optional Practical Training)" highlight t={t} />
              <InfoRow icon="📅" label="OPT Eligibility" value="Eligible upon graduation (May 2026)" t={t} />
              <InfoRow icon="⚡" label="STEM OPT Extension" value="Eligible for 24-month STEM OPT extension" highlight t={t} />
              <InfoRow icon="🏢" label="Total US Work Duration" value="Up to 3 years (OPT + STEM Extension)" t={t} />
              <InfoRow icon="💼" label="Sponsorship Needed" value="H-1B sponsorship welcome after OPT" t={t} />
            </div>

            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>📋</span> Hiring Quick Reference
              </div>
              {[
                { q: 'Can start immediately?', a: 'Yes — available for hire', ok: true },
                { q: 'Requires sponsorship now?', a: 'No — OPT eligible on graduation', ok: true },
                { q: 'STEM OPT eligible?', a: 'Yes — 24 months additional work auth', ok: true },
                { q: 'Open to H-1B sponsorship?', a: 'Yes — happy to discuss', ok: true },
                { q: 'Remote / On-site / Hybrid?', a: 'All options considered', ok: true },
                { q: 'Preferred location?', a: 'Houston TX · San Antonio TX · Remote', ok: true },
              ].map(({ q, a, ok }) => (
                <div key={q} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  gap: 12, padding: '10px 0', borderBottom: `1px solid ${t.border}`,
                }}>
                  <span style={{ fontSize: 12, color: t.textMuted, flex: 1 }}>{q}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: ok ? '#107c10' : '#d13438', fontWeight: 600 }}>{a}</span>
                    <span style={{ fontSize: 14 }}>{ok ? '✅' : '❌'}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: '10px 12px', background: '#fff4e6', border: '1px solid #fde7c4', borderRadius: 8, fontSize: 11, color: '#8a5700' }}>
                💡 For any questions about work authorization, please reach out directly at <strong>maneesh.05mm@gmail.com</strong>
              </div>
            </div>
          </>
        )}

        {/* INTERESTS TAB */}
        {activeTab === 'interests' && (
          <>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>💡</span> Professional Interests
              </div>
              {[
                { icon: '☁️', title: 'Cloud-Native Architecture', desc: 'Building resilient, scalable, and cost-efficient cloud-native systems across multi-cloud environments.' },
                { icon: '🤖', title: 'AI/ML + DevOps (MLOps)', desc: 'Bridging data science and DevOps — deploying ML models at scale with robust CI/CD pipelines.' },
                { icon: '🔐', title: 'DevSecOps & Compliance', desc: 'Integrating security seamlessly into development lifecycles — shift-left security practices.' },
                { icon: '📊', title: 'Observability & SRE', desc: 'Deep interest in distributed tracing, SLOs, and building reliable production systems at scale.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${t.border}` }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8, background: `${t.accent}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🎯</span> Goals & Aspirations
              </div>
              {[
                { icon: '🚀', title: 'Short-term (2026)', desc: 'Secure a full-time DevOps/Platform Engineering role in the US, leveraging OPT work authorization.' },
                { icon: '🌐', title: 'Mid-term (2027-2028)', desc: 'Lead cloud architecture initiatives at scale — targeting Staff Engineer or Tech Lead roles.' },
                { icon: '🧠', title: 'Long-term', desc: 'Combine engineering depth with data science expertise to drive intelligent infrastructure automation.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${t.border}` }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8, background: `${t.accent}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: '12px 14px', background: `${t.accent}08`, border: `1px solid ${t.accent}20`, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.7 }}>
                  🎓 <strong style={{ color: t.text }}>Academic + Industry balance:</strong> Maintaining a 3.9 GPA while actively working on real-world cloud infrastructure projects demonstrates Maneeshwar's ability to perform under high expectations.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
