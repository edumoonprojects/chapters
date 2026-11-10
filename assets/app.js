// EduMoon Chapters: shared header, footer and page rendering. Data comes from data.js.
(function () {
  const S = window.SITE, C = window.CHAPTERS, L = window.LEADS;
  const EV = window.EVENTS || [], MO = window.MOMENTS || [], ME = window.MEMBERS || [], CL = window.CLUBS || [];
  const UP = window.UPCOMING || [], FA = window.FAME || [], PR = window.PRESS || [], MC = window.MORE_COLLEGES || [], PA = window.PARTNERS || [], FQ = window.FAQ || [];
  const PTS = window.POINTS || {}, LBC = window.LEADERBOARD || {}, AC = window.ACTIVITY || [];
  const page = document.body.dataset.page;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ext = h => h.startsWith("http") ? ' target="_blank" rel="noopener"' : "";

  // Line icons (no emoji)
  const P = {
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    id: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2.5"/><path d="M14 10h5M14 14h3"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    paper: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>',
    badge: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
    game: '<line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="13" r="1"/><circle cx="18" cy="11" r="1"/><rect x="2" y="6" width="20" height="12" rx="2"/>',
    map: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3" fill="currentColor"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    sparkle: '<path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" fill="currentColor"/>'
  };
  const ic = n => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
  const star = cls => `<svg class="shape ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.8 8.2L23 12l-8.2 2.8L12 23l-2.8-8.2L1 12l8.2-2.8z" fill="currentColor" stroke="#1B1530" stroke-width="1.2"/></svg>`;

  const chapterOf = id => C.find(c => c.id === id);
  const leadsOf = id => L.filter(l => l.chapter === id);
  const initials = n => n.replace(/[^A-Za-z ]/g, " ").split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const avatar = (l, size) => l.photo
    ? `<span class="av" style="width:${size}px;height:${size}px"><img src="photos/${esc(l.photo)}" alt="${esc(l.name)}" loading="lazy"></span>`
    : `<span class="av" style="width:${size}px;height:${size}px;font-size:${Math.round(size / 2.8)}px" role="img" aria-label="${esc(l.name)}">${esc(initials(l.name))}</span>`;
  const courseLine = l => [l.course, l.year].filter(Boolean).join(" · ");

  // ---------- Header and footer ----------
  const navItems = [
    ["index.html", "Home", "home"], ["chapters.html", "Chapters", "chapters"], ["clubs.html", "Clubs", "clubs"], ["index.html#leaderboard", "Leaderboard", "leaderboard"],
    [S.gamesUrl, "Games", "games"], ["verify.html", "Verify ID", "verify"], ["lead.html", "Become a Lead", "lead"]
  ];
  $("#top").innerHTML = `<div class="wrap">
    <a class="logo" href="index.html"><img src="icon.png" alt=""><span><small>EduMoon</small><b>Chapters</b></span></a>
    <button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false" aria-controls="nav">${ic("menu")}</button>
    <nav class="nav" id="nav">${navItems.map(([h, t, k]) =>
      `<a href="${h}"${k === "lead" ? ' class="cta"' : ""}${k === page || (page === "chapter" && k === "chapters") ? ' aria-current="page"' : ""}${ext(h)}>${t}</a>`).join("")}</nav>
  </div>`;
  $("#menuBtn").addEventListener("click", () => {
    const open = $("#nav").classList.toggle("open");
    $("#menuBtn").setAttribute("aria-expanded", open);
  });
  $("#nav").addEventListener("click", e => { if (e.target.closest("a")) { $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", false); } });

  $("#foot").innerHTML = `<div class="wrap">
    <p class="brand">Learn. Connect. <span>Grow.</span></p>
    <div class="foot-links">
      <a href="${S.websiteUrl}" target="_blank" rel="noopener">theedumoon.com</a>
      <a href="${S.instagramUrl}" target="_blank" rel="noopener">Instagram</a>
      <a href="${S.youtubeUrl}" target="_blank" rel="noopener">YouTube</a>
      <a href="${S.communityUrl}" target="_blank" rel="noopener">WhatsApp community</a>
      <a href="${S.gamesUrl}" target="_blank" rel="noopener">Game Zone</a>
    </div>
    <small>EduMoon Chapters are student-run communities. They are not official bodies of the colleges named on this site. College names and logos belong to their institutions and are shown only to say where our Student Leads study.</small>
  </div>`;

  // ---------- Shared blocks ----------
  const chapterCard = c => {
    const ls = leadsOf(c.id);
    return `<a class="chapter" href="chapter.html?c=${c.id}">
      <img src="logos/${esc(c.logo)}" alt="${esc(c.name)} logo" loading="lazy">
      <div class="info">
        <p class="code">EM-${c.cityCode}-${c.short}</p>
        <h4>${esc(c.name)}</h4>
        <div class="faces">${ls.slice(0, 4).map(l => avatar(l, 32)).join("")}<span class="count">${ls.length} Student ${ls.length === 1 ? "Lead" : "Leads"}</span></div>
      </div>
    </a>`;
  };
  const chaptersByCity = () => [...new Set(C.map(c => c.city))].map(city => {
    const list = C.filter(c => c.city === city);
    return `<div class="city"><h3>${ic("map")} ${esc(city)} <small>${list.length} ${list.length === 1 ? "chapter" : "chapters"}</small></h3>
      <div class="chapters">${list.map(chapterCard).join("")}</div></div>`;
  }).join("");
  const logoStrip = () => {
    // One tile per logo (AU covers two chapters), linking to the first chapter with that logo.
    const seen = new Map();
    for (const c of C) if (!seen.has(c.logo)) seen.set(c.logo, c);
    const label = c => c.logo === "andhra-university.png" ? "Andhra University" : c.name.replace(/ x NIAT$/, "").replace(/, .*$/, "");
    return `<div class="logos">${[...seen.values()].map(c =>
      `<a class="logo-tile" href="chapter.html?c=${c.id}"><img src="logos/${esc(c.logo)}" alt="${esc(label(c))} logo" loading="lazy"><span>${esc(label(c))}</span></a>`).join("")}</div>`;
  };
  const BENEFITS = [
    ["flag", "Lead your campus", "Run games, events and polls in your college with EduMoon’s ready-made kits."],
    ["users", "Build your network", "Meet Student Leads from 20+ colleges, seniors, founders and the EduMoon team."],
    ["book", "Learn by doing", "Real experience in leadership, events and communication, not just theory."],
    ["id", "Your official EduMoon ID", "A verified ID and profile on this site to show on your resume and LinkedIn."],
    ["award", "Certificates", "A certificate for every event you organise."],
    ["gift", "Goodies and rewards", "Climb the leaderboard and get rewarded as a top performer."],
    ["zap", "First access", "EduMoon opportunities, workshops and events before everyone else."],
    ["linkedin", "LinkedIn recommendations", "Strong performers can earn a recommendation from the EduMoon founder."],
    ["paper", "Featured in EduMoon Magazine", "Top Student Leads and their events get featured in our monthly magazine."]
  ];
  const benefitsGrid = (list = BENEFITS) => `<div class="benefits">${list.map(([i, t, d]) =>
    `<div class="benefit"><span class="bi">${ic(i)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}</div>`;
  const pathway = () => `<div class="path">
    <div class="step"><span class="num">1</span><h3>Student Lead</h3><ul><li>Run weekly games, events and polls in your college</li><li>Get your EduMoon ID and profile</li><li>Certificates for every event</li></ul></div>
    <div class="step"><span class="num">2</span><h3>Chapter Lead</h3><ul><li>For top Student Leads</li><li>Lead the whole chapter at your college</li><li>Build your team and work directly with EduMoon</li></ul></div>
    <div class="step"><span class="num">3</span><h3>EduMoon Fellow</h3><ul><li>After 5 to 6 months as a strong Chapter Lead</li><li>Project-based stipend work with the EduMoon team</li><li>Access to job opportunities after your final year</li></ul></div>
  </div>`;
  const applyBand = () => `<div class="band">
    <div><span class="sticker y live">Applications are open</span>
      <h2>Want to be more than just a student?</h2>
      <p>Become an EduMoon Student Lead. Network, lead, learn and create impact on your campus.</p></div>
    <div class="actions"><a class="btn yellow" href="${S.applyUrl}" target="_blank" rel="noopener">Apply now ${ic("arrow")}</a><a class="btn ghost" href="lead.html">See benefits</a></div>
  </div>`;
  const verifyBox = (prefill = "") => `<div class="verify">
    <form id="verifyForm" autocomplete="off"><input id="verifyInput" placeholder="e.g. EM-26-VZG-AUCE-001" aria-label="EduMoon ID" value="${esc(prefill)}" maxlength="30"><button class="btn" type="submit">Verify</button></form>
    <div id="verifyResult" aria-live="polite"></div>
  </div>`;
  const CLUBNAME = Object.fromEntries(CL.map(c => [c.code, c.name]));
  const yearLabel = y => `20${y}-${String(y + 1).padStart(2, "0")}`;
  function wireVerify() {
    const form = $("#verifyForm"); if (!form) return;
    const run = () => {
      const q = $("#verifyInput").value.trim().toUpperCase().replace(/\s+/g, "");
      const out = $("#verifyResult");
      if (!q) { out.innerHTML = ""; return; }
      const m = q.match(/^EM-(\d{2})-([A-Z]+)-([A-Z]+)(?:-([A-Z]{2}))?-(\d{3})$/);
      const lead = L.find(x => x.id === q), member = ME.find(x => x.id === q);
      if (!m || (!lead && !member)) {
        out.innerHTML = `<div class="result no">${ic("x")}<div><b>No EduMoon ID found: ${esc(q)}</b><p class="muted">Check the ID and try again. Student Lead IDs look like EM-26-VZG-AUCE-001. Club member IDs look like EM-26-VZG-AUCE-CD-001.</p></div></div>`;
        return;
      }
      const yr = +m[1], current = yr === S.year;
      const c = lead ? chapterOf(lead.chapter) : C.find(x => x.cityCode === m[2] && x.short === m[3]);
      const role = lead ? lead.role : `Member · ${CLUBNAME[m[4]] || "Club"}${m[4] ? " Club" : ""}`.replace("Club Club", "Club");
      const person = lead || { name: member.name, photo: "" };
      const status = current ? `${ic("badge")} Verified EduMoon ${esc(role)} · ${yearLabel(yr)}` : `${ic("badge")} Was an EduMoon ${esc(role)} in ${yearLabel(yr)}`;
      out.innerHTML = `<div class="result ok${current ? "" : " past"}">${avatar(person, 76)}<div>
        <span class="tick">${status}</span>
        <h3 style="font-size:24px;margin-top:4px">${esc(person.name)}</h3>
        <p class="muted">${c ? esc(c.name) : ""}${lead && courseLine(lead) ? " · " + esc(courseLine(lead)) : ""}</p>
        <p class="muted" style="font-size:14px">ID ${esc(q)}${c ? ` · <a href="chapter.html?c=${c.id}">View chapter</a>` : ""}</p></div></div>`;
    };
    form.addEventListener("submit", e => {
      e.preventDefault(); run();
      const q = $("#verifyInput").value.trim().toUpperCase();
      if (page === "verify") history.replaceState(null, "", q ? "?id=" + encodeURIComponent(q) : location.pathname);
    });
    if ($("#verifyInput").value) run();
  }
  // ---------- Leaderboard ----------
  const ptsOf = x => x.points != null ? x.points : (PTS[x.type] || 0);
  const inMonth = x => !LBC.month || String(x.date).startsWith(LBC.month);
  const monthName = (() => { if (!LBC.month) return "This month"; const [y, m] = LBC.month.split("-"); return new Date(+y, +m - 1, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" }); })();
  const rankList = (items, key) => { const r = []; items.forEach((it, i) => r.push(i && it[key] === items[i - 1][key] ? r[i - 1] : i + 1)); return r; };
  function standings(all) {
    const acts = AC.filter(x => all || inMonth(x));
    const leads = L.map(l => ({ l, pts: acts.filter(x => x.lead === l.id).reduce((s, x) => s + ptsOf(x), 0), events: acts.filter(x => x.lead === l.id && (x.type === "virtual" || x.type === "inperson")).length }));
    const on = leads.filter(x => x.pts > 0).sort((a, b) => b.pts - a.pts || b.events - a.events || a.l.name.localeCompare(b.l.name));
    const chaps = C.map(c => { const ls = leads.filter(x => x.l.chapter === c.id); return { c, pts: ls.reduce((s, x) => s + x.pts, 0), n: ls.filter(x => x.pts > 0).length }; });
    const con = chaps.filter(x => x.pts > 0).sort((a, b) => b.pts - a.pts || a.c.name.localeCompare(b.c.name));
    return { on, off: leads.filter(x => x.pts === 0), con, coff: chaps.filter(x => x.pts === 0) };
  }
  const medal = r => r <= 3 ? ` m${r}` : "";
  function boardHTML(all) {
    const st = standings(all), lr = rankList(st.on, "pts"), cr = rankList(st.con, "pts");
    const podium = (items, ranks, face, label, sub) => {
      if (!items.length) return "";
      const order = [1, 0, 2].filter(i => i < items.length);
      return `<div class="podium">${order.map(i => `<div class="pod p${Math.min(ranks[i], 4)}">
        <div class="pface">${face(items[i])}</div><b class="pname">${label(items[i])}</b><span class="psub">${sub(items[i])}</span>
        <div class="block"><span class="pnum">${ranks[i]}</span><span class="ppts">${items[i].pts} pts</span></div></div>`).join("")}</div>`;
    };
    const short = n => esc(n);
    const leadPod = podium(st.on, lr, x => avatar(x.l, 68), x => short(x.l.name), x => esc((chapterOf(x.l.chapter) || {}).short || ""));
    const chapPod = podium(st.con, cr, x => `<img class="clogo big" src="logos/${esc(x.c.logo)}" alt="">`, x => esc(x.c.short), x => esc(x.c.city));
    const leadRows = st.on.length > 3 ? st.on.map((x, i) => { if (i < 3) return ""; const c = chapterOf(x.l.chapter); return `<li class="row${medal(lr[i])}"><span class="rk">${lr[i]}</span>${avatar(x.l, 44)}<span class="who"><b>${esc(x.l.name)}</b><small>${esc(c ? c.short : "")} · ${x.events ? `${x.events} ${x.events === 1 ? "event" : "events"}` : "WhatsApp active"}</small></span><span class="pt">${x.pts}<small>pts</small></span></li>`; }).join("") : st.on.length ? "" : `<li class="empty">No points yet this month.</li>`;
    const chapRows = st.con.length > 3 ? st.con.map((x, i) => i < 3 ? "" : `<li class="row${medal(cr[i])}"><span class="rk">${cr[i]}</span><img class="clogo" src="logos/${esc(x.c.logo)}" alt=""><span class="who"><b>${esc(x.c.name)}</b><small>${x.n} ${x.n === 1 ? "Student Lead" : "Student Leads"} scoring${cr[i] === 1 ? ` · <em>Leading chapter</em>` : ""}</small></span><span class="pt">${x.pts}<small>pts</small></span></li>`).join("") : st.con.length ? "" : `<li class="empty">No points yet this month.</li>`;
    return `<div class="boards">
      <div class="board"><h3>${ic("trophy")} Student Leads</h3>${leadPod}<ol>${leadRows}</ol>
        ${st.off.length ? `<p class="off"><b>Not on the board yet:</b> ${st.off.map(x => esc(x.l.name)).join(", ")}. Host an event to get started.</p>` : ""}</div>
      <div class="board"><h3>${ic("flag")} Chapters</h3>${chapPod}${cr[0] === 1 && st.con.length && cr[1] !== 1 ? `<p class="leading">${ic("trophy")} Leading chapter: ${esc(st.con[0].c.name)}</p>` : ""}<ol>${chapRows}</ol>
        ${st.coff.length ? `<p class="off"><b>Not on the board yet:</b> ${st.coff.map(x => esc(x.c.short)).join(", ")}.</p>` : ""}</div>
    </div>`;
  }
  const leaderboardSection = () => {
    const recent = AC.filter(x => x.type === "virtual" || x.type === "inperson").sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
    const fmt = d => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    return `<section id="leaderboard" class="tint"><div class="wrap">
      <div class="sec-head"><span class="sticker y">${ic("trophy")} Leaderboard</span><h2>Who’s leading ${esc(monthName)}</h2><p>Updated every week. Last updated ${esc(LBC.updated || "")}. Points start fresh every month.</p></div>
      <div class="lb-tabs" role="tablist"><button type="button" role="tab" aria-selected="true" data-all="0">${esc(monthName)}</button><button type="button" role="tab" aria-selected="false" data-all="1">All time</button></div>
      <div id="lbBody">${boardHTML(false)}</div>
      <div class="lb-foot">
        <div class="earn"><h3>How to earn points</h3><ul>
          <li><b>${PTS.virtual}</b><span>Host a virtual event</span></li>
          <li><b>${PTS.inperson}</b><span>Host an in-person event</span></li>
          <li><b>${PTS.whatsapp}</b><span>Active in WhatsApp club groups, every week</span></li>
          <li><b>+${PTS.streak}</b><span>Bonus for 4 weeks in a row with an event</span></li></ul></div>
        <div class="recent"><h3>Latest events by Student Leads</h3><ul>${recent.map(x => { const l = L.find(y => y.id === x.lead); return `<li><span class="d">${fmt(x.date)}</span><span><b>${esc(x.title)}</b><small>${esc(x.club || "")}${l ? " · " + esc(l.name) : ""}</small></span></li>`; }).join("")}</ul></div>
      </div>
    </div></section>`;
  };
  function wireBoard() {
    document.querySelectorAll(".lb-tabs button").forEach(b => b.addEventListener("click", () => {
      document.querySelectorAll(".lb-tabs button").forEach(x => x.setAttribute("aria-selected", x === b));
      $("#lbBody").innerHTML = boardHTML(b.dataset.all === "1");
    }));
  }
  const brand = (f, n) => `<span class="blogo"><img src="brands/${f}" alt="${n}" loading="lazy"></span>`;
  const clubTiles = () => `<div class="clubs">${CL.map(c => `<a class="club" href="clubs.html#${c.code.toLowerCase()}">${ic(c.icon)}<h3>${esc(c.name)}</h3><p>${esc(c.focus)}</p><span class="seats">${c.seats} seats per chapter</span></a>`).join("")}</div>`;
  const pageHead = (sticker, title, lead, cls = "") => `<section class="phead"><div class="wrap" style="position:relative">
      <div class="shape s1"></div>
      <span class="sticker ${cls}">${sticker}</span>
      <h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}
    </div></section>`;

  // ---------- Pages ----------
  const main = $("#main");
  const nLeads = L.length, nChapters = C.length;

  if (page === "home") {
    const video = S.demoVideo
      ? `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${esc(S.demoVideo)}" title="EduMoon games demo" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`
      : `<div class="video-frame"><div class="soon"><span class="play">${ic("play")}</span><b>Demo video coming soon</b><span>See how a game runs in a real classroom.</span></div></div>`;
    const words = ["Network", "Lead", "Learn", "Create impact", "Make friends", "Play games", "Build things"];
    const tick = words.map(w => `<span>${w}</span>`).join("");
    const pola = (cls, m, cap) => `<figure class="pola ${cls}"><img src="moments/${m}" alt="${esc(cap)}"><figcaption>${esc(cap)}</figcaption></figure>`;

    main.innerHTML = `
      <section class="hero"><div class="wrap">
        <div>
          <span class="sticker y">Join our biggest student community</span>
          <h1>Your campus. <span class="c1">Your community.</span> <span class="mark">Your chance to lead.</span></h1>
          <p class="lead">Join <b>${S.students} students</b> across <b>${S.colleges} colleges</b> building skills, friendships and futures with EduMoon.</p>
          <div class="btns"><a class="btn pink" href="lead.html">Become a Student Lead ${ic("arrow")}</a><a class="btn ghost" href="${S.communityUrl}" target="_blank" rel="noopener">Join the community</a></div>
        </div>
        <div class="collage">
          <div class="shape s1"></div><div class="shape s2"></div>${star("s3")}
          ${pola("a", "innovation-s3.jpg", "Innovation Challenge")}
          ${pola("b", "ganesh-girls.jpg", "Ganesh idol making")}
          ${pola("c", "robotics-ahub.jpg", "Robotics Workshop")}
        </div>
      </div></section>

      <div class="tick-wrap"><div class="ticker" aria-hidden="true"><div class="row">${tick}${tick}</div></div></div>

      <section><div class="wrap">
        <div class="stats">
          <div class="stat"><b>${S.students}</b><span>Students</span></div>
          <div class="stat"><b>${S.colleges}</b><span>Colleges</span></div>
          <div class="stat"><b>${nChapters}</b><span>Chapters</span></div>
          <div class="stat"><b>${S.games}</b><span>Learning games</span></div>
        </div>
        <div class="trust">
          <div class="trust-card"><h3>Incubated at</h3><div class="brands">${brand("rtih.png", "RTIH, Ratan Tata Innovation Hub")}${brand("ahub.png", "a-hub")}</div></div>
          <div class="trust-card"><h3>Backed by</h3><div class="brands">${brand("stpi.png", "STPI")}${brand("pontaq.png", "Pontaq Ventures")}</div></div>
          <div class="trust-card"><h3>Recognised by</h3><div class="brands">${brand("startup-india.png", "Startup India")}${brand("msme.png", "MSME")}${brand("iso.png", "ISO 9001:2015")}</div><p class="tie">${ic("trophy")} Top 90 Startups globally, TiE 2022</p></div>
        </div>
      </div></section>

      <section class="tint" id="news"><div class="wrap">
        <div class="sec-head"><span class="sticker">In the news</span><h2>EduMoon in the papers</h2><p>Tap a story to read the full article.</p></div>
        <div class="press">${PR.map(p => `<a class="press-card" href="${esc(p.url)}" target="_blank" rel="noopener">
          <span class="plogo"><img src="brands/${esc(p.logo)}" alt="${esc(p.paper)}" loading="lazy"></span>
          <span class="pyear">${esc(p.paper)} · ${esc(p.year)}</span>
          <h3>${esc(p.title)}</h3>
          <span class="read">Read the article ${ic("arrow")}</span></a>`).join("")}</div>
      </div></section>

      <section><div class="wrap">
        <div class="sec-head"><span class="sticker">Where we are</span><h2>Our Student Leads come from these colleges</h2></div>
        ${logoStrip()}
        <h3 class="sub-head">And students from many more colleges</h3>
        <div class="logos small">${MC.map(c => `<div class="logo-tile"><img src="logos/${esc(c.logo)}" alt="${esc(c.name)} logo" loading="lazy"><span>${esc(c.name)}</span></div>`).join("")}</div>
      </div></section>

      <section class="tint"><div class="wrap">
        <div class="sec-head"><span class="sticker y">What’s next</span><h2>Happening next</h2><p>Free for every student. Join the community to get the link.</p></div>
        <div class="upcoming">${UP.map(u => `<div class="up"><span class="when">${ic("calendar")} ${esc(u.when)}</span><h3>${esc(u.title)}</h3><p class="where">${esc(u.where)}</p><p>${esc(u.text)}</p></div>`).join("")}</div>
        <div class="btns"><a class="btn" href="${S.communityUrl}" target="_blank" rel="noopener">Join the community ${ic("arrow")}</a></div>
      </div></section>

      <section id="highlights"><div class="wrap">
        <div class="sec-head"><span class="sticker p">Recent highlights</span><h2>Things we’ve been up to</h2><p>Challenges, workshops, meet-ups, festivals and orientations. Here are a few from the last few months.</p></div>
        <div class="events">${EV.map(e => `<article class="event">
          <div class="ph"><img src="moments/${esc(e.photo)}" alt="${esc(e.title)}" loading="lazy"><span class="sticker y">${esc(e.tag)}</span></div>
          <div class="body"><span class="when">${esc(e.when)}</span><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div></article>`).join("")}</div>
        <div class="more"><p>This is just a glimpse. See everything we do on Instagram.</p><a class="btn" href="${S.instagramUrl}" target="_blank" rel="noopener">Follow @edumoon_global ${ic("arrow")}</a></div>
      </div></section>

      ${leaderboardSection()}

      <section><div class="wrap">
        <div class="sec-head center"><span class="sticker t">Moments</span><h2>Real students. Real memories.</h2></div>
        <div class="moments">${MO.map((m, i) => `<button class="moment" type="button" data-i="${i}"><img src="moments/${esc(m.photo)}" alt="${esc(m.caption)}" loading="lazy"><span>${esc(m.caption)}</span></button>`).join("")}</div>
      </div></section>

      <section><div class="wrap">
        <div class="sec-head"><span class="sticker">Our clubs</span><h2>Find your people</h2><p>Five clubs, each with one clear focus. Join free in the global community, or get a seat in your college chapter.</p></div>
        ${clubTiles()}
        <div class="btns"><a class="btn" href="clubs.html">See all clubs ${ic("arrow")}</a></div>
      </div></section>

      <section id="chapters" class="tint"><div class="wrap">
        <div class="sec-head"><span class="sticker o">Chapters</span><h2>Meet the chapters</h2><p>Every chapter is led by students, for students. Tap a college to meet its Student Leads.</p></div>
        ${chaptersByCity()}
      </div></section>

      <section><div class="wrap">
        <div class="sec-head"><span class="sticker o">Hall of fame</span><h2>Students who made it count</h2></div>
        <div class="fame">${FA.map(f => `<article class="fame-card"><img src="moments/${esc(f.photo)}" alt="${esc(f.title)}" loading="lazy"><div class="fbody">
          <span class="sticker y">${ic("trophy")} Winners</span><h3>${esc(f.title)}</h3><p class="muted">${esc(f.text)}</p>
          ${f.people.length ? `<ul>${f.people.map(p => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}</div></article>`).join("")}</div>
      </div></section>

      <section class="tint"><div class="wrap video">
        ${video}
        <div>
          <span class="sticker y">Learn while you play</span>
          <h2>${S.games} games that make learning fun</h2>
          <ul class="points">
            <li><span class="dot">${ic("game")}</span><span>Coding, English, career skills, AI and entrepreneurship games</span></li>
            <li><span class="dot">${ic("users")}</span><span>Students play from their phones, in teams or solo</span></li>
            <li><span class="dot">${ic("flag")}</span><span>Student Leads host them in their colleges every week</span></li>
          </ul>
          <a class="btn" href="${S.gamesUrl}" target="_blank" rel="noopener">Explore the Game Zone ${ic("arrow")}</a>
        </div>
      </div></section>

      <section><div class="wrap">
        <div class="sec-head"><span class="sticker p">Why become a Student Lead</span><h2>More than a title</h2></div>
        ${benefitsGrid(BENEFITS.slice(0, 6))}
        <div style="margin-top:40px">${applyBand()}</div>
        <div class="duo">
          <div class="duo-card bring"><span class="sticker">Don’t see your college?</span><h2>Bring EduMoon to your college</h2><p>Start a chapter, lead your campus and bring your whole college into the community.</p><a class="btn pink" href="${S.applyUrl}" target="_blank" rel="noopener">Start a chapter ${ic("arrow")}</a></div>
          <div class="duo-card app"><span class="sticker y">Get the EduMoon app</span><h2>Free previous papers and study materials</h2><p>On Android and iOS. Everything for your exams in one place.</p><a class="btn yellow" href="${S.appUrl}" target="_blank" rel="noopener">Get the app ${ic("phone")}</a></div>
        </div>
      </div></section>

      <section class="tint"><div class="wrap about">
        <div class="story">
          <span class="sticker t">Our story</span>
          <h2 style="font-size:clamp(34px,5vw,56px);margin-top:16px">It started with juniors asking for notes</h2>
          <p>In 2020, during COVID, juniors kept asking for study materials. So we started an Instagram page to share them for free. That page became <b>EduMoon</b>.</p>
          <p>Today EduMoon is a community of <b>${S.students} students</b> across <b>${S.colleges} colleges</b>, with clubs, games, events, challenges and Student Leads running chapters on their own campuses.</p>
          <h3 class="sub-head" style="margin-top:28px">Community partners we’ve worked with</h3>
          <div class="partners">${PA.map(p => `<span>${esc(p)}</span>`).join("")}</div>
        </div>
        <ol class="timeline">
          <li><span class="yr">2020</span><div><h3>A free digital library</h3><p>Study materials and previous papers for students, shared on Instagram.</p></div></li>
          <li><span class="yr">2022</span><div><h3>Recognised as a startup</h3><p>Selected in the Top 90 Startups globally at TiE 2022 and incubated at a-hub.</p></div></li>
          <li><span class="yr">2026</span><div><h3>EduMoon Chapters</h3><p>Based at RTIH Visakhapatnam, with student-led chapters, clubs and ${S.games} learning games across colleges.</p></div></li>
        </ol>
      </div></section>

      <section><div class="wrap">
        <div class="sec-head"><span class="sticker p">FAQ</span><h2>Questions students ask</h2></div>
        <div class="faq">${FQ.map(([q, a]) => `<details><summary>${esc(q)}<span class="pm" aria-hidden="true"></span></summary><p>${esc(a)}</p></details>`).join("")}</div>
      </div></section>

      <section class="tint"><div class="wrap">
        <div class="sec-head"><span class="sticker">Verify</span><h2>Verify an EduMoon ID</h2><p>Every Student Lead and club member has a unique EduMoon ID. Type one to check it.</p></div>
        ${verifyBox()}
      </div></section>
      <dialog class="lightbox" id="lb"><button class="close" type="button" aria-label="Close">${ic("x")}</button><img id="lbImg" alt=""><p id="lbCap"></p></dialog>`;
    wireVerify();
    wireBoard();

    const lb = $("#lb");
    document.querySelectorAll(".moment").forEach(b => b.addEventListener("click", () => {
      const m = MO[+b.dataset.i];
      $("#lbImg").src = "moments/" + m.photo; $("#lbImg").alt = m.caption; $("#lbCap").textContent = m.caption;
      if (lb.showModal) lb.showModal();
    }));
    lb.querySelector(".close").addEventListener("click", () => lb.close());
    lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
  }

  if (page === "chapters") {
    main.innerHTML = pageHead("Chapters", `${nChapters} chapters. <span class="mark">${nLeads} Student Leads.</span>`, "Student-led EduMoon communities across colleges. Tap a college to meet its Student Leads.", "o") +
      `<section style="padding-top:10px"><div class="wrap">${chaptersByCity()}<div style="margin-top:50px">${applyBand()}</div></div></section>`;
  }

  if (page === "chapter") {
    const c = chapterOf(new URLSearchParams(location.search).get("c"));
    if (!c) {
      main.innerHTML = `<section><div class="wrap"><a class="back" href="chapters.html">${ic("back")} All chapters</a><h1>Chapter not found</h1><p class="muted" style="margin-top:10px">This chapter doesn’t exist yet. Want to start it?</p><p style="margin-top:20px"><a class="btn pink" href="lead.html">Start a chapter</a></p></div></section>`;
    } else {
      document.title = `${c.name} · EduMoon Chapters`;
      const ls = leadsOf(c.id);
      const st = standings(false), cr = rankList(st.con, "pts"), ci = st.con.findIndex(x => x.c.id === c.id);
      const lp = id => (st.on.find(x => x.l.id === id) || { pts: 0 }).pts;
      main.innerHTML = `<section><div class="wrap">
          <a class="back" href="chapters.html">${ic("back")} All chapters</a>
          <div class="chero"><img src="logos/${esc(c.logo)}" alt="${esc(c.name)} logo">
            <div><span class="sticker y">EduMoon Chapter · EM-${c.cityCode}-${c.short}</span><h1>${esc(c.name)}</h1>
              <div class="chips"><span class="chip">${esc(c.city)}</span><span class="chip">${ls.length} Student ${ls.length === 1 ? "Lead" : "Leads"}</span>${ci >= 0 ? `<a class="chip hot" href="index.html#leaderboard">${ic("trophy")} Rank ${cr[ci]} · ${st.con[ci].pts} points in ${esc(monthName)}</a>` : `<a class="chip" href="index.html#leaderboard">Not on the leaderboard yet</a>`}</div></div></div>
        </div></section>
        <section style="padding-top:0"><div class="wrap">
          <div class="sec-head"><h2 style="font-size:clamp(30px,4vw,40px)">Student Leads</h2></div>
          <div class="leads">${ls.map(l => `<article class="lead-card">${avatar(l, 130)}
            <span class="role">${esc(l.role)}</span><h3>${esc(l.name)}</h3>
            ${courseLine(l) ? `<p class="muted">${esc(courseLine(l))}</p>` : ""}
            ${lp(l.id) ? `<span class="lpts">${lp(l.id)} points in ${esc(monthName)}</span>` : ""}
            ${l.note ? `<span class="feat">${ic("trophy")} ${esc(l.note)}</span>` : ""}
            <a class="idtag" href="verify.html?id=${encodeURIComponent(l.id)}" title="Verify this ID">${esc(l.id)}</a></article>`).join("")}</div>
          <div style="margin-top:50px">${applyBand()}</div>
        </div></section>`;
    }
  }

  if (page === "lead") {
    main.innerHTML = `<section class="phead"><div class="wrap" style="position:relative">
        <div class="shape s1"></div>
        <span class="sticker y live">Applications are open</span>
        <h1>Want to be more than <span class="mark">just a student?</span></h1>
        <p class="lead">Become an EduMoon Student Lead. Join ${S.students} students across ${S.colleges} colleges and become the voice of EduMoon on your campus.</p>
        <div class="btns"><a class="btn pink" href="${S.applyUrl}" target="_blank" rel="noopener">Apply now ${ic("arrow")}</a><a class="btn ghost" href="chapters.html">See the chapters</a></div>
      </div></section>
      <div class="tick-wrap" style="margin-top:20px"><div class="ticker" aria-hidden="true"><div class="row">${["Network", "Lead", "Learn", "Create impact", "Certificates", "Goodies", "Your EduMoon ID"].map(w => `<span>${w}</span>`).join("").repeat(2)}</div></div></div>
      <section><div class="wrap">
        <div class="sec-head"><span class="sticker p">Benefits</span><h2>Why become a Student Lead?</h2></div>
        ${benefitsGrid()}
      </div></section>
      <section class="tint"><div class="wrap">
        <div class="sec-head"><span class="sticker t">Your pathway</span><h2>From Student Lead to EduMoon Fellow</h2><p>Grow step by step. Every level unlocks more responsibility and more rewards.</p></div>
        ${pathway()}
      </div></section>
      <section><div class="wrap">
        <div class="sec-head"><span class="sticker o">What you’ll do</span><h2>A week as a Student Lead</h2></div>
        <div class="benefits">
          <div class="benefit"><span class="bi">${ic("game")}</span><h3>Host a game</h3><p>Run one of our ${S.games} learning games for students in your college with your own host code.</p></div>
          <div class="benefit"><span class="bi">${ic("star")}</span><h3>Run a poll</h3><p>Ask your campus a trending question and share the results with EduMoon.</p></div>
          <div class="benefit"><span class="bi">${ic("users")}</span><h3>Grow the community</h3><p>Bring new students into EduMoon and help them find their club.</p></div>
        </div>
        <div style="margin-top:50px">${applyBand()}</div>
      </div></section>`;
  }

  if (page === "clubs") {
    const idParts = [["EM", "EduMoon"], ["26", "Year 2026-27"], ["VZG", "City"], ["AUCE", "College"], ["CD", "Club"], ["001", "Your number"]];
    main.innerHTML = pageHead("Clubs", `Find your club. <span class="mark">Find your people.</span>`, "Every club has one clear focus. Start free in the global community, or get a seat in your college chapter.", "p") +
      `<section style="padding-top:20px"><div class="wrap">
        <div class="ways">
          <div class="way"><span class="sticker t">Free · Open to everyone</span><h2>EduMoon Global Community</h2>
            <ul><li>Coding, English and Career &amp; Skills clubs</li><li>Weekly live sessions and games, online</li><li>No limit and no interview</li></ul>
            <a class="btn" href="${S.communityUrl}" target="_blank" rel="noopener">Join the community ${ic("arrow")}</a></div>
          <div class="way hot"><span class="sticker y">Recruitment opening soon</span><h2>Clubs in your college chapter</h2>
            <ul><li>${CL.reduce((a, c) => a + c.seats, 0)} seats per college, selected by interview</li><li>Your own EduMoon member number</li><li>Members-only campus events</li><li>First access to opportunities</li></ul>
            <p class="stay">Stay tuned. Join the community to hear first.</p></div>
        </div>
      </div></section>
      <section class="tint"><div class="wrap">
        <div class="sec-head"><span class="sticker">The clubs</span><h2>What each club focuses on</h2></div>
        <div class="club-list">${CL.map(c => `<article class="club-card" id="${c.code.toLowerCase()}">
          <div class="chead"><span class="cic">${ic(c.icon)}</span><div><h3>${esc(c.name)}</h3><p class="focus">${esc(c.focus)}</p></div><span class="seat"><b>${c.seats}</b>seats per chapter</span></div>
          <p class="who">${ic("users")} ${esc(c.who)}</p>
          <ul>${c.does.map(d => `<li>${esc(d)}</li>`).join("")}</ul>
          <div class="cfoot"><span class="sticker y">Chapter recruitment opening soon</span>${c.open ? `<a class="btn ghost" href="${S.communityUrl}" target="_blank" rel="noopener">Join free in the community</a>` : `<span class="only">Only in college chapters</span>`}</div>
        </article>`).join("")}</div>
      </div></section>
      <section><div class="wrap">
        <div class="sec-head"><span class="sticker t">Your EduMoon number</span><h2>Every member gets an EduMoon number</h2><p>A unique ID that anyone can verify on this site. It shows your club, your college and the year you were a member.</p></div>
        <div class="idbreak">${idParts.map(([p, l]) => `<div><b>${p}</b><span>${l}</span></div>`).join("")}</div>
        <p class="muted" style="margin-top:16px">Numbers start again from 001 every academic year. <a href="verify.html">Verify an ID</a></p>
        <div style="margin-top:44px">${applyBand()}</div>
      </div></section>`;
  }

  if (page === "verify") {
    const pre = new URLSearchParams(location.search).get("id") || "";
    main.innerHTML = pageHead("Verify", `Verify an <span class="mark">EduMoon ID</span>`, "Every EduMoon Student Lead and club member has a unique ID. Type it below to confirm it’s real.", "t") +
      `<section style="padding-top:10px"><div class="wrap">${verifyBox(pre)}</div></section>`;
    wireVerify();
  }
})();
