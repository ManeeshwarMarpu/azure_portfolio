import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

export const THEMES = {
  'Light (Azure)': {
    bg: '#f3f2f1',
    surface: '#ffffff',
    border: '#edebe9',
    text: '#323130',
    textMuted: '#605e5c',
    textFaint: '#a19f9d',
    accent: '#0078d4',
    topbar: '#0078d4',
    sidebarBg: '#ffffff',
    cardBg: '#ffffff',
    inputBg: '#ffffff',
    hoverBg: '#f0f6ff',
    subtleBg: '#f3f2f1',
  },
  'Dark': {
    bg: '#0f1624',
    surface: '#162032',
    border: '#1e3050',
    text: '#e8eef8',
    textMuted: '#8fa3c0',
    textFaint: '#4d6480',
    accent: '#3b9eff',
    topbar: '#0d1829',
    sidebarBg: '#111e30',
    cardBg: '#162032',
    inputBg: '#1a2740',
    hoverBg: '#1e3050',
    subtleBg: '#111e30',
    cardBorder: '#1e3050',
    accentGlow: 'rgba(59,158,255,0.15)',
  },
  'System': {
    bg: '#f3f2f1',
    surface: '#ffffff',
    border: '#edebe9',
    text: '#323130',
    textMuted: '#605e5c',
    textFaint: '#a19f9d',
    accent: '#0078d4',
    topbar: '#0078d4',
    sidebarBg: '#ffffff',
    cardBg: '#ffffff',
    inputBg: '#ffffff',
    hoverBg: '#f0f6ff',
    subtleBg: '#f3f2f1',
  },
};

export function SettingsProvider({ children, collapsed, setCollapsed }) {
  const [theme, setTheme]             = useState('Light (Azure)');
  const [compactCards, setCompactCards] = useState(false);
  const [showPremiumBadges, setShowPremiumBadges] = useState(true);
  const [animateScroll, setAnimateScroll] = useState(true);
  const [defaultFilter, setDefaultFilter] = useState('All');
  const [aiModel, setAiModel]         = useState('claude-opus-4-5');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const t = THEMES[theme] || THEMES['Light (Azure)'];

  const value = {
    // Theme
    theme, setTheme, t,
    // Layout
    collapsed, setCollapsed,
    compactCards, setCompactCards,
    // Portfolio
    showPremiumBadges, setShowPremiumBadges,
    animateScroll, setAnimateScroll,
    defaultFilter, setDefaultFilter,
    // Chatbot
    aiModel, setAiModel,
    showSuggestions, setShowSuggestions,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
