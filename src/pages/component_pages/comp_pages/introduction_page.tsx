import { useEffect, useRef } from 'react';
import figmaIcon from '../../../assets/figma-icon.svg';
import vscodeButtonIcon from '../../../assets/VS code-icon.svg';
import vscodeIcon from '../../../assets/vscodeicon.svg';

const INTRO_CSS = `
/* ── tokens ── */
.db-intro {
  --navy-900: #0a1120;
  --navy-800: #101a2e;
  --navy-700: #1b2740;
  --navy-line: #22304b;
  --blue-50:  #edf6ff;
  --blue-100: #d9e9fb;
  --blue-300: #7fb1e8;
  --blue-500: #0056b8;
  --blue-600: #00489a;
  --orange-50:  #fff1e8;
  --orange-100: #ffdfc7;
  --orange-500: #c65910;
  --ink:       #0f1623;
  --slate:     #51607a;
  --slate-soft: #565d6b;
  --mist:      #f6f8fb;
  --paper:     #ffffff;
  --line:      #e4eaf2;
  --line-soft: #edf1f7;
  --green:     #127a45;
  --green-soft:#e7f6ee;
  --r-sm: 6px; --r-md: 10px; --r-lg: 14px; --r-xl: 20px;
  --shadow-card: 0 1px 2px rgba(15,22,35,.04), 0 8px 24px -12px rgba(15,22,35,.10);
  --shadow-pop:  0 2px 6px rgba(15,22,35,.06), 0 20px 48px -20px rgba(0,86,184,.25);

  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 15px;
  color: var(--ink);
  background: transparent;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  width: 100%;
}
.db-intro *, .db-intro *::before, .db-intro *::after { box-sizing: border-box; margin: 0; padding: 0; }
.db-intro ::selection { background: var(--blue-100); }

/* page column */
.db-intro .page {
  --pad-x: clamp(20px, 4.5vw, 56px);
  width: 100%;
  // padding: 48px var(--pad-x) 100px;
}

/* eyebrow */
.db-intro .eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'DM Sans', monospace; font-size: 11px; font-weight: 600; letter-spacing: .06em;
  color: var(--blue-600); background: var(--blue-50); border: 1px solid var(--blue-100);
  padding: 4px 10px; border-radius: 100px; margin-bottom: 24px;
}
.db-intro .eyebrow::before {
  content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--blue-500);
}

/* hero */
.db-intro .hero { position: relative; }
.db-intro .hero::before {
  content: ""; position: absolute;
  inset: -48px calc(var(--pad-x) * -1) auto calc(var(--pad-x) * -1);
  height: 340px; z-index: -1;
  background-image: radial-gradient(circle, #c9d8ec 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,.5), transparent 85%);
          mask-image: linear-gradient(180deg, rgba(0,0,0,.5), transparent 85%);
}
.db-intro h1 {
  font-family: 'DM Sans', sans-serif; font-weight: 700;
  font-size: clamp(34px, 4.6vw, 48px); line-height: 1.06; letter-spacing: -.025em;
  max-width: 660px;
}
.db-intro h1 .accent   { color: var(--blue-500); }
.db-intro h1 .accent-2 { color: var(--orange-500); }
.db-intro .lede { margin-top: 22px; font-size: 14.5px; color: var(--slate); max-width: 620px; line-height: 1.7; }
.db-intro .lede b { color: var(--ink); font-weight: 600; }

/* sections */
.db-intro section { margin-top: 96px; scroll-margin-top: 84px; }
.db-intro .sec-head { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
.db-intro .kicker {
  font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; color: var(--orange-500); white-space: nowrap;
}
.db-intro .sec-head::after { display: none; }
.db-intro h2 {
  font-family: 'DM Sans', sans-serif; font-weight: 700;
  font-size: 27px; letter-spacing: -.015em; line-height: 1.2;
}
.db-intro .sec-sub { margin-top: 6px; color: var(--slate); max-width: 750px; }
.db-intro .sec-sub b { color: var(--ink); font-weight: 600; }

/* ── BRIDGE ── */
.db-intro .bridge {
  margin-top: 46px;
  border: 1px solid var(--line); border-radius: var(--r-xl);
  background: linear-gradient(180deg, #fbfcfe, #f6f9fd);
  box-shadow: 0 1px 3px rgba(15,22,35,.06), 0 4px 12px -4px rgba(15,22,35,.08);
  padding: 34px 30px 26px; position: relative; overflow: hidden;
}
.db-intro .bridge-grid {
  display: grid; align-items: center;
  grid-template-columns: 1fr 140px minmax(218px, .92fr) 140px 1fr;
}
.db-intro .mini {
  background: var(--navy-900); border-radius: var(--r-md); overflow: hidden;
  box-shadow: 0 10px 30px -14px rgba(10,17,32,.5);
  border: 1px solid var(--navy-700);
}
.db-intro .mini-head {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; background: var(--navy-800); border-bottom: 1px solid var(--navy-line);
  font-family: 'DM Sans', monospace; font-size: 10px; color: #9fb0cb;
}
.db-intro .mini-body {
  padding: 11px 13px; font-family: 'DM Sans', monospace; font-size: 10.4px; line-height: 1.8;
  color: #c7d4ea; white-space: pre; overflow: hidden;
}
.db-intro .mini-body .k { color: #7fb5f5; }
.db-intro .mini-body .v { color: #ffd9b8; }
.db-intro .mini-body .c { color: #5d6c88; }

/* connectors */
.db-intro .link-line {
  position: relative; height: 2px; align-self: center;
  background: repeating-linear-gradient(90deg, var(--blue-300) 0 6px, transparent 6px 12px);
  background-size: 12px 2px;
  background-clip: content-box;
}
/* dashes stop where the arrowhead starts */
.db-intro .link-line.l { padding-left: 9px;  animation: db-flowL 1s linear infinite; }
.db-intro .link-line.r { padding-right: 9px; animation: db-flowR 1s linear infinite; }
@keyframes db-flowR { to { background-position: 12px 0; } }
@keyframes db-flowL { to { background-position: -12px 0; } }
.db-intro .link-line::after {
  content: ""; position: absolute; top: 50%; transform: translateY(-50%);
  width: 0; height: 0;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent;
}
.db-intro .link-line.r::after { right: 0; border-left: 7px solid var(--blue-300); }
.db-intro .link-line.l::after { left: 0;  border-right: 7px solid var(--blue-300); }
.db-intro .link-tag {
  position: absolute; top: -26px; left: 50%; transform: translateX(-50%);
  font-family: 'DM Sans', sans-serif; font-size: 9px; letter-spacing: .04em; color: var(--blue-600);
  background: var(--blue-50); border: 1px solid var(--blue-100); border-radius: 5px;
  padding: 2px 7px; white-space: nowrap;
}

/* center spec node */
.db-intro .spec {
  background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg);
  box-shadow: var(--shadow-card); padding: 18px; position: relative; z-index: 1; text-align: center;
}
.db-intro .spec-ico {
  width: 38px; height: 38px; margin: 0 auto 10px; border-radius: 10px;
  background: linear-gradient(135deg, var(--blue-500), #1c7ae0);
  display: grid; place-items: center; box-shadow: 0 6px 16px -6px rgba(0,86,184,.5);
}
.db-intro .spec h3 { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; }
.db-intro .spec .sub { font-size: 11px; color: var(--slate-soft); margin-top: 1px; }
.db-intro .spec-chips { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 14px; }
.db-intro .spec-chip {
  display: flex; align-items: center; gap: 6px; justify-content: center;
  font-size: 10.5px; font-weight: 600; color: var(--slate);
  background: var(--mist); border: 1px solid var(--line); border-radius: 6px; padding: 5px 4px;
}
.db-intro .spec-foot {
  margin-top: 13px; padding-top: 11px; border-top: 1px dashed var(--line);
  font-size: 10.5px; color: var(--slate-soft);
}
.db-intro .bridge-caption { margin-top: 24px; text-align: center; font-size: 13px; color: var(--slate); }
.db-intro .bridge-caption b { color: var(--ink); font-weight: 600; }

/* ── DRIFT ── */
.db-intro .drift { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.db-intro .drift-card {
  border: 1px solid var(--line); border-radius: var(--r-lg); padding: 24px; background: var(--paper);
  box-shadow: var(--shadow-card);
}
.db-intro .drift-card.bad {
  border-style: dashed;
  background: repeating-linear-gradient(-45deg, #fff, #fff 12px, #fcfdfe 12px, #fcfdfe 24px);
}
.db-intro .drift-tag {
  display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 10.5px; font-weight: 600;
  letter-spacing: .08em; text-transform: uppercase; padding: 3px 9px; border-radius: 5px; margin-bottom: 14px;
}
.db-intro .drift-card.bad  .drift-tag { color: #9b3030; background: #fbeaea; }
.db-intro .drift-card.good .drift-tag { color: var(--green); background: var(--green-soft); }
.db-intro .drift-title { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 16.5px; letter-spacing: -.01em; }
.db-intro .drift-desc { margin-top: 8px; font-size: 13.5px; color: var(--slate); line-height: 1.65; }
.db-intro .drift-viz { margin-top: 20px; font-family: 'DM Sans', sans-serif; font-size: 11px; color: var(--slate); }
.db-intro .drift-viz .row { display: flex; align-items: center; gap: 10px; }
.db-intro .drift-viz .node {
  padding: 2px 9px; border-radius: 5px; border: 1px solid var(--line); background: var(--mist);
  color: var(--ink); font-weight: 600; white-space: nowrap;
}
.db-intro .drift-viz .arrow {
  flex: 1 1 0; min-width: 20px; height: 10px; position: relative;
}
/* line */
.db-intro .drift-viz .arrow::before {
  content: ""; position: absolute; left: 0; right: 6px; top: 50%;
  height: 2px; transform: translateY(-50%); border-radius: 1px;
  background: var(--line);
}
/* head */
.db-intro .drift-viz .arrow::after {
  content: ""; position: absolute; right: 0; top: 50%; transform: translateY(-50%);
  width: 0; height: 0;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent;
  border-left: 7px solid var(--line);
}
.db-intro .drift-viz .arrow.broken::before {
  background: repeating-linear-gradient(90deg, #d8a5a5 0 5px, transparent 5px 10px);
}
.db-intro .drift-viz .arrow.broken::after { border-left-color: #d8a5a5; }
.db-intro .drift-viz .arrow.solid::before { background: var(--blue-500); }
.db-intro .drift-viz .arrow.solid::after  { border-left-color: var(--blue-500); }
/* left-pointing variant */
.db-intro .drift-viz .arrow.left::before { left: 6px; right: 0; }
.db-intro .drift-viz .arrow.left::after {
  right: auto; left: 0;
  border-left: 0; border-right: 7px solid var(--line);
}
.db-intro .drift-viz .arrow.left.solid::after  { border-right-color: var(--blue-500); }
.db-intro .drift-viz .arrow.left.broken::after { border-right-color: #d8a5a5; }
.db-intro .drift-viz .mid { padding: 2px 9px; border-radius: 5px; font-weight: 700; white-space: nowrap; }
.db-intro .drift-viz .mid.bad  { color: #9b3030; background: #fbeaea; border: 1px dashed #e3b8b8; }
.db-intro .drift-viz .mid.good { color: #fff; background: var(--blue-500); }

/* ── HOW IT WORKS ── */
.db-intro .steps {
  margin-top: 34px; position: relative;
  display: grid; grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--line); border-radius: var(--r-lg); overflow: visible;
  box-shadow: var(--shadow-card); background: var(--paper);
}
.db-intro .step { padding: 22px; position: relative; }
.db-intro .step + .step { border-left: 1px solid var(--line-soft); }
.db-intro .step:first-child { border-radius: var(--r-lg) 0 0 var(--r-lg); }
.db-intro .step:last-child  { border-radius: 0 var(--r-lg) var(--r-lg) 0; }

.db-intro .flow-arrow {
  position: absolute; top: 50%; width: 30px; height: 30px; border-radius: 50%; z-index: 5;
  background: #fff; border: 1px solid var(--line); box-shadow: var(--shadow-card);
  display: grid; place-items: center; transform: translate(-50%, -50%);
}
.db-intro .flow-arrow.a1 { left: 33.333%; }
.db-intro .flow-arrow.a2 { left: 66.666%; }

.db-intro .vig {
  height: 104px; border: 1px solid var(--line); border-radius: var(--r-md);
  background: var(--mist); margin-bottom: 18px; overflow: hidden; position: relative;
  display: grid; place-items: center;
}
/* vignette 1 - browse */
.db-intro .vig-browse { display: flex; gap: 12px; align-items: center; }
.db-intro .vig-nav { display: flex; flex-direction: column; gap: 5px; }
.db-intro .vig-nav i { display: block; width: 74px; height: 13px; border-radius: 4px; background: #dde5ef; }
.db-intro .vig-nav i.on { background: var(--blue-500); position: relative; }
.db-intro .vig-nav i.on::after {
  content: "Button"; position: absolute; inset: 0; display: flex; align-items: center; padding-left: 7px;
  color: #fff; font-size: 8.5px; font-weight: 700; font-family: 'DM Sans', sans-serif;
}
.db-intro .vig-matrix { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
.db-intro .vig-matrix i { display: block; width: 30px; height: 14px; border-radius: 99px; }
.db-intro .vig-matrix i:nth-child(1) { background: var(--blue-500); }
.db-intro .vig-matrix i:nth-child(2) { background: #fff; border: 1.5px solid var(--blue-500); }
.db-intro .vig-matrix i:nth-child(3) { background: #b42323; }
.db-intro .vig-matrix i:nth-child(4) { background: #fff; border: 1.5px solid #b42323; }
.db-intro .vig-matrix i:nth-child(5) { background: #dde5ef; }
.db-intro .vig-matrix i:nth-child(6) { background: #fff; border: 1.5px solid #cbd5e3; }
/* vignette 2 - customise */
.db-intro .vig-custom { display: flex; flex-direction: column; gap: 8px; width: 150px; }
.db-intro .vig-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.db-intro .vig-row i { display: block; height: 9px; border-radius: 3px; background: #cdd7e4; flex: 1; }
.db-intro .tg { position: relative; width: 27px; height: 15px; border-radius: 99px; background: var(--blue-500); flex-shrink: 0; }
.db-intro .tg::after {
  content: ""; position: absolute; top: 2px; right: 2px; width: 11px; height: 11px;
  border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.25);
}
.db-intro .tg.off { background: #cdd7e4; }
.db-intro .tg.off::after { right: auto; left: 2px; }
.db-intro .vig-seg {
  display: flex; gap: 2px; background: #e7edf5; border: 1px solid #dde5ef;
  border-radius: 6px; padding: 2px;
}
.db-intro .vig-seg i { display: block; width: 30px; height: 11px; border-radius: 4px; }
.db-intro .vig-seg i.on { background: #fff; box-shadow: 0 1px 2px rgba(15,22,35,.15); }
/* vignette 3 - copy */
.db-intro .vig-copy { display: flex; flex-direction: column; gap: 8px; align-items: center; }
.db-intro .vig-btn {
  display: flex; align-items: center; gap: 7px; width: 158px;
  font-size: 10px; font-weight: 700; font-family: 'DM Sans', sans-serif; color: #fff;
  border-radius: 7px; padding: 7px 11px;
}
.db-intro .vig-btn.dark { background: var(--navy-900); }
.db-intro .vig-btn.blue { background: #0076B8; }
.db-intro .vig-toast {
  position: absolute; top: 9px; right: 9px;
  display: flex; align-items: center; gap: 5px;
  font-size: 9px; font-weight: 700; color: var(--green); font-family: 'DM Sans', sans-serif;
  background: #fff; border: 1px solid #cbe9d8; border-radius: 99px; padding: 3px 9px;
  box-shadow: var(--shadow-card);
}
.db-intro .step-no {
  font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; color: var(--blue-500);
  display: flex; align-items: center; gap: 8px; margin-bottom: 10px; letter-spacing: .06em;
}
.db-intro .step h3 {
  font-family: 'DM Sans', sans-serif; font-size: 16.5px; font-weight: 700;
  letter-spacing: -.01em; display: inline;
}
.db-intro .step p { margin-top: 8px; font-size: 13px; color: var(--slate); line-height: 1.68; }
.db-intro .step p b { color: var(--ink); font-weight: 600; }
.db-intro .steps-result {
  margin-top: 16px; display: flex; align-items: center; justify-content: center; gap: 9px;
  font-size: 13px; color: var(--slate);
}
.db-intro .steps-result b { color: var(--ink); font-weight: 600; }
.db-intro .steps-result .pulse {
  width: 7px; height: 7px; border-radius: 50%; background: var(--green);
  box-shadow: 0 0 0 3px rgba(18,122,69,.15);
}

/* ── BOTH SIDES ── */
.db-intro .sides { margin-top: 34px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.db-intro .side {
  border-radius: var(--r-xl); padding: 30px 28px; position: relative; overflow: hidden;
  transition: transform .2s, box-shadow .2s;
}
.db-intro .side:hover { transform: translateY(-3px); box-shadow: var(--shadow-pop); }
.db-intro .side.designer { background: var(--navy-900); color: #fff; border: 1px solid var(--navy-700); }
.db-intro .side.developer { background: var(--blue-50); border: 1px solid var(--blue-100); }
.db-intro .side-mark { position: absolute; right: -22px; bottom: -26px; opacity: .07; pointer-events: none; }
.db-intro .side-role {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'DM Sans', sans-serif; font-size: 10.5px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; margin-bottom: 18px;
}
.db-intro .side.designer .side-role { color: #8fb4e6; }
.db-intro .side.developer .side-role { color: var(--blue-600); }
.db-intro .side-role::before { content: ""; width: 18px; height: 1.5px; background: currentColor; opacity: .6; }
.db-intro .side h3 { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 24px; letter-spacing: -.02em; line-height: 1.22; }
.db-intro .side.designer h3 em { font-style: normal; color: #7fb5f5; }
.db-intro .side.developer h3 em { font-style: normal; color: var(--blue-500); }
.db-intro .side ul { list-style: none; margin-top: 22px; display: flex; flex-direction: column; gap: 13px; }
.db-intro .side li { display: flex; gap: 11px; font-size: 13.5px; line-height: 1.55; align-items: flex-start; }
.db-intro .side.designer li { color: #c4d2e8; }
.db-intro .side.developer li { color: var(--slate); }
.db-intro .side li b { font-weight: 600; }
.db-intro .side.designer li b { color: #fff; }
.db-intro .side.developer li b { color: var(--ink); }
.db-intro .check {
  width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0; margin-top: 1px;
  display: grid; place-items: center;
}
.db-intro .side.designer .check { background: rgba(127,181,245,.16); }
.db-intro .side.developer .check { background: #d7e7fa; }
.db-intro .side-tool {
  margin-top: 24px; padding-top: 18px; display: flex; align-items: center; gap: 8px;
  font-size: 11.5px; font-family: 'DM Sans', sans-serif;
}
.db-intro .side.designer .side-tool { border-top: 1px solid var(--navy-line); color: #8298b9; }
.db-intro .side.developer .side-tool { border-top: 1px solid var(--blue-100); color: var(--slate-soft); }
.db-intro .side-tool .keybtn {
  font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 5px; font-family: 'DM Sans', sans-serif;
}
.db-intro .side.designer .keybtn { background: rgba(255,255,255,.1); color: #fff; border: 1px solid rgba(255,255,255,.16); }
.db-intro .side.developer .keybtn { background: var(--blue-500); color: #fff; }

/* ── USE CASES ── */
.db-intro .cases { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.db-intro .case {
  border: 1px solid var(--line); border-radius: var(--r-lg); padding: 22px;
  background: var(--paper); box-shadow: var(--shadow-card);
  display: flex; flex-direction: column; transition: transform .2s, box-shadow .2s;
}
.db-intro .case:hover { transform: translateY(-2px); box-shadow: var(--shadow-pop); }
.db-intro .case-top { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.db-intro .case-ico { width: 32px; height: 32px; border-radius: 8px; display: grid; place-items: center; flex-shrink: 0; }
.db-intro .case-who { font-family: 'DM Sans', sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--slate-soft); }
.db-intro .case h3 { font-family: 'DM Sans', sans-serif; font-size: 15.5px; font-weight: 700; letter-spacing: -.01em; line-height: 1.35; }
.db-intro .case p { margin-top: 8px; font-size: 13px; color: var(--slate); line-height: 1.65; flex: 1; }
.db-intro .case p b { color: var(--ink); font-weight: 600; }
.db-intro .case .result {
  margin-top: 16px; padding-top: 12px; border-top: 1px dashed var(--line);
  font-size: 12px; color: var(--green); font-weight: 600; display: flex; align-items: center; gap: 7px;
}

/* ── SCOPE ── */
.db-intro .scope { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.db-intro .scope-card {
  border: 1px solid var(--line); border-radius: var(--r-lg); overflow: hidden;
  box-shadow: var(--shadow-card); background: var(--paper);
  transition: transform .2s, box-shadow .2s;
}
.db-intro .scope-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-pop); }
.db-intro .scope-head {
  padding: 16px 20px; border-bottom: 1px solid var(--line-soft);
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
}
.db-intro .scope-head h3 { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; }
.db-intro .scope-head .where { font-family: 'DM Sans', sans-serif; font-size: 10px; color: var(--slate-soft); letter-spacing: .06em; text-transform: uppercase; }
.db-intro .scope-row { display: flex; gap: 14px; padding: 13px 20px; align-items: flex-start; }
.db-intro .scope-row + .scope-row { border-top: 1px solid var(--line-soft); }
.db-intro .scope-glyph {
  width: 30px; height: 30px; border-radius: 7px; background: var(--mist);
  border: 1px solid var(--line); display: grid; place-items: center; flex-shrink: 0; margin-top: 1px;
}
.db-intro .scope-row b { display: block; font-size: 13px; font-weight: 600; color: var(--ink); }
.db-intro .scope-row span { display: block; font-size: 12.5px; color: var(--slate); margin-top: 2px; line-height: 1.55; }
.db-intro .scope-row code {
  font-family: 'DM Sans', monospace; font-size: 11px; color: var(--blue-600);
  background: var(--blue-50); padding: 1px 6px; border-radius: 4px;
}

/* ── OUTPUTS ── */
.db-intro .outs { margin-top: 30px; border: 1px solid var(--line); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-card); }
.db-intro .out { display: grid; grid-template-columns: 236px 1fr 300px; background: var(--paper); }
.db-intro .out + .out { border-top: 1px solid var(--line-soft); }
.db-intro .out > div { padding: 20px 22px; }
.db-intro .out > div + div { border-left: 1px solid var(--line-soft); }
.db-intro .out-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 700; padding: 7px 13px; border-radius: 7px; white-space: nowrap;
}
.db-intro .out-btn.figma  { background: var(--navy-900); color: #fff; }
.db-intro .out-btn.vscode { background: #0076B8; color: #fff; }
.db-intro .out-btn.all    { background: #fff; color: var(--ink); border: 1px solid var(--line); }
.db-intro .out-for { font-family: 'DM Sans', sans-serif; font-size: 10.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--slate-soft); margin-top: 12px; }
.db-intro .out h3 { font-size: 13.5px; font-weight: 700; }
.db-intro .out .desc p { font-size: 13px; color: var(--slate); line-height: 1.65; margin-top: 4px; }
.db-intro .out .dest { font-size: 12px; color: var(--slate); }
.db-intro .out .dest b {
  display: block; font-size: 10.5px; font-family: 'DM Sans', sans-serif;
  letter-spacing: .08em; text-transform: uppercase; color: var(--slate-soft); font-weight: 600; margin-bottom: 6px;
}
.db-intro .mcp-note {
  margin-top: 18px; display: flex; gap: 12px; align-items: flex-start;
  background: var(--blue-50); border: 1px solid var(--blue-100); border-radius: var(--r-md);
  padding: 14px 16px; font-size: 13px; color: #1d3a63; line-height: 1.6;
}
.db-intro .mcp-note a { color: var(--blue-600); font-weight: 600; text-decoration: none; }
.db-intro .mcp-note a:hover { text-decoration: underline; }

/* ── REQUIREMENTS ── */
.db-intro .reqs { margin-top: 26px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.db-intro .req {
  display: flex; gap: 12px; align-items: flex-start;
  border: 1px solid var(--line); border-radius: var(--r-md); padding: 16px 18px; background: var(--paper);
}
.db-intro .req-check {
  width: 20px; height: 20px; border-radius: 50%; background: var(--green-soft); color: var(--green);
  display: grid; place-items: center; flex-shrink: 0; margin-top: 1px; font-size: 11px; font-weight: 700;
}
.db-intro .req b { font-size: 13px; font-weight: 600; display: block; }
.db-intro .req span { font-size: 12.5px; color: var(--slate); display: block; margin-top: 2px; line-height: 1.55; }

/* ── NEXT ── */
.db-intro .next {
  margin-top: 96px; display: flex; justify-content: flex-end;
  border-top: 1px solid var(--line); padding-top: 28px;
}
.db-intro .next a {
  display: flex; flex-direction: column; gap: 3px; text-decoration: none; text-align: right;
  border: 1px solid var(--line); border-radius: var(--r-md); padding: 14px 18px; min-width: 230px;
  transition: border-color .15s, box-shadow .15s;
}
.db-intro .next a:hover { border-color: var(--blue-500); box-shadow: var(--shadow-card); }
.db-intro .next .dir { font-size: 11px; color: var(--slate-soft); }
.db-intro .next .dest-name { font-size: 13.5px; font-weight: 700; color: var(--blue-600); font-family: 'DM Sans', sans-serif; }

/* ── REVEAL ANIMATION ── */
.db-intro .reveal { opacity: 0; transform: translateY(14px); transition: opacity .6s ease, transform .6s ease; }
.db-intro .reveal.in { opacity: 1; transform: none; }

/* ── RESPONSIVE ── */
@media (max-width: 980px) {
  .db-intro .out { grid-template-columns: 1fr; }
  .db-intro .out > div + div { border-left: none; border-top: 1px solid var(--line-soft); }
  .db-intro .bridge-grid { grid-template-columns: 1fr; gap: 0; justify-items: center; }
  .db-intro .bridge-grid .mini { width: 100%; max-width: 380px; }
  .db-intro .spec { width: 100%; max-width: 300px; margin: 0; }
  .db-intro .link-line {
    width: 2px; height: 42px; margin: 8px 0; padding: 0;
    background: repeating-linear-gradient(180deg, var(--blue-300) 0 6px, transparent 6px 12px);
    background-size: 2px 12px; background-clip: border-box; animation: none !important;
  }
  .db-intro .link-line::after { display: none; }
  .db-intro .link-tag { top: 50%; left: auto; right: -8px; transform: translate(100%, -50%); }
}
@media (max-width: 820px) {
  .db-intro .drift,
  .db-intro .cases,
  .db-intro .scope,
  .db-intro .reqs,
  .db-intro .sides { grid-template-columns: 1fr; }
  .db-intro .steps { grid-template-columns: 1fr; }
  .db-intro .step + .step { border-left: none; border-top: 1px solid var(--line-soft); }
  .db-intro .flow-arrow { display: none; }
}
@media (max-width: 620px) {
  .db-intro .page { padding-top: 36px; padding-bottom: 70px; }
  .db-intro .link-tag { display: none; }
  .db-intro .next a { min-width: 0; flex: 1; }
  .db-intro .drift-viz { font-size: 10px; }
  .db-intro .drift-viz .row { gap: 6px; }
  .db-intro .drift-viz .arrow { min-width: 14px; }
  .db-intro .drift-viz .node,
  .db-intro .drift-viz .mid { padding: 2px 7px; }
}
@media (prefers-reduced-motion: reduce) {
  .db-intro .reveal { opacity: 1; transform: none; transition: none; }
  .db-intro .link-line.l,
  .db-intro .link-line.r { animation: none; }
  .db-intro .side,
  .db-intro .case { transition: none; }
}
`;

