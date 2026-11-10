// EduMoon Chapters: shared header, footer and page rendering. Data comes from data.js.
(function () {
  const S = window.SITE, C = window.CHAPTERS, L = window.LEADS;
  const page = document.body.dataset.page;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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
    check: '<path d="M20 6 9 17l-5-5"/>',
    badge: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
    game: '<line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="13" r="1"/><circle cx="18" cy="11" r="1"/><rect x="2" y="6" width="20" height="12" rx="2"/>',
    map: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>'
  };
  const ic = n => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;

  const chapterOf = id => C.find(c => c.id === id);
  const leadsOf = id => L.filter(l => l.chapter === id);
  const initials = n => n.replace(/[^A-Za-z ]/g, " ").split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const avatar = (l, size) => l.photo
    ? `<span class="av" style="width:${size}px;height:${size}px"><img src="photos/${esc(l.photo)}" alt="${esc(l.name)}" loading="lazy"></span>`
    : `<span class="av" style="width:${size}px;height:${size}px;font-size:${Math.round(size / 3)}px" aria-label="${esc(l.name)}">${esc(initials(l.name))}</span>`;
  const courseLine = l => [l.course, l.year].filter(Boolean).join(" · ");

  // ---------- Header and footer ----------
  const navItems = [
    ["index.html", "Home", "home"], ["chapters.html", "Chapters", "chapters"],
    [S.gamesUrl, "Games", "games"], ["verify.html", "Verify ID", "verify"], ["lead.html", "Become a Lead", "lead"]
  ];
  $("#top").innerHTML = `<div class="wrap">
    <a class="logo" href="index.html"><img src="icon.png" alt=""><span><small>EduMoon</small><b>Chapters</b></span></a>
    <button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false" aria-controls="nav">&#9776;</button>
    <nav class="nav" id="nav">${navItems.map(([h, t, k]) =>
      `<a href="${h}"${k === "lead" ? ' class="cta"' : ""}${k === page || (page === "chapter" && k === "chapters") ? ' aria-current="page"' : ""}${h.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`).join("")}</nav>
  </div>`;
  $("#menuBtn").addEventListener("click", () => {
    const open = $("#nav").classList.toggle("open");
    $("#menuBtn").setAttribute("aria-expanded", open);
  });

  $("#foot").innerHTML = `<div class="wrap">
    <div class="foot-links">
      <a href="${S.websiteUrl}" target="_blank" rel="noopener">theedumoon.com</a>
      <a href="${S.instagramUrl}" target="_blank" rel="noopener">Instagram</a>
      <a href="${S.youtubeUrl}" target="_blank" rel="noopener">YouTube</a>
      <a href="${S.communityUrl}" target="_blank" rel="noopener">WhatsApp community</a>
      <a href="${S.gamesUrl}" target="_blank" rel="noopener">Game Zone</a>
    </div>
    <p>EduMoon · Learn. Connect. Grow.</p>
    <small>EduMoon Chapters are student-run communities. They are not official bodies of the colleges named on this site. College names and logos belong to their institutions and are shown only to say where our Student Leads study.</small>
  </div>`;

  // ---------- Shared blocks ----------
  const chapterCard = c => {
    const ls = leadsOf(c.id);
    return `<a class="chapter" href="chapter.html?c=${c.id}">
      <img src="logos/${esc(c.logo)}" alt="${esc(c.name)} logo">
      <div class="info">
        <p class="code">EM-${c.cityCode}-${c.short}</p>
        <h4>${esc(c.name)}</h4>
        <div class="faces">${ls.slice(0, 4).map(l => avatar(l, 30)).join("")}<span class="count">${ls.length} Student ${ls.length === 1 ? "Lead" : "Leads"}</span></div>
      </div>
    </a>`;
  };
  const chaptersByCity = () => {
    const cities = [...new Set(C.map(c => c.city))];
    return cities.map(city => {
      const list = C.filter(c => c.city === city);
      return `<div class="city"><h3>${ic("map")} ${esc(city)} <small>${list.length} ${list.length === 1 ? "chapter" : "chapters"}</small></h3>
        <div class="chapters">${list.map(chapterCard).join("")}</div></div>`;
    }).join("");
  };
  const logoStrip = () => {
    // One tile per logo (AU covers two chapters), linking to the first chapter with that logo.
    const seen = new Map();
    for (const c of C) if (!seen.has(c.logo)) seen.set(c.logo, c);
    const label = c => c.logo === "andhra-university.png" ? "Andhra University" : c.name.replace(/ x NIAT$/, "").replace(/, .*$/, "");
    return `<div class="logos">${[...seen.values()].map(c =>
      `<a class="logo-tile" href="chapter.html?c=${c.id}"><img src="logos/${esc(c.logo)}" alt="${esc(label(c))} logo"><span>${esc(label(c))}</span></a>`).join("")}</div>`;
  };
  const BENEFITS = [
    ["flag", "Lead your campus", "Run games, events and polls in your college with EduMoon’s ready-made kits."],
    ["users", "Build your network", "Meet Student Leads from 20+ colleges, seniors, founders and the EduMoon team."],
    ["book", "Learn by doing", "Real experience in leadership, events and communication, not just theory."],
    ["id", "Your official EduMoon ID", "A verified ID and profile on this site to show on your resume and LinkedIn."],
    ["award", "Certificates", "A certificate for every event you organise."],
    ["gift", "Goodies and rewards", "Rewards for top performers on the weekly leaderboard."],
    ["zap", "First access", "EduMoon opportunities, workshops and events before everyone else."],
    ["linkedin", "LinkedIn recommendations", "Strong performers can earn a recommendation from the EduMoon founder."],
    ["paper", "Featured in EduMoon Magazine", "Top Student Leads and their events get featured in our monthly magazine."]
  ];
  const benefitsGrid = (list = BENEFITS) => `<div class="benefits">${list.map(([i, t, d]) =>
    `<div class="benefit">${ic(i)}<h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}</div>`;
  const pathway = () => `<div class="path">
    <div class="step"><span class="num">1</span><h3>Student Lead</h3><ul><li>Run weekly games, events and polls in your college</li><li>Get your EduMoon ID and profile</li><li>Certificates for every event</li></ul></div>
    <div class="step"><span class="num">2</span><h3>Chapter Lead</h3><ul><li>For top Student Leads</li><li>Lead the whole chapter at your college</li><li>Build your team and work directly with EduMoon</li></ul></div>
    <div class="step"><span class="num">3</span><h3>EduMoon Fellow</h3><ul><li>After 5 to 6 months as a strong Chapter Lead</li><li>Project-based stipend work with the EduMoon team</li><li>Access to job opportunities after your final year</li></ul></div>
  </div>`;
  const applyBand = () => `<div class="band">
    <div><span class="badge-open">Applications are open</span>
      <h2 style="margin-top:12px">Want to be more than just a student?</h2>
      <p>Become an EduMoon Student Lead. Network, lead, learn and create impact on your campus.</p></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="${S.applyUrl}" target="_blank" rel="noopener">Apply now ${ic("arrow")}</a><a class="btn ghost" href="lead.html">See benefits</a></div>
  </div>`;
  const verifyBox = (prefill = "") => `<div class="verify">
    <form id="verifyForm" autocomplete="off"><input id="verifyInput" placeholder="e.g. EM-VZG-AUCE-001" aria-label="EduMoon ID" value="${esc(prefill)}" maxlength="24"><button class="btn" type="submit">Verify</button></form>
    <div id="verifyResult" aria-live="polite"></div>
  </div>`;
  function wireVerify() {
    const form = $("#verifyForm"); if (!form) return;
    const run = () => {
      const q = $("#verifyInput").value.trim().toUpperCase().replace(/\s+/g, "");
      const out = $("#verifyResult");
      if (!q) { out.innerHTML = ""; return; }
      const l = L.find(x => x.id === q);
      if (!l) {
        out.innerHTML = `<div class="result no">${ic("x")}<div><b>No Student Lead found with ID ${esc(q)}</b><p class="muted">Check the ID and try again. IDs look like EM-VZG-AUCE-001.</p></div></div>`;
        return;
      }
      const c = chapterOf(l.chapter);
      out.innerHTML = `<div class="result ok">${avatar(l, 72)}<div>
        <span class="tick">${ic("badge")} Verified EduMoon ${esc(l.role)}</span>
        <h3 style="font-size:22px;margin-top:4px">${esc(l.name)}</h3>
        <p class="muted">${esc(c.name)}${courseLine(l) ? " · " + esc(courseLine(l)) : ""}</p>
        <p class="muted" style="font-size:14px">ID ${esc(l.id)} · <a href="chapter.html?c=${c.id}">View chapter</a></p></div></div>`;
    };
    form.addEventListener("submit", e => {
      e.preventDefault(); run();
      const q = $("#verifyInput").value.trim().toUpperCase();
      if (page === "verify") history.replaceState(null, "", q ? "?id=" + encodeURIComponent(q) : location.pathname);
    });
    if ($("#verifyInput").value) run();
  }

  // ---------- Pages ----------
  const main = $("#main");
  const nLeads = L.length, nChapters = C.length;

  if (page === "home") {
    const video = S.demoVideo
      ? `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${esc(S.demoVideo)}" title="EduMoon games demo" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`
      : `<div class="video-frame"><div class="soon"><span class="play">&#9654;</span><b style="font-family:var(--display);font-size:22px">Demo video coming soon</b><span class="muted">See how a game runs in a real classroom.</span></div></div>`;
    main.innerHTML = `
      <section class="hero"><div class="wrap">
        <span class="eyebrow">EduMoon Chapters</span>
        <h1>Your campus. Your community. <span class="grad">Your chance to lead.</span></h1>
        <p class="lead">Join ${S.students} students across ${S.colleges} colleges building skills, friendships and futures with EduMoon.</p>
        <div class="btns"><a class="btn" href="lead.html">Become a Student Lead ${ic("arrow")}</a><a class="btn ghost" href="${S.communityUrl}" target="_blank" rel="noopener">Join the community</a></div>
        <div class="stats">
          <div class="stat"><b>${S.students}</b><span>Students</span></div>
          <div class="stat"><b>${nChapters}</b><span>Chapters</span></div>
          <div class="stat"><b>${nLeads}</b><span>Student Leads</span></div>
          <div class="stat"><b>${S.games}</b><span>Learning games</span></div>
        </div>
      </div></section>

      <section><div class="wrap">
        <div class="sec-head"><span class="eyebrow">Where we are</span><h2>Our Student Leads come from these colleges</h2></div>
        ${logoStrip()}
      </div></section>

      <section id="chapters"><div class="wrap">
        <div class="sec-head"><span class="eyebrow">Chapters</span><h2>Meet the chapters</h2><p>Every chapter is led by students, for students. Tap a college to meet its Student Leads.</p></div>
        ${chaptersByCity()}
      </div></section>

      <section><div class="wrap video">
        ${video}
        <div>
          <span class="eyebrow">Learn while you play</span>
          <h2 style="font-size:clamp(28px,3.8vw,40px);margin-top:8px">${S.games} games that make learning fun</h2>
          <ul class="points">
            <li>${ic("game")}<span>Coding, English, career skills, AI and entrepreneurship games</span></li>
            <li>${ic("users")}<span>Students play from their phones, in teams or solo</span></li>
            <li>${ic("flag")}<span>Student Leads host them in their colleges every week</span></li>
          </ul>
          <a class="btn ghost" href="${S.gamesUrl}" target="_blank" rel="noopener">Explore the Game Zone ${ic("arrow")}</a>
        </div>
      </div></section>

      <section><div class="wrap">
        <div class="sec-head"><span class="eyebrow">Why become a Student Lead</span><h2>More than a title</h2></div>
        ${benefitsGrid(BENEFITS.slice(0, 6))}
        <div style="margin-top:28px">${applyBand()}</div>
      </div></section>

      <section><div class="wrap">
        <div class="sec-head"><span class="eyebrow">Verify</span><h2>Verify an EduMoon ID</h2><p>Every Student Lead has a unique EduMoon ID. Type one to check it.</p></div>
        ${verifyBox()}
      </div></section>`;
    wireVerify();
  }

  if (page === "chapters") {
    main.innerHTML = `<section class="hero" style="padding-bottom:10px"><div class="wrap">
        <span class="eyebrow">Chapters</span>
        <h1 style="font-size:clamp(38px,6vw,72px)">${nChapters} chapters. ${nLeads} Student Leads.</h1>
        <p class="lead">Student-led EduMoon communities across colleges. Tap a college to meet its Student Leads.</p>
      </div></section>
      <section style="padding-top:10px"><div class="wrap">${chaptersByCity()}<div style="margin-top:40px">${applyBand()}</div></div></section>`;
  }

  if (page === "chapter") {
    const c = chapterOf(new URLSearchParams(location.search).get("c"));
    if (!c) {
      main.innerHTML = `<section><div class="wrap"><a class="back" href="chapters.html">${ic("back")} All chapters</a><h1>Chapter not found</h1><p class="muted" style="margin-top:10px">This chapter doesn’t exist yet. Want to start it?</p><p style="margin-top:20px"><a class="btn" href="lead.html">Start a chapter</a></p></div></section>`;
    } else {
      document.title = `${c.name} · EduMoon Chapters`;
      const ls = leadsOf(c.id);
      main.innerHTML = `<section><div class="wrap">
          <a class="back" href="chapters.html">${ic("back")} All chapters</a>
          <div class="chero"><img src="logos/${esc(c.logo)}" alt="${esc(c.name)} logo">
            <div><span class="eyebrow">EduMoon Chapter · EM-${c.cityCode}-${c.short}</span><h1>${esc(c.name)}</h1>
              <div class="chips"><span class="chip">${esc(c.city)}</span><span class="chip">${ls.length} Student ${ls.length === 1 ? "Lead" : "Leads"}</span></div></div></div>
        </div></section>
        <section style="padding-top:0"><div class="wrap">
          <div class="sec-head"><h2 style="font-size:30px">Student Leads</h2></div>
          <div class="leads">${ls.map(l => `<article class="lead-card">${avatar(l, 132)}
            <span class="role">${esc(l.role)}</span><h3>${esc(l.name)}</h3>
            ${courseLine(l) ? `<p class="muted">${esc(courseLine(l))}</p>` : ""}
            <a class="idtag" href="verify.html?id=${encodeURIComponent(l.id)}" title="Verify this ID">${esc(l.id)}</a></article>`).join("")}</div>
          <div style="margin-top:40px">${applyBand()}</div>
        </div></section>`;
    }
  }

  if (page === "lead") {
    main.innerHTML = `<section class="hero"><div class="wrap">
        <span class="badge-open">Applications are open</span>
        <h1 style="font-size:clamp(38px,6vw,76px)">Want to be more than just a student?</h1>
        <p class="lead">Become an EduMoon Student Lead. Join ${S.students} students across ${S.colleges} colleges and become the voice of EduMoon on your campus.</p>
        <div class="btns"><a class="btn" href="${S.applyUrl}" target="_blank" rel="noopener">Apply now ${ic("arrow")}</a><a class="btn ghost" href="chapters.html">See the chapters</a></div>
      </div></section>
      <section style="padding-top:20px"><div class="wrap">
        <div class="sec-head"><span class="eyebrow">Benefits</span><h2>Why become a Student Lead?</h2></div>
        ${benefitsGrid()}
      </div></section>
      <section><div class="wrap">
        <div class="sec-head"><span class="eyebrow">Your pathway</span><h2>From Student Lead to EduMoon Fellow</h2><p>Grow step by step. Every level unlocks more responsibility and more rewards.</p></div>
        ${pathway()}
      </div></section>
      <section><div class="wrap">
        <div class="sec-head"><span class="eyebrow">What you’ll do</span><h2>A week as a Student Lead</h2></div>
        <div class="benefits">
          <div class="benefit">${ic("game")}<h3>Host a game</h3><p>Run one of our ${S.games} learning games for students in your college with your own host code.</p></div>
          <div class="benefit">${ic("star")}<h3>Run a poll</h3><p>Ask your campus a trending question and share the results with EduMoon.</p></div>
          <div class="benefit">${ic("users")}<h3>Grow the community</h3><p>Bring new students into EduMoon and help them find their club.</p></div>
        </div>
        <div style="margin-top:36px">${applyBand()}</div>
      </div></section>`;
  }

  if (page === "verify") {
    const pre = new URLSearchParams(location.search).get("id") || "";
    main.innerHTML = `<section class="hero" style="padding-bottom:10px"><div class="wrap">
        <span class="eyebrow">Verify</span>
        <h1 style="font-size:clamp(38px,6vw,72px)">Verify an EduMoon ID</h1>
        <p class="lead">Every EduMoon Student Lead has a unique ID. Type it below to confirm it’s real.</p>
      </div></section>
      <section style="padding-top:10px"><div class="wrap">${verifyBox(pre)}</div></section>`;
    wireVerify();
  }
})();
