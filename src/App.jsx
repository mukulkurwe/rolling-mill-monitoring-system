import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f0f4f8;
    --surface: #ffffff;
    --surface2: #f8fafc;
    --border: #e2e8f0;
    --border2: #cbd5e1;
    --blue: #3b82f6;
    --blue-light: #eff6ff;
    --blue-mid: #dbeafe;
    --violet: #8b5cf6;
    --violet-light: #f5f3ff;
    --emerald: #10b981;
    --emerald-light: #ecfdf5;
    --amber: #f59e0b;
    --amber-light: #fffbeb;
    --rose: #f43f5e;
    --rose-light: #fff1f2;
    --cyan: #06b6d4;
    --cyan-light: #ecfeff;
    --orange: #f97316;
    --orange-light: #fff7ed;
    --text: #0f172a;
    --text2: #475569;
    --text3: #94a3b8;
    --text4: #cbd5e1;
    --font: 'Plus Jakarta Sans', sans-serif;
    --mono: 'JetBrains Mono', monospace;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04);
    --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04);
    --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.09);
    --sidebar-w: 240px;
    --topbar-h: 56px;
    --bottom-nav-h: 64px;
  }

  html { font-size: 16px; }
  body { background: var(--bg); color: var(--text); font-family: var(--font); min-height: 100vh; -webkit-tap-highlight-color: transparent; }

  /* ── APP SHELL ── */
  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ══════════════════════════════════════════
     SIDEBAR — desktop only
  ══════════════════════════════════════════ */
  .sidebar {
    width: var(--sidebar-w); min-width: var(--sidebar-w);
    background: var(--surface); border-right: 1px solid var(--border);
    display: flex; flex-direction: column; box-shadow: var(--shadow);
    transition: transform 0.28s cubic-bezier(.4,0,.2,1);
    z-index: 200;
  }
  .logo { padding: 20px 18px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }
  .logo-mark { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, var(--blue), var(--violet)); display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 12px rgba(59,130,246,.35); flex-shrink: 0; }
  .logo-name { font-size: 15px; font-weight: 800; color: var(--text); letter-spacing: -.3px; }
  .logo-sub { font-size: 10px; color: var(--text3); font-family: var(--mono); margin-top: 1px; }

  .nav { flex: 1; padding: 12px 10px; overflow-y: auto; }
  .nav-section { padding: 10px 10px 4px; font-size: 9px; letter-spacing: 2px; color: var(--text4); font-family: var(--mono); font-weight: 600; text-transform: uppercase; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; cursor: pointer; border-radius: 8px; font-size: 13px; font-weight: 500; color: var(--text2); transition: all .15s; margin-bottom: 1px; }
  .nav-item:hover { color: var(--text); background: var(--bg); }
  .nav-item.active { color: var(--blue); background: var(--blue-light); font-weight: 600; }
  .nav-icon { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
  .nav-item.active .nav-icon { background: var(--blue-mid); }
  .nav-badge { margin-left: auto; background: var(--rose); color: white; font-size: 9px; font-family: var(--mono); padding: 2px 6px; border-radius: 10px; font-weight: 600; }

  .sidebar-footer { padding: 14px 16px; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .avatar { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg,#667eea,#764ba2); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }
  .user-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .user-role { font-size: 10px; color: var(--text3); font-family: var(--mono); }

  /* ══════════════════════════════════════════
     MOBILE DRAWER OVERLAY
  ══════════════════════════════════════════ */
  .drawer-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 199; backdrop-filter: blur(2px); }
  .drawer-overlay.open { display: block; }

  /* ══════════════════════════════════════════
     MAIN AREA
  ══════════════════════════════════════════ */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: var(--bg); min-width: 0; }

  .topbar {
    height: var(--topbar-h); background: var(--surface); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 20px; gap: 10px;
    box-shadow: var(--shadow-sm); flex-shrink: 0;
  }
  .hamburger { display: none; width: 36px; height: 36px; border: none; background: var(--bg); border-radius: 8px; cursor: pointer; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .page-title { font-size: 16px; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .page-sub-top { font-size: 11px; color: var(--text3); font-family: var(--mono); white-space: nowrap; }
  .topbar-right { margin-left: auto; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .chip { padding: 5px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; font-family: var(--mono); display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
  .chip-blue { background: var(--blue-light); color: var(--blue); }
  .chip-green { background: var(--emerald-light); color: var(--emerald); }

  .btn { padding: 8px 14px; border-radius: 8px; font-family: var(--font); font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all .15s; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
  .btn-primary { background: var(--blue); color: white; box-shadow: 0 2px 8px rgba(59,130,246,.3); }
  .btn-primary:hover { background: #2563eb; }
  .btn-ghost { background: white; color: var(--text2); border: 1px solid var(--border); }
  .btn-ghost:hover { border-color: var(--border2); color: var(--text); }
  .btn-success { background: var(--emerald); color: white; box-shadow: 0 2px 8px rgba(16,185,129,.3); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }

  .content { flex: 1; overflow-y: auto; padding: 18px 20px; }

  /* ══════════════════════════════════════════
     BOTTOM NAV — mobile only
  ══════════════════════════════════════════ */
  .bottom-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; height: var(--bottom-nav-h); background: white; border-top: 1px solid var(--border); z-index: 150; box-shadow: 0 -4px 16px rgba(0,0,0,.06); }
  .bottom-nav-inner { display: flex; height: 100%; }
  .bottom-nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; cursor: pointer; border: none; background: none; padding: 0; transition: all .15s; }
  .bottom-nav-item.active { color: var(--blue); }
  .bottom-nav-item:not(.active) { color: var(--text3); }
  .bottom-nav-icon { font-size: 20px; line-height: 1; }
  .bottom-nav-label { font-size: 9px; font-weight: 600; letter-spacing: .3px; font-family: var(--font); }

  /* ══════════════════════════════════════════
     PANELS / CARDS
  ══════════════════════════════════════════ */
  .panel { background: var(--surface); border-radius: 14px; box-shadow: var(--shadow); overflow: hidden; }
  .panel-header { padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; flex-wrap: wrap; gap: 8px; }
  .panel-title { font-size: 14px; font-weight: 700; color: var(--text); }
  .panel-sub { font-size: 11px; color: var(--text3); font-family: var(--mono); }
  .panel-body { padding: 14px 16px; }

  .grid { display: grid; gap: 14px; }
  .grid-4 { grid-template-columns: repeat(4,1fr); }
  .grid-3 { grid-template-columns: repeat(3,1fr); }
  .grid-2 { grid-template-columns: repeat(2,1fr); }

  .stat-card { background: var(--surface); border-radius: 14px; padding: 18px; box-shadow: var(--shadow); position: relative; overflow: hidden; }
  .stat-card-accent { position: absolute; top: 0; right: 0; width: 70px; height: 70px; border-radius: 0 14px 0 70px; opacity: .1; }
  .stat-label { font-size: 10px; font-weight: 600; color: var(--text3); letter-spacing: .5px; margin-bottom: 8px; }
  .stat-value { font-size: 30px; font-weight: 800; line-height: 1; letter-spacing: -1px; }
  .stat-sub { font-size: 11px; color: var(--text3); margin-top: 6px; }

  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 20px; font-size: 10px; font-weight: 600; font-family: var(--mono); }
  .badge-ok { background: var(--emerald-light); color: var(--emerald); }
  .badge-warn { background: var(--amber-light); color: var(--amber); }
  .badge-danger { background: var(--rose-light); color: var(--rose); }
  .badge-info { background: var(--blue-light); color: var(--blue); }
  .badge-violet { background: var(--violet-light); color: var(--violet); }

  /* ══════════════════════════════════════════
     FORMS
  ══════════════════════════════════════════ */
  .form-row { display: flex; gap: 10px; margin-bottom: 14px; align-items: flex-end; flex-wrap: wrap; }
  .form-group { display: flex; flex-direction: column; gap: 4px; }
  .form-label { font-size: 11px; font-weight: 600; color: var(--text2); }
  .form-input, .form-select { background: white; border: 1.5px solid var(--border); color: var(--text); padding: 8px 10px; font-family: var(--font); font-size: 13px; border-radius: 8px; outline: none; transition: all .15s; min-width: 100px; }
  .form-input:focus, .form-select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(59,130,246,.1); }

  /* ══════════════════════════════════════════
     DATA TABLE — scrollable on mobile
  ══════════════════════════════════════════ */
  .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .data-table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 600px; }
  .data-table th { padding: 9px 12px; text-align: left; font-size: 9px; letter-spacing: 1px; color: var(--text3); border-bottom: 1px solid var(--border); font-weight: 600; text-transform: uppercase; background: var(--surface2); white-space: nowrap; }
  .data-table td { padding: 10px 12px; border-bottom: 1px solid var(--border); color: var(--text); }
  .data-table tbody tr:last-child td { border-bottom: none; }
  .data-table tbody tr:hover td { background: var(--bg); }

  /* Entry table */
  .entry-table { width: 100%; border-collapse: collapse; min-width: 500px; }
  .entry-table th { padding: 8px 8px; background: var(--surface2); border: 1px solid var(--border); font-size: 9px; font-weight: 700; color: var(--text3); text-align: center; letter-spacing: 1px; text-transform: uppercase; }
  .entry-table td { padding: 4px 4px; border: 1px solid var(--border); text-align: center; vertical-align: middle; }
  .entry-table .row-label { text-align: left; padding: 7px 10px; background: var(--surface2); font-weight: 700; font-size: 11px; color: var(--text); white-space: nowrap; }
  .entry-table .group-header { background: linear-gradient(135deg,var(--blue-light),#e0f2fe); color: var(--blue); font-weight: 700; font-size: 10px; padding: 6px 0; border: 1px solid var(--blue-mid); }

  .temp-input { width: 50px; border: 1.5px solid var(--border); border-radius: 6px; padding: 5px 3px; text-align: center; font-family: var(--mono); font-size: 11px; background: white; color: var(--text); outline: none; transition: all .15s; }
  .temp-input:focus { border-color: var(--blue); box-shadow: 0 0 0 2px rgba(59,130,246,.1); }
  .temp-input.warn { border-color: var(--amber); background: var(--amber-light); color: #92400e; }
  .temp-input.danger { border-color: var(--rose); background: var(--rose-light); color: #9f1239; font-weight: 700; }

  /* ══════════════════════════════════════════
     PROGRESS
  ══════════════════════════════════════════ */
  .progress-bar { height: 6px; background: var(--bg); border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 3px; transition: width .4s; }
  .fill-green { background: linear-gradient(90deg,var(--emerald),#34d399); }
  .fill-amber { background: linear-gradient(90deg,var(--amber),#fbbf24); }
  .fill-rose  { background: linear-gradient(90deg,var(--rose),#fb7185); }

  /* ══════════════════════════════════════════
     SPARKLINE
  ══════════════════════════════════════════ */
  .sparkline { display: flex; align-items: flex-end; gap: 2px; height: 36px; }
  .spark-bar { flex: 1; border-radius: 2px 2px 0 0; min-height: 4px; }

  /* ══════════════════════════════════════════
     ALERTS
  ══════════════════════════════════════════ */
  .alert-row { display: flex; align-items: center; gap: 10px; padding: 11px 16px; border-bottom: 1px solid var(--border); cursor: pointer; transition: background .15s; }
  .alert-row:hover { background: var(--bg); }
  .alert-row:last-child { border-bottom: none; }
  .alert-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  .dot-critical { background: var(--rose); box-shadow: 0 0 0 3px rgba(244,63,94,.2); }
  .dot-warning  { background: var(--amber); box-shadow: 0 0 0 3px rgba(245,158,11,.2); }
  .dot-info     { background: var(--blue); }
  .pulse { animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

  /* ══════════════════════════════════════════
     OPERATOR CARDS
  ══════════════════════════════════════════ */
  .op-card { background: var(--surface); border-radius: 12px; padding: 14px; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 12px; border: 1px solid var(--border); }
  .op-avatar { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; color: white; flex-shrink: 0; }

  /* ══════════════════════════════════════════
     FORM CARDS (operator entry)
  ══════════════════════════════════════════ */
  .form-card { background: white; border-radius: 14px; overflow: hidden; box-shadow: var(--shadow); border: 1px solid var(--border); cursor: pointer; transition: all .2s; }
  .form-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
  .form-card:active { transform: scale(.98); }
  .form-card-top { height: 5px; }
  .form-card-body { padding: 18px 16px; }
  .form-card-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 12px; }
  .form-card-title { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
  .form-card-sub { font-size: 11px; color: var(--text3); margin-bottom: 12px; }
  .form-card-status { font-size: 11px; font-weight: 600; font-family: var(--mono); }

  /* ══════════════════════════════════════════
     LOGIN
  ══════════════════════════════════════════ */
  .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg,#f0f4ff,#fdf4ff 50%,#f0fdf4); position: relative; padding: 20px; }
  .login-blobs { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
  .blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: .22; }
  .blob1 { width: 350px; height: 350px; background: var(--blue); top: -100px; left: -80px; }
  .blob2 { width: 280px; height: 280px; background: var(--violet); bottom: -60px; right: 60px; }
  .blob3 { width: 220px; height: 220px; background: var(--emerald); bottom: 80px; left: 160px; }
  .login-card { background: white; border-radius: 20px; padding: 36px 32px; width: 100%; max-width: 420px; box-shadow: var(--shadow-xl); position: relative; }
  .login-brand { text-align: center; margin-bottom: 32px; }
  .login-logo { width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(135deg,var(--blue),var(--violet)); display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 12px; box-shadow: 0 8px 24px rgba(59,130,246,.3); }
  .login-title { font-size: 22px; font-weight: 800; color: var(--text); letter-spacing: -.5px; }
  .login-sub { font-size: 13px; color: var(--text3); margin-top: 4px; }
  .form-full { width: 100%; }
  .input-lg { padding: 11px 14px; font-size: 14px; border-radius: 10px; }
  .demo-box { margin-top: 20px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 12px; }

  /* ══════════════════════════════════════════
     MISC UTILS
  ══════════════════════════════════════════ */
  .section-gap { margin-top: 14px; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .flex-wrap { flex-wrap: wrap; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .ml-auto { margin-left: auto; }
  .live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--emerald); display: inline-block; box-shadow: 0 0 0 3px rgba(16,185,129,.2); }

  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  .fade-in { animation: fadeIn .25s ease both; }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

  /* ══════════════════════════════════════════
     ★ RESPONSIVE BREAKPOINTS ★
  ══════════════════════════════════════════ */

  /* Tablet (≤ 900px) */
  @media (max-width: 900px) {
    .grid-4 { grid-template-columns: repeat(2,1fr); }
    .grid-3 { grid-template-columns: repeat(2,1fr); }
    .dash-mid { grid-template-columns: 1fr !important; }
    .ops-grid { grid-template-columns: repeat(2,1fr) !important; }
    .chip-hide { display: none; }
  }

  /* Mobile (≤ 640px) */
  @media (max-width: 640px) {
    :root { --topbar-h: 52px; }

    /* Hide desktop sidebar, show hamburger + bottom nav */
    .sidebar {
      position: fixed; top: 0; left: 0; bottom: 0;
      transform: translateX(-100%);
    }
    .sidebar.open { transform: translateX(0); }
    .hamburger { display: flex; }
    .bottom-nav { display: flex; }

    /* Account for bottom nav */
    .content { padding-bottom: calc(var(--bottom-nav-h) + 12px); }
    .main { padding-bottom: 0; }

    /* Topbar adjustments */
    .topbar { padding: 0 12px; }
    .page-title { font-size: 14px; }
    .page-sub-top { display: none; }
    .topbar-signout { display: none; }

    /* Grids */
    .grid-4 { grid-template-columns: repeat(2,1fr); }
    .grid-3 { grid-template-columns: 1fr; }
    .grid-2 { grid-template-columns: 1fr; }
    .dash-mid { grid-template-columns: 1fr !important; }
    .ops-grid { grid-template-columns: 1fr 1fr !important; }

    /* Stat cards */
    .stat-value { font-size: 26px; }
    .stat-card { padding: 14px; }

    /* Content padding */
    .content { padding: 14px 12px; padding-bottom: calc(var(--bottom-nav-h) + 16px); }

    /* Form rows stack */
    .form-row { gap: 8px; }
    .form-group { min-width: calc(50% - 4px); }
    .form-group.full { min-width: 100%; }
    .form-input, .form-select { min-width: unset; width: 100%; }

    /* Panel */
    .panel-header { padding: 12px 14px; }
    .panel-body { padding: 12px 14px; }

    /* Operator home cards → 2 col */
    .op-home-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
    .form-card-body { padding: 14px 12px; }
    .form-card-icon { width: 34px; height: 34px; font-size: 16px; margin-bottom: 10px; }
    .form-card-title { font-size: 12px; }

    /* Status bar */
    .status-bar { flex-wrap: wrap; gap: 8px; }

    /* Alert rows */
    .alert-row { padding: 10px 14px; }

    /* Op cards */
    .op-card { padding: 12px; gap: 10px; }

    /* Login */
    .login-card { padding: 28px 22px; }
    .login-title { font-size: 20px; }

    /* Trend stats mini */
    .trend-stat-grid { grid-template-columns: 1fr 1fr 1fr; }
  }

  /* Very small (≤ 380px) */
  @media (max-width: 380px) {
    .grid-4 { grid-template-columns: 1fr 1fr; }
    .op-home-grid { grid-template-columns: 1fr !important; }
    .ops-grid { grid-template-columns: 1fr !important; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────
const drmData = [
  { drm:"DRM 01", con:{t:42,d:1.0}, st1:{t:57,d:1.9}, st2:{t:58,d:2.1}, st3:{t:61,d:1.5} },
  { drm:"DRM 02", con:{t:45,d:1.2}, st1:{t:59,d:2.0}, st2:{t:55,d:1.7}, st3:{t:63,d:2.3} },
  { drm:"DRM 03", con:{t:41,d:0.9}, st1:{t:72,d:3.1}, st2:{t:69,d:2.8}, st3:{t:67,d:2.5} },
  { drm:"DRM 04", con:{t:44,d:1.1}, st1:{t:54,d:1.4}, st2:{t:57,d:1.8}, st3:{t:56,d:1.6} },
  { drm:"DRM 05", con:{t:46,d:1.3}, st1:{t:60,d:2.2}, st2:{t:62,d:2.1}, st3:{t:58,d:1.9} },
  { drm:"DRM 06", con:{t:43,d:1.0}, st1:{t:55,d:1.6}, st2:{t:53,d:1.5}, st3:{t:59,d:2.0} },
  { drm:"DRM 07", con:{t:40,d:0.8}, st1:{t:51,d:1.3}, st2:{t:50,d:1.2}, st3:{t:52,d:1.4} },
];
const standData = [
  { s:1, U:63,V:62,W:64,DE:56,NDE:36,AI:40,AO:53 },
  { s:2, U:58,V:57,W:59,DE:52,NDE:34,AI:38,AO:50 },
  { s:3, U:71,V:70,W:72,DE:68,NDE:42,AI:45,AO:61 },
  { s:4, U:65,V:64,W:66,DE:58,NDE:38,AI:41,AO:55 },
  { s:5, U:55,V:54,W:56,DE:49,NDE:31,AI:35,AO:47 },
  { s:6, U:60,V:59,W:61,DE:54,NDE:35,AI:39,AO:52 },
  { s:7, U:69,V:68,W:70,DE:65,NDE:40,AI:43,AO:58 },
];
const alerts = [
  { type:"critical", point:"DRM 03 St.1", val:"72°C", time:"11:32", msg:"Temperature exceeds threshold" },
  { type:"critical", point:"Stand 7 V",   val:"68°C", time:"11:15", msg:"High bearing temperature" },
  { type:"warning",  point:"DRM 03 St.2", val:"69°C", time:"11:28", msg:"TempDiff > 2.5 threshold" },
  { type:"warning",  point:"Stand 3 DE",  val:"68°C", time:"11:20", msg:"Approaching upper limit" },
  { type:"info",     point:"L2 Shift B",  val:"",     time:"11:00", msg:"Tail Breaker readings not submitted" },
];
const operators = [
  { name:"Ramesh", init:"SK", color:"#3b82f6", shift:"B", line:"L1", count:47 },
  { name:"Mohit M",    init:"RM", color:"#8b5cf6", shift:"B", line:"L2", count:39 },
  { name:"Pradeep K",  init:"PK", color:"#10b981", shift:"A", line:"L1", count:52 },
  { name:"Arjun R",    init:"AR", color:"#f59e0b", shift:"B", line:"—",  count:0  },
];
const sparkData = [38,42,45,41,48,55,52,57,61,72,69,67];

// ── MINI COMPONENTS ───────────────────────────────────────────────────────────
function TCell({ t, d }) {
  const cls = t > 70 ? "danger" : t > 60 ? "warn" : "";
  return (
    <td style={{ padding:"3px 4px", border:"1px solid var(--border)" }}>
      <div style={{ display:"flex", gap:2, justifyContent:"center" }}>
        <input className={`temp-input ${cls}`} defaultValue={t} />
        <input className="temp-input" defaultValue={d} style={{ width:40, background:cls?"":"var(--surface2)", color:"var(--text3)" }} />
      </div>
    </td>
  );
}
function SCell({ v }) {
  const cls = v > 70 ? "danger" : v > 65 ? "warn" : "";
  return (
    <td style={{ padding:"3px 4px", border:"1px solid var(--border)" }}>
      <input className={`temp-input ${cls}`} defaultValue={v} />
    </td>
  );
}
function Spark({ data }) {
  const mx = Math.max(...data);
  return (
    <div className="sparkline">
      {data.map((v,i) => (
        <div key={i} className="spark-bar" style={{ height:`${(v/mx)*100}%`, background: v>70?"#fca5a5":v>60?"#fcd34d":"#93c5fd", opacity: i===data.length-1?1:0.7 }}/>
      ))}
    </div>
  );
}
function CoverageRow({ label, filled, total }) {
  const pct = Math.round((filled/total)*100);
  const fc = pct===100?"fill-green":pct<80?"fill-rose":"fill-amber";
  const vc = pct===100?"var(--emerald)":pct<80?"var(--rose)":"var(--amber)";
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:"flex", marginBottom:5 }}>
        <span style={{ fontSize:13, color:"var(--text)", fontWeight:500 }}>{label}</span>
        <span style={{ marginLeft:"auto", fontFamily:"var(--mono)", fontSize:11, fontWeight:600, color:vc }}>{filled}/{total} · {pct}%</span>
      </div>
      <div className="progress-bar"><div className={`progress-fill ${fc}`} style={{ width:`${pct}%` }}/></div>
    </div>
  );
}

// ── PAGES ─────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [phone,setPhone] = useState("");
  const [pass,setPass] = useState("");
  return (
    <div className="login-wrap">
      <div className="login-blobs"><div className="blob blob1"/><div className="blob blob2"/><div className="blob blob3"/></div>
      <div className="login-card fade-in">
        <div className="login-brand">
          <div className="login-logo">⚙️</div>
          <div className="login-title">SteelTrack</div>
          <div className="login-sub">Rolling Mill Monitoring System</div>
        </div>
        <div className="form-group" style={{ marginBottom:12 }}>
          <label className="form-label">Phone Number</label>
          <input className="form-input form-full input-lg" placeholder="9xxxxxxxxx" value={phone} onChange={e=>setPhone(e.target.value)} />
        </div>
        <div className="form-group" style={{ marginBottom:20 }}>
          <label className="form-label">Password</label>
          <input className="form-input form-full input-lg" type="password" placeholder="Enter password" value={pass} onChange={e=>setPass(e.target.value)} />
        </div>
        <button className="btn btn-primary form-full" style={{ justifyContent:"center", padding:"12px 0", fontSize:14, borderRadius:10 }} onClick={onLogin}>
          Sign In →
        </button>
        <div className="demo-box">
          <div style={{ fontSize:10, fontWeight:700, color:"var(--text3)", letterSpacing:1, marginBottom:8 }}>DEMO ACCOUNTS</div>
          {[["operator","1234"],["supervisor","5678"],["admin","admin"]].map(([u,p],i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:12, fontFamily:"var(--mono)", color:"var(--text2)", marginBottom:3 }}>
              <span>{u}</span><span style={{ color:"var(--text4)" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="fade-in">
      <div className="grid grid-4">
        {[
          { label:"Points Today", val:"92", unit:"/95", color:"#3b82f6", icon:"🎯", sub:"L1+L2 · Shift B" },
          { label:"Critical",     val:"2",  unit:"",    color:"#f43f5e", icon:"🔴", sub:"DRM03, Stand 7V" },
          { label:"Warnings",     val:"3",  unit:"",    color:"#f59e0b", icon:"⚠️", sub:"High TempDiff" },
          { label:"Coverage",     val:"96", unit:"%",   color:"#10b981", icon:"✅", sub:"3 pts missing" },
        ].map((s,i) => (
          <div key={i} className="stat-card">
            <div className="stat-card-accent" style={{ background:s.color }}/>
            <div className="stat-label">{s.label.toUpperCase()}</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:4, marginBottom:6 }}>
              <div className="stat-value" style={{ color:s.color }}>{s.val}</div>
              {s.unit && <div style={{ fontSize:14, color:"var(--text3)", marginBottom:3 }}>{s.unit}</div>}
              <div style={{ marginLeft:"auto", fontSize:22 }}>{s.icon}</div>
            </div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid dash-mid section-gap" style={{ gridTemplateColumns:"1fr 1fr 280px" }}>
        <div className="panel">
          <div className="panel-header">
            <div><div className="panel-title">Shift Coverage</div><div className="panel-sub">Today · Shift B</div></div>
            <span className="chip chip-green ml-auto">● LIVE</span>
          </div>
          <div className="panel-body">
            <CoverageRow label="ACS Temperature" filled={21} total={21}/>
            <CoverageRow label="Stand Scanner"   filled={34} total={36}/>
            <CoverageRow label="Tail Breaker"    filled={12} total={15}/>
            <CoverageRow label="Twin Channel"    filled={8}  total={8} />
            <CoverageRow label="PR / CVR / FFB"  filled={11} total={15}/>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div><div className="panel-title">Temp Trend</div><div className="panel-sub">DRM 03 St.1</div></div>
          </div>
          <div className="panel-body">
            <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:12 }}>
              <span style={{ fontSize:34, fontWeight:800, color:"var(--rose)", letterSpacing:"-1px" }}>72</span>
              <span style={{ fontSize:16, color:"var(--rose)", fontWeight:600 }}>°C</span>
              <span style={{ marginLeft:"auto", background:"var(--rose-light)", color:"var(--rose)", padding:"4px 8px", borderRadius:7, fontSize:11, fontWeight:700 }}>▲ +9.5°C</span>
            </div>
            <Spark data={sparkData}/>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
              {["M","T","W","T","F","S","S","M","T","W","T","F"].map((d,i)=>(
                <span key={i} style={{ fontSize:8, color:"var(--text4)", fontFamily:"var(--mono)" }}>{d}</span>
              ))}
            </div>
            <div className="trend-stat-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:12 }}>
              {[{l:"MIN",v:"38°C",c:"var(--blue)"},{l:"AVG",v:"54°C",c:"var(--amber)"},{l:"MAX",v:"72°C",c:"var(--rose)"}].map((s,i)=>(
                <div key={i} style={{ background:"var(--surface2)", borderRadius:8, padding:"9px 10px", border:"1px solid var(--border)" }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"var(--text3)", letterSpacing:1, marginBottom:3 }}>{s.l}</div>
                  <div style={{ fontSize:16, fontWeight:800, color:s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Live Alerts</div>
            <span className="ml-auto"><span className="live-dot pulse"/></span>
          </div>
          {alerts.map((a,i) => (
            <div key={i} className="alert-row">
              <div className={`alert-dot ${a.type==="critical"?"dot-critical":a.type==="warning"?"dot-warning":"dot-info"} ${a.type==="critical"?"pulse":""}`}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"var(--text)" }}>
                  {a.point} {a.val && <span style={{ color:a.type==="critical"?"var(--rose)":"var(--amber)" }}>{a.val}</span>}
                </div>
                <div style={{ fontSize:10, color:"var(--text3)", marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.msg}</div>
              </div>
              <div style={{ fontSize:9, fontFamily:"var(--mono)", color:"var(--text4)", flexShrink:0 }}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel section-gap">
        <div className="panel-header">
          <div className="panel-title">Operator Activity</div>
          <div className="panel-sub ml-auto">Today</div>
        </div>
        <div className="ops-grid" style={{ padding:"12px 14px", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {operators.map((op,i) => (
            <div key={i} className="op-card">
              <div className="op-avatar" style={{ background:op.color }}>{op.init}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:700, fontSize:12, color:"var(--text)" }}>{op.name}</div>
                <div style={{ fontSize:10, color:"var(--text3)", fontFamily:"var(--mono)", marginTop:1 }}>Sh.{op.shift} · {op.line}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:20, fontWeight:800, color:op.count>0?"var(--emerald)":"var(--text4)" }}>{op.count}</div>
                <div style={{ fontSize:8, color:"var(--text3)", fontFamily:"var(--mono)" }}>RDGS</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OperatorHome({ onNav }) {
  const forms = [
    { id:"acs",   icon:"🌡️", title:"ACS Temperature", sub:"DRM 01–07",    color:"#3b82f6", status:"ok",      last:"Submitted 11:34" },
    { id:"stand", icon:"⚙️", title:"Stand Scanner",   sub:"Stands 1–18", color:"#8b5cf6", status:"warn",    last:"Partial · 11:15" },
    { id:"tail",  icon:"⚡",  title:"Tail Breaker",    sub:"L1 & L2",     color:"#f43f5e", status:"missing", last:"NOT SUBMITTED" },
    { id:"twin",  icon:"◎",  title:"Twin Channel",    sub:"Channels",    color:"#10b981", status:"ok",      last:"Submitted 10:45" },
    { id:"pr",    icon:"▣",  title:"PR/CVR/FFB",      sub:"L1 & L2",     color:"#f59e0b", status:"warn",    last:"Partial · 10:20" },
  ];
  return (
    <div className="fade-in">
      <div className="status-bar" style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:"white", borderRadius:12, marginBottom:14, boxShadow:"var(--shadow-sm)", border:"1px solid var(--border)", flexWrap:"wrap" }}>
        <span className="live-dot pulse"/>
        <span style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>Shift B · L1 · 23 Feb</span>
        <span style={{ fontFamily:"var(--mono)", fontSize:12, color:"var(--blue)", fontWeight:700 }}>11:34 IST</span>
        <span className="badge badge-violet ml-auto">RAJESH</span>
      </div>
      <div className="op-home-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
        {forms.map((f,i) => (
          <div key={i} className="form-card" onClick={()=>onNav(f.id)}>
            <div className="form-card-top" style={{ background:f.color }}/>
            <div className="form-card-body">
              <div className="form-card-icon" style={{ background:`${f.color}18` }}>{f.icon}</div>
              <div className="form-card-title">{f.title}</div>
              <div className="form-card-sub">{f.sub}</div>
              <div className="form-card-status" style={{ color:f.status==="ok"?"var(--emerald)":f.status==="warn"?"var(--amber)":"var(--rose)" }}>
                {f.status==="ok"?"✓":f.status==="warn"?"⚠":"✕"} {f.last}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ACSForm() {
  return (
    <div className="fade-in">
      <div className="form-row">
        <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" defaultValue="2026-02-23"/></div>
        <div className="form-group"><label className="form-label">Time</label><input className="form-input" type="time" defaultValue="11:34"/></div>
        <div className="form-group"><label className="form-label">Shift</label><select className="form-select"><option>A</option><option>B</option><option>C</option></select></div>
        <div className="form-group"><label className="form-label">Line</label><select className="form-select"><option>L1</option><option>L2</option></select></div>
        <div style={{ display:"flex", gap:8, marginLeft:"auto", alignSelf:"flex-end", flexShrink:0 }}>
          <button className="btn btn-ghost btn-sm">↺ Clear</button>
          <button className="btn btn-success btn-sm">✓ Submit</button>
        </div>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
        {[{c:"badge-danger",t:"🔴 >70°C Critical"},{c:"badge-warn",t:"🟡 >60°C Warning"},{c:"badge-ok",t:"🟢 Normal"}].map((b,i)=>(
          <span key={i} className={`badge ${b.c}`} style={{ fontSize:10, padding:"4px 10px" }}>{b.t}</span>
        ))}
      </div>
      <div className="panel">
        <div className="panel-header">
          <div><div className="panel-title">ACS Temperature</div><div className="panel-sub">DRM 01–07 · Temp + TempDiff</div></div>
          <span className="badge badge-info ml-auto">28/28</span>
        </div>
        <div className="table-wrap" style={{ padding:"12px 14px" }}>
          <table className="entry-table">
            <thead>
              <tr>
                <th rowSpan={2} style={{ textAlign:"left", paddingLeft:10 }}>POINT</th>
                {["CON","St.1","St.2","St.3"].map(h=><th key={h} colSpan={2} className="group-header">{h}</th>)}
              </tr>
              <tr>
                {["T","D","T","D","T","D","T","D"].map((h,i)=>(
                  <th key={i} style={{ background:i%2===0?"var(--blue-light)":"var(--surface2)", color:i%2===0?"var(--blue)":"var(--text3)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drmData.map((row,i)=>(
                <tr key={i}>
                  <td className="row-label">{row.drm}</td>
                  <TCell t={row.con.t} d={row.con.d}/>
                  <TCell t={row.st1.t} d={row.st1.d}/>
                  <TCell t={row.st2.t} d={row.st2.d}/>
                  <TCell t={row.st3.t} d={row.st3.d}/>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StandForm() {
  return (
    <div className="fade-in">
      <div className="form-row">
        <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" defaultValue="2026-02-23"/></div>
        <div className="form-group"><label className="form-label">Shift</label><select className="form-select"><option>A</option><option>B</option><option>C</option></select></div>
        <div className="form-group"><label className="form-label">Line</label><select className="form-select"><option>L1</option><option>L2</option></select></div>
        <button className="btn btn-success btn-sm" style={{ alignSelf:"flex-end", marginLeft:"auto" }}>✓ Submit</button>
      </div>
      <div className="panel">
        <div className="panel-header">
          <div><div className="panel-title">Stand Scanner</div><div className="panel-sub">Stands 1–18 · °C</div></div>
          <span className="badge badge-warn ml-auto">3 Critical</span>
        </div>
        <div className="table-wrap" style={{ padding:"12px 14px" }}>
          <table className="entry-table">
            <thead>
              <tr>
                <th style={{ textAlign:"left", paddingLeft:10 }}>STAND</th>
                {["U","V","W","DE","NDE","AI","AO"].map(h=><th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {standData.map((row,i)=>(
                <tr key={i}>
                  <td className="row-label" style={{ color:"var(--violet)" }}>Stand {row.s}</td>
                  {["U","V","W","DE","NDE","AI","AO"].map(f=><SCell key={f} v={row[f]}/>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding:"8px 14px", borderTop:"1px solid var(--border)", display:"flex", gap:10, flexWrap:"wrap" }}>
          {[{c:"badge-ok",t:"Normal"},{c:"badge-warn",t:">65°C"},{c:"badge-danger",t:">70°C"}].map((b,i)=>(
            <span key={i} className={`badge ${b.c}`}>{b.t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReadingsPage() {
  return (
    <div className="fade-in">
      <div className="form-row">
        <div className="form-group"><label className="form-label">From</label><input className="form-input" type="date" defaultValue="2026-02-17"/></div>
        <div className="form-group"><label className="form-label">To</label><input className="form-input" type="date" defaultValue="2026-02-23"/></div>
        <div className="form-group"><label className="form-label">Line</label><select className="form-select"><option value="">All</option><option>L1</option><option>L2</option></select></div>
        <div className="form-group"><label className="form-label">Shift</label><select className="form-select"><option value="">All</option><option>A</option><option>B</option><option>C</option></select></div>
        <div style={{ display:"flex", gap:8, alignSelf:"flex-end" }}>
          <button className="btn btn-primary btn-sm">Filter</button>
          <button className="btn btn-ghost btn-sm">↓ Export</button>
        </div>
      </div>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">Reading History</div>
          <span className="badge badge-info ml-auto">154 records</span>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date & Time</th><th>Sh</th><th>Line</th><th>Point</th>
                <th>Value</th><th>Diff</th><th>Status</th><th>Operator</th>
              </tr>
            </thead>
            <tbody>
              {[
                { dt:"23 Feb 11:34",sh:"B",ln:"L1",pt:"DRM 03 St.1",val:"72°C",diff:"3.1",st:"danger", op:"Rajesh" },
                { dt:"23 Feb 11:28",sh:"B",ln:"L1",pt:"Stand 3 DE",  val:"68°C",diff:"—",  st:"warning",op:"Rajesh" },
                { dt:"23 Feb 11:28",sh:"B",ln:"L1",pt:"DRM 03 St.2", val:"69°C",diff:"2.8",st:"warning",op:"Rajesh" },
                { dt:"23 Feb 11:15",sh:"B",ln:"L1",pt:"Stand 7 V",   val:"68°C",diff:"—",  st:"warning",op:"Rajan M" },
                { dt:"23 Feb 10:50",sh:"B",ln:"L1",pt:"DRM 01 Con",  val:"42°C",diff:"1.0",st:"ok",      op:"Rajesh" },
                { dt:"23 Feb 10:50",sh:"B",ln:"L2",pt:"2B DE",       val:"53°C",diff:"—",  st:"ok",      op:"Rajan M" },
              ].map((r,i)=>(
                <tr key={i}>
                  <td style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--text2)", whiteSpace:"nowrap" }}>{r.dt}</td>
                  <td><span className="badge badge-violet">{r.sh}</span></td>
                  <td style={{ fontFamily:"var(--mono)", fontWeight:700, color:"var(--blue)", fontSize:11 }}>{r.ln}</td>
                  <td style={{ fontWeight:600, fontSize:12, whiteSpace:"nowrap" }}>{r.pt}</td>
                  <td style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:12, color:r.st==="danger"?"var(--rose)":r.st==="warning"?"var(--amber)":"var(--text)" }}>{r.val}</td>
                  <td style={{ fontFamily:"var(--mono)", color:"var(--text3)", fontSize:11 }}>{r.diff}</td>
                  <td><span className={`badge badge-${r.st==="ok"?"ok":r.st==="warning"?"warn":"danger"}`}>{r.st.slice(0,4).toUpperCase()}</span></td>
                  <td style={{ fontSize:11, whiteSpace:"nowrap" }}>{r.op}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding:"10px 14px", borderTop:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, color:"var(--text3)", fontFamily:"var(--mono)" }}>1–6 of 154</span>
          <div style={{ display:"flex", gap:4 }}>
            {["‹","1","2","3","›"].map((p,i)=>(
              <button key={i} className="btn btn-ghost" style={{ padding:"4px 8px", fontSize:12, minWidth:30, background:p==="1"?"var(--blue-light)":"white", color:p==="1"?"var(--blue)":"var(--text2)", borderColor:p==="1"?"var(--blue)":"var(--border)" }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:"opdash",    label:"Entry",      icon:"🗂️",  section:"OPERATOR" },
  { id:"acs",       label:"ACS Temp",   icon:"🌡️",  section:null },
  { id:"stand",     label:"Scanner",    icon:"⚙️",  section:null },
  { id:"readings",  label:"History",    icon:"📋",  section:null },
  { id:"dash",      label:"Dashboard",  icon:"📊",  section:"SUPERVISOR" },
  { id:"alerts",    label:"Alerts",     icon:"🔔",  section:null, badge:"5" },
  { id:"operators", label:"Operators",  icon:"👥",  section:null },
  { id:"admin",     label:"Admin",      icon:"⚙",  section:"ADMIN" },
];

// Bottom nav shows only 5 key items
const BOTTOM_NAV = [
  { id:"opdash",   label:"Entry",     icon:"🗂️" },
  { id:"acs",      label:"ACS Temp",  icon:"🌡️" },
  { id:"dash",     label:"Dashboard", icon:"📊" },
  { id:"readings", label:"History",   icon:"📋" },
  { id:"alerts",   label:"Alerts",    icon:"🔔" },
];

const PAGE_TITLES = {
  opdash:   { title:"Operator Entry",       sub:"Select form to submit" },
  acs:      { title:"ACS Temperature",      sub:"DRM 01–07 · Entry" },
  stand:    { title:"Stand Scanner",        sub:"Stands 1–18" },
  readings: { title:"Reading History",      sub:"Query & export" },
  dash:     { title:"Dashboard",            sub:"Monitoring overview" },
  alerts:   { title:"Alerts",              sub:"" },
  operators:{ title:"Operators",            sub:"" },
  admin:    { title:"Admin Settings",       sub:"" },
};

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("opdash");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = (id) => { setPage(id); setDrawerOpen(false); };

  if (!loggedIn) return (
    <>
      <style>{styles}</style>
      <LoginPage onLogin={()=>setLoggedIn(true)}/>
    </>
  );

  const pt = PAGE_TITLES[page] || { title: page, sub:"" };

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* Drawer overlay (mobile) */}
        <div className={`drawer-overlay ${drawerOpen?"open":""}`} onClick={()=>setDrawerOpen(false)}/>

        {/* SIDEBAR */}
        <div className={`sidebar ${drawerOpen?"open":""}`}>
          <div className="logo">
            <div className="logo-mark">⚙️</div>
            <div>
              <div className="logo-name">SteelTrack</div>
              <div className="logo-sub">MILL MONITOR</div>
            </div>
          </div>
          <nav className="nav">
            {NAV_ITEMS.map((item,i)=>(
              <div key={i}>
                {item.section && <div className="nav-section">{item.section}</div>}
                <div className={`nav-item ${page===item.id?"active":""}`} onClick={()=>navigate(item.id)}>
                  <div className="nav-icon">{item.icon}</div>
                  {item.label}
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </div>
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="avatar">SK</div>
            <div>
              <div className="user-name">Rajesh</div>
              <div className="user-role">operator</div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <button className="hamburger" onClick={()=>setDrawerOpen(true)} aria-label="Menu">☰</button>
            <div style={{ minWidth:0 }}>
              <div className="page-title">{pt.title}</div>
              <div className="page-sub-top">{pt.sub}</div>
            </div>
            <div className="topbar-right">
              <span className="chip chip-green">● Sh.B</span>
              <span className="chip chip-blue chip-hide">🕐 11:34</span>
              <button className="btn btn-ghost btn-sm topbar-signout" onClick={()=>setLoggedIn(false)}>Sign Out</button>
            </div>
          </div>

          <div className="content">
            {page==="dash"     && <Dashboard/>}
            {page==="opdash"   && <OperatorHome onNav={navigate}/>}
            {page==="acs"      && <ACSForm/>}
            {page==="stand"    && <StandForm/>}
            {page==="readings" && <ReadingsPage/>}
            {["alerts","operators","admin"].includes(page) && (
              <div className="fade-in" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60%", gap:12 }}>
                <div style={{ fontSize:48, opacity:.12 }}>🚧</div>
                <div style={{ fontSize:18, fontWeight:800, color:"var(--text3)" }}>{pt.title}</div>
                <div style={{ fontSize:13, color:"var(--text4)" }}>Coming soon</div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM NAV (mobile only) */}
        <div className="bottom-nav">
          <div className="bottom-nav-inner">
            {BOTTOM_NAV.map(item=>(
              <button key={item.id} className={`bottom-nav-item ${page===item.id?"active":""}`} onClick={()=>navigate(item.id)}>
                <div className="bottom-nav-icon">{item.icon}</div>
                <div className="bottom-nav-label">{item.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