const CheckSvg = ({ stroke = '#127a45' }) => (
  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
    <path d="M2 6.5 4.8 9 10 3.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function IntroductionPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    root.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="db-intro" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: INTRO_CSS }} />

      <div className="page">

        {/* ─── 1 · HERO ─── */}
        <header className="hero">
          {/* <div className="eyebrow">DOCS · INTRODUCTION</div> */}
          <h1>
            One design system.<br />
            Fluent in <span className="accent">Figma</span> and in <span className="accent-2">code</span>.
          </h1>
          <p className="lede">
            DesignBridge documents every style and component in your system, lets you tune it to your
            project, and exports it two ways — an <b>AI-ready Figma prompt</b> for designers and a{' '}
            <b>VS&nbsp;Code markdown spec</b> for developers. Both sides build from the same source,
            so nothing gets lost in handoff.
          </p>

          {/* bridge diagram */}
          <div className="bridge reveal" aria-label="One component spec exporting to a Figma prompt and a VS Code markdown file">
            <div className="bridge-grid">

              {/* figma prompt card */}
              <div className="mini figma-card">
                <div className="mini-head">
                  <img src={figmaIcon} alt="" aria-hidden="true" width={10} height={10} />
                  figma-prompt.txt
                </div>
                <div className="mini-body">
                  <span className="c">{'// for your AI in Figma\n'}</span>
                  {'Create a '}<span className="k">Badge</span>{' on canvas.\n'}
                  {'variant: '}<span className="v">filled / primary</span>{'\n'}
                  {'token:   '}<span className="v">primary/500</span>{'\n'}
                  {'radius:  '}<span className="v">full</span>{' · h: '}<span className="v">24px</span>{'\n'}
                  {'dot: '}<span className="v">yes</span>{' · dismiss: '}<span className="v">yes</span>
                </div>
              </div>

              {/* left connector */}
              <div className="link-line l lk1"><span className="link-tag">Copy Figma Prompt</span></div>

              {/* spec node */}
              <div className="spec">
                <div className="spec-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3 L21 12 L12 21 L3 12 Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Component</h3>
                {/* <div className="sub">your customised spec</div> */}
                <div className="spec-chips">
                  <span className="spec-chip"><CheckSvg />Variants</span>
                  <span className="spec-chip"><CheckSvg />States</span>
                  <span className="spec-chip"><CheckSvg />Tokens</span>
                  <span className="spec-chip"><CheckSvg />Dimensions</span>
                </div>
                <div className="spec-foot">Documented Once · Export Anywhere</div>
              </div>

              {/* right connector */}
              <div className="link-line r lk2"><span className="link-tag">Copy VS Code MD</span></div>

              {/* md card */}
              <div className="mini md-card">
                <div className="mini-head">
                  <img src={vscodeIcon} alt="" aria-hidden="true" width={10} height={10} />
                  badge.md
                </div>
                <div className="mini-body">
                  <span className="c">{'# Badge — spec\n'}</span>
                  <span className="k">{'variant:'}</span>{' '}<span className="v">{'filled\n'}</span>
                  <span className="k">{'color:  '}</span>{' '}<span className="v">{'primary/500\n'}</span>
                  <span className="k">{'radius: '}</span>{' '}<span className="v">{'full'}</span>{'  '}<span className="k">{'h:'}</span>{' '}<span className="v">{'24px\n'}</span>
                  <span className="k">{'font:   '}</span>{' '}<span className="v">{'12px / 600\n'}</span>
                  <span className="k">{'padding:'}</span>{' '}<span className="v">{'4px 11px'}</span>
                </div>
              </div>
            </div>

            <div className="bridge-caption">
              <b>One customised spec → two ready-to-paste exports.</b> Designers and developers always read from the same source.
            </div>
          </div>
        </header>

        {/* ─── 2 · WHY ─── */}
        <section id="why" className="reveal">
          <div className="sec-head"><span className="kicker">Why DesignBridge</span></div>
          <h2>Design systems drift. This one can't.</h2>
          <p className="sec-sub">
            The system lives in Figma, the implementation lives in a repo, and the documentation
            lives somewhere nobody checks. Each copy ages at its own speed — and every handoff pays
            the difference in review cycles. DesignBridge replaces three diverging copies with one
            source that exports to both sides.
          </p>

          <div className="drift">
            <div className="drift-card bad">
              <span className="drift-tag">Without</span>
              <div className="drift-title">Three copies, three truths</div>
              <p className="drift-desc">
                Specs are described in Figma, re-interpreted in code, then re-aligned in review.
                Token values get pasted by hand. Every AI prompt starts from a blank page.
              </p>
              <div className="drift-viz">
                <div className="row">
                  <span className="node">Figma</span>
                  <span className="arrow broken" />
                  <span className="mid bad">handoff gap</span>
                  <span className="arrow broken" />
                  <span className="node">Code</span>
                </div>
              </div>
            </div>
            <div className="drift-card good">
              <span className="drift-tag">With</span>
              <div className="drift-title">One source, two exports</div>
              <p className="drift-desc">
                Each component is documented once — variants, states, tokens, dimensions. Designers
                export it as a Figma prompt; developers export it as markdown. Same spec, both sides.
              </p>
              <div className="drift-viz">
                <div className="row">
                  <span className="node">Figma</span>
                  <span className="arrow solid left" />
                  <span className="mid good">DesignBridge</span>
                  <span className="arrow solid" />
                  <span className="node">Code</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3 · HOW IT WORKS ─── */}
        <section id="how" className="reveal">
          <div className="sec-head"><span className="kicker">How it works</span></div>
          <h2>Browse, customise, copy. That's the whole flow.</h2>
          <p className="sec-sub">
            Every page in DesignBridge — style or component — works exactly the same way. Learn it
            once, use it everywhere.
          </p>

          <div className="steps">
            <div className="flow-arrow a1" aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M5.5 3 11 8l-5.5 5" stroke="#0056b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flow-arrow a2" aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M5.5 3 11 8l-5.5 5" stroke="#0056b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="step">
              <div className="vig" aria-hidden="true">
                <div className="vig-browse">
                  <div className="vig-nav"><i /><i className="on" /><i /><i /></div>
                  <div className="vig-matrix"><i /><i /><i /><i /><i /><i /></div>
                </div>
              </div>
              <div className="step-no">STEP 01</div>
              <h3>Browse</h3>
              <p>
                Pick any entry from the left nav — a style set like <b>Colors</b> or a component like{' '}
                <b>Button</b>. The full variant matrix renders instantly: every size, state, and type
                side by side.
              </p>
            </div>

            <div className="step">
              <div className="vig" aria-hidden="true">
                <div className="vig-custom">
                  <div className="vig-row"><i style={{ maxWidth: 64 }} /><span className="tg" /></div>
                  <div className="vig-row"><i style={{ maxWidth: 78 }} /><span className="tg off" /></div>
                  <div className="vig-row">
                    <i style={{ maxWidth: 46 }} />
                    <span className="vig-seg"><i className="on" /><i /><i /></span>
                  </div>
                </div>
              </div>
              <div className="step-no">STEP 02</div>
              <h3>Customise</h3>
              <p>
                In the right-hand panel, make the spec yours — <b>toggle variants</b> on or off,
                set sizes and dimensions, change anchors and appearance. The preview updates as you go.
              </p>
            </div>

            <div className="step">
              <div className="vig" aria-hidden="true">
                <div className="vig-copy">
                  <span className="vig-btn dark">
                    <img src={figmaIcon} alt="" aria-hidden="true" width={9} height={9} />
                    Copy Figma Prompt
                  </span>
                  <span className="vig-btn blue">
                    <img src={vscodeButtonIcon} alt="" aria-hidden="true" width={9} height={9} />
                    Copy VS Code MD
                  </span>
                </div>
                <span className="vig-toast">
                  <CheckSvg stroke="#127a45" />
                  Copied
                </span>
              </div>
              <div className="step-no">STEP 03</div>
              <h3>Copy</h3>
              <p>
                Hit the export that matches your side — <b>Copy Figma Prompt</b> for canvas work,{' '}
                <b>Copy VS Code MD</b> for code. Paste it where you work and keep moving.
              </p>
            </div>
          </div>

          {/* <div className="steps-result">
            <span className="pulse" />
            From browsing to pasting: <b>under a minute, no reformatting.</b>
          </div> */}
        </section>

        {/* ─── 4 · BUILT FOR BOTH SIDES ─── */}
        <section id="both-sides" className="reveal">
          <div className="sec-head"><span className="kicker">Built for both sides</span></div>
          <h2>Same tool. Different superpowers.</h2>
          <p className="sec-sub">DesignBridge speaks fluent Figma and fluent code — at the same time.</p>

          <div className="sides">
            <div className="side designer">
              <div className="side-role">For Designers</div>
              <h3>Stop explaining.<br /><em>Start shipping.</em></h3>
              <ul>
                <li>
                  <span className="check"><CheckSvg stroke="#7fb5f5" /></span>
                  <span>Browse every component with <b>full variant coverage</b> — sizes, states, and types in one view</span>
                </li>
                <li>
                  <span className="check"><CheckSvg stroke="#7fb5f5" /></span>
                  <span>Copy <b>Figma-ready prompts</b> in one click — tokens, states, and all</span>
                </li>
                <li>
                  <span className="check"><CheckSvg stroke="#7fb5f5" /></span>
                  <span><b>Customise specs</b> before sharing them with your team</span>
                </li>
                <li>
                  <span className="check"><CheckSvg stroke="#7fb5f5" /></span>
                  <span>Style guide <b>always in sync</b> — colors, type, spacing</span>
                </li>
              </ul>
              <div className="side-tool">
                your one-click export <span className="keybtn">Copy Figma Prompt</span>
              </div>
            </div>

            <div className="side developer">
              <div className="side-role">For Developers</div>
              <h3>No guesswork.<br /><em>Just build.</em></h3>
              <ul>
                <li>
                  <span className="check"><CheckSvg stroke="#0056b8" /></span>
                  <span>Copy <b>VS Code markdown</b> for any component, instantly</span>
                </li>
                <li>
                  <span className="check"><CheckSvg stroke="#0056b8" /></span>
                  <span>Token references <b>baked in</b> — no hunting for hex codes</span>
                </li>
                <li>
                  <span className="check"><CheckSvg stroke="#0056b8" /></span>
                  <span>Structured docs that <b>map directly to your codebase</b></span>
                </li>
                <li>
                  <span className="check"><CheckSvg stroke="#0056b8" /></span>
                  <span><b>Download all MD files</b> in one shot for full-project setup</span>
                </li>
              </ul>
              <div className="side-tool">
                your one-click export <span className="keybtn">Copy VS Code MD</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5 · USE CASES ─── */}
        <section id="use-cases" className="reveal">
          <div className="sec-head"><span className="kicker">Use cases</span></div>
          <h2>Where it earns its keep</h2>
          <p className="sec-sub">
            Four situations DesignBridge was built for — each ends with something pasted, not
            something explained.
          </p>

          <div className="cases">
            <div className="case">
              <div className="case-top">
                <div className="case-ico" style={{ background: 'var(--blue-50)' }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="2.6" stroke="#0056b8" strokeWidth="1.5" />
                    <path d="M3 13.5c.7-2.6 2.7-4 5-4s4.3 1.4 5 4" stroke="#0056b8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="case-who">Designer</span>
              </div>
              <h3>Build a component on canvas without rebuilding it from memory</h3>
              <p>
                Configure the Button exactly as your project needs it — sizes, critical variants,
                icon-only — then copy the Figma prompt and paste it into your AI assistant connected
                to Figma. The component lands on your canvas with the right variants, states, and
                token values already applied.
              </p>
              <div className="result">→ Minutes of setup, not an afternoon of duplicating frames</div>
            </div>

            <div className="case">
              <div className="case-top">
                <div className="case-ico" style={{ background: 'var(--orange-50)' }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M5.5 5 2.5 8l3 3M10.5 5l3 3-3 3" stroke="#c65910" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="case-who">Developer</span>
              </div>
              <h3>Give your AI editor the spec instead of describing it</h3>
              <p>
                Copy the VS Code MD for a component and drop it into your editor's AI context —
                Copilot, Claude, Cursor. The model now knows the exact variants, token references,
                and dimensions, so the code it writes matches the system instead of inventing its own.
              </p>
              <div className="result">→ Generated code that passes design review the first time</div>
            </div>

            <div className="case">
              <div className="case-top">
                <div className="case-ico" style={{ background: 'var(--green-soft)' }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="5" height="5" rx="1.2" stroke="#127a45" strokeWidth="1.4" />
                    <rect x="9" y="2" width="5" height="5" rx="1.2" stroke="#127a45" strokeWidth="1.4" />
                    <rect x="2" y="9" width="5" height="5" rx="1.2" stroke="#127a45" strokeWidth="1.4" />
                    <rect x="9" y="9" width="5" height="5" rx="1.2" stroke="#127a45" strokeWidth="1.4" />
                  </svg>
                </div>
                <span className="case-who">Team lead</span>
              </div>
              <h3>Seed an entire project's AI context in one download</h3>
              <p>
                Use <b>Download All MD Files</b> to export the complete system — every style set and
                component spec — and commit it to the repo. From day one, every prompt anyone writes
                is grounded in the same documentation.
              </p>
              <div className="result">→ One shared context for the whole team, kept in version control</div>
            </div>

            <div className="case">
              <div className="case-top">
                <div className="case-ico" style={{ background: '#f3edff' }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.8a6.2 6.2 0 1 0 0 12.4c1 0 1.4-.7 1-1.4-.5-.9-.1-2 1-2h1.7c1.4 0 2.5-1.1 2.5-2.5C14.2 4.5 11.4 1.8 8 1.8Z" stroke="#7c3aed" strokeWidth="1.4" />
                    <circle cx="5.2" cy="6" r=".9" fill="#7c3aed" />
                    <circle cx="8"   cy="4.6" r=".9" fill="#7c3aed" />
                    <circle cx="10.8" cy="6" r=".9" fill="#7c3aed" />
                  </svg>
                </div>
                <span className="case-who">Brand / theming</span>
              </div>
              <h3>Re-anchor the system to a new brand before exporting</h3>
              <p>
                Point <code style={{ fontFamily: "'DM Sans', monospace", fontSize: 12 }}>Primary 500</code> at
                a new hex, adjust the typography tiers, tune spacing — the whole scale regenerates around
                your anchors. Every prompt and MD you copy afterwards carries the new brand automatically.
              </p>
              <div className="result">→ A re-themed system without touching fifty files</div>
            </div>
          </div>
        </section>

        {/* ─── 6 · CUSTOMISE SCOPE ─── */}
        <section id="customise" className="reveal">
          <div className="sec-head"><span className="kicker">Customisation scope</span></div>
          <h2>What the Customise panel controls</h2>
          <p className="sec-sub">
            Two levels of control: system-wide anchors in the Style Guide, and per-component options
            on every component page. Exports always reflect the current state of the panel.
          </p>

          <div className="scope">
            <div className="scope-card">
              <div className="scope-head">
                <h3>Style Guide anchors</h3>
                <span className="where">System-wide</span>
              </div>
              <div className="scope-row">
                <div className="scope-glyph">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="6"  cy="6"  r="3.5" fill="#0056b8" opacity=".85" />
                    <circle cx="10" cy="10" r="3.5" fill="#c65910" opacity=".75" />
                  </svg>
                </div>
                <div>
                  <b>Color anchors</b>
                  <span>Set <code>Primary 500</code>, <code>Secondary 500</code>, and <code>Neutral 500</code> — the 50–900 scales regenerate around them.</span>
                </div>
              </div>
              <div className="scope-row">
                <div className="scope-glyph">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 12.5 6.5 3.5h.8l3.5 9M4.3 9.5h5.2" stroke="#51607a" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M13 7v5.5" stroke="#51607a" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <b>Typography tiers</b>
                  <span>Enable or disable tiers from <code>text-2xs</code> to <code>text-2xl</code> and set the pixel value for each.</span>
                </div>
              </div>
              <div className="scope-row">
                <div className="scope-glyph">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2.5" y="2.5" width="11" height="11" rx="3" stroke="#51607a" strokeWidth="1.4" />
                    <path d="M2.5 8h11M8 2.5v11" stroke="#51607a" strokeWidth="1.2" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div>
                  <b>Spacing &amp; radius scale</b>
                  <span>Tune the step values the components reference for padding, gaps, and corner rounding.</span>
                </div>
              </div>
            </div>

            <div className="scope-card">
              <div className="scope-head">
                <h3>Component options</h3>
                <span className="where">Per page</span>
              </div>
              <div className="scope-row">
                <div className="scope-glyph">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="4.5" width="12" height="7" rx="3.5" fill="#0056b8" />
                    <circle cx="10.5" cy="8" r="2.4" fill="#fff" />
                  </svg>
                </div>
                <div>
                  <b>Variant toggles</b>
                  <span>Include only what your project ships — e.g. keep Primary and Critical buttons, drop Icon Only.</span>
                </div>
              </div>
              <div className="scope-row">
                <div className="scope-glyph">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2.5 11.5h11M5 11.5V8m3 3.5V5.5m3 6V7" stroke="#51607a" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <b>Sizes &amp; dimensions</b>
                  <span>Switch size sets on or off and set exact heights, paddings, and text sizes in pixels.</span>
                </div>
              </div>
              <div className="scope-row">
                <div className="scope-glyph">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="5.5" stroke="#51607a" strokeWidth="1.4" />
                    <path d="M8 2.5A5.5 5.5 0 0 1 8 13.5" fill="#51607a" opacity=".25" />
                  </svg>
                </div>
                <div>
                  <b>Appearance</b>
                  <span>Corner radius, padding, text size, and prefixes — per component, with sensible defaults you can reset anytime.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7 · OUTPUTS ─── */}
        <section id="outputs" className="reveal">
          <div className="sec-head"><span className="kicker">Outputs</span></div>
          <h2>Three exports, one spec</h2>
          <p className="sec-sub">
            Every page offers the same three actions. They all read from the live state of the
            Customise panel — what you see is what you copy.
          </p>

          <div className="outs">
            <div className="out">
              <div>
                <span className="out-btn figma">
                  <img src={figmaIcon} alt="" aria-hidden="true" width={11} height={11} />
                  Copy Figma Prompt
                </span>
                <div className="out-for">For designers</div>
              </div>
              <div className="desc">
                <h3>A structured, AI-ready component brief</h3>
                <p>
                  Component name, enabled variants, states, token values, and dimensions — formatted
                  so an AI assistant connected to Figma can build it on canvas accurately.
                </p>
              </div>
              <div className="dest">
                <b>Paste into</b>
                An AI assistant connected to Figma via MCP — Claude, Cursor, or similar.
              </div>
            </div>

            <div className="out">
              <div>
                <span className="out-btn vscode">
                  <img src={vscodeButtonIcon} alt="" aria-hidden="true" width={11} height={11} />
                  Copy VS Code MD
                </span>
                <div className="out-for">For developers</div>
              </div>
              <div className="desc">
                <h3>A markdown spec your editor understands</h3>
                <p>
                  Full component documentation — props, variant matrix, token references, usage
                  notes — ready to drop into a repo or feed to an AI coding assistant as context.
                </p>
              </div>
              <div className="dest">
                <b>Paste into</b>
                Your editor's AI context, a <span style={{ fontFamily: "'DM Sans', monospace", fontSize: 11 }}>/docs</span> folder, or a PR description.
              </div>
            </div>

            <div className="out">
              <div>
                <span className="out-btn all">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8m0 0L5 7m3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download All MD Files
                </span>
                <div className="out-for">For the whole project</div>
              </div>
              <div className="desc">
                <h3>The complete system in one archive</h3>
                <p>
                  Every style set and component spec as individual markdown files — the fastest way
                  to seed a new project, a knowledge base, or a team-wide AI workflow.
                </p>
              </div>
              <div className="dest">
                <b>Drop into</b>
                Your repository, so the documentation ships and versions with the code.
              </div>
            </div>
          </div>

        </section>



      </div>
    </div>
  );
}
