// Notebook theme behaviour: mobile menu, publication filters, abstracts,
// the people hypergraph and copy buttons. No dependencies.
(function () {
  'use strict';

  // ---- mobile menu ----
  var menu = document.querySelector('.nb-menu');
  var nav = document.getElementById('nb-nav');
  if (menu && nav) {
    menu.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ---- abstracts ----
  document.querySelectorAll('[data-abs-toggle]').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    panel.hidden = true;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Abstract −' : 'Abstract +';
      panel.hidden = !open;
    });
  });

  // ---- publication filters ----
  var list = document.querySelector('[data-pub-list]');
  if (list) {
    var state = { cat: 'papers', type: 'all', year: 'all', q: '' };
    var rows = Array.prototype.slice.call(list.querySelectorAll('.nb-pub'));
    var heads = Array.prototype.slice.call(list.querySelectorAll('.nb-yearhead'));
    var search = document.querySelector('[data-pub-search]');
    var shown = document.querySelector('[data-pub-shown]');
    var total = document.querySelector('[data-pub-total]');
    var noun = document.querySelector('[data-pub-noun]');
    var empty = document.querySelector('[data-pub-empty]');
    var typeGroup = document.querySelector('[data-type-group]');

    var press = function (sel, attr, value) {
      document.querySelectorAll(sel).forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute(attr) === value ? 'true' : 'false');
      });
    };

    var apply = function () {
      var q = state.q.trim().toLowerCase();
      var visible = 0, inCat = 0;
      rows.forEach(function (r) {
        var ok = r.dataset.cat === state.cat;
        if (ok) inCat++;
        ok = ok && (state.cat !== 'papers' || state.type === 'all' || r.dataset.type === state.type);
        ok = ok && (state.year === 'all' || r.dataset.year === state.year);
        ok = ok && (!q || r.dataset.search.indexOf(q) !== -1);
        r.hidden = !ok;
        if (ok) visible++;
      });
      heads.forEach(function (h) {
        h.hidden = !rows.some(function (r) {
          return !r.hidden && r.dataset.cat === h.dataset.cat && r.dataset.year === h.dataset.year;
        });
      });
      document.querySelectorAll('[data-year-btn]').forEach(function (b) {
        var y = b.getAttribute('data-year-btn');
        b.hidden = y !== 'all' && (b.dataset.cats || '').split(' ').indexOf(state.cat) === -1;
      });
      if (typeGroup) typeGroup.hidden = state.cat !== 'papers';
      press('[data-cat-btn]', 'data-cat-btn', state.cat);
      press('[data-type-btn]', 'data-type-btn', state.type);
      press('[data-year-btn]', 'data-year-btn', state.year);
      if (shown) shown.textContent = visible;
      if (total) total.textContent = inCat;
      if (noun) noun.textContent = state.cat;
      if (empty) empty.hidden = visible !== 0;
    };

    document.querySelectorAll('[data-cat-btn]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.cat = b.getAttribute('data-cat-btn'); state.type = 'all'; state.year = 'all'; apply();
      });
    });
    document.querySelectorAll('[data-type-btn]').forEach(function (b) {
      b.addEventListener('click', function () { state.type = b.getAttribute('data-type-btn'); apply(); });
    });
    document.querySelectorAll('[data-year-btn]').forEach(function (b) {
      b.addEventListener('click', function () { state.year = b.getAttribute('data-year-btn'); apply(); });
    });
    if (search) search.addEventListener('input', function () { state.q = search.value; apply(); });
    document.querySelectorAll('[data-pub-clear]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.type = 'all'; state.year = 'all'; state.q = '';
        if (search) search.value = '';
        apply();
      });
    });
    apply();
  }

  // ---- people hypergraph ----
  var hg = document.querySelector('.nb-hgfig .hg');
  var dataEl = document.getElementById('hg-data');
  if (hg && dataEl) {
    var data = JSON.parse(dataEl.textContent);
    var nodes = Array.prototype.slice.call(hg.querySelectorAll('.hg-node'));
    var edges = Array.prototype.slice.call(hg.querySelectorAll('.hg-edge'));
    var panelIdle = document.querySelector('[data-hg-idle]');
    var panelSel = document.querySelector('[data-hg-sel]');
    var roleNames = { student: 'Student / mentee', mentor: 'Mentor', collaborator: 'Collaborator' };
    var current = null;

    var clear = function () {
      current = null;
      hg.classList.remove('has-sel');
      nodes.forEach(function (n) { n.classList.remove('is-sel', 'is-nbr'); n.setAttribute('aria-pressed', 'false'); });
      edges.forEach(function (e) { e.classList.remove('is-on'); });
      panelIdle.hidden = false; panelSel.hidden = true;
    };

    var select = function (node) {
      if (current === node) { clear(); return; }
      clear();
      current = node;
      var ws = node.dataset.w.split(' ');
      hg.classList.add('has-sel');
      node.classList.add('is-sel');
      node.setAttribute('aria-pressed', 'true');
      edges.forEach(function (e) { if (ws.indexOf(e.dataset.w) !== -1) e.classList.add('is-on'); });
      nodes.forEach(function (n) {
        if (n !== node && n.dataset.w.split(' ').some(function (w) { return ws.indexOf(w) !== -1; })) n.classList.add('is-nbr');
      });
      var person = data.people.filter(function (p) { return p.name === node.dataset.name; })[0] || {};
      var titles = [];
      var topicOf = {};
      (data.topics || []).forEach(function (t) { topicOf[t.key] = t; });
      ws.forEach(function (w) {
        var work = data.works[+w] || { titles: [], topics: [] };
        work.titles.forEach(function (t, i) { titles.push({ title: t, topic: topicOf[(work.topics || [])[i]] }); });
      });
      panelSel.querySelector('[data-hg-role]').textContent = roleNames[person.role] || '';
      panelSel.querySelector('[data-hg-name]').textContent = node.dataset.name;
      panelSel.querySelector('[data-hg-stats]').textContent =
        titles.length + (titles.length === 1 ? ' joint work' : ' joint works');
      var ol = panelSel.querySelector('[data-hg-works]');
      ol.innerHTML = '';
      titles.forEach(function (t) {
        var li = document.createElement('li');
        li.textContent = t.title;
        if (t.topic) {
          var tag = document.createElement('span');
          var dot = document.createElement('i');
          tag.className = 'nb-topic';
          dot.style.setProperty('--c', t.topic.color);
          tag.appendChild(dot);
          tag.appendChild(document.createTextNode(t.topic.label));
          li.appendChild(tag);
        }
        ol.appendChild(li);
      });
      panelIdle.hidden = true; panelSel.hidden = false;
    };

    nodes.forEach(function (n) {
      n.setAttribute('aria-pressed', 'false');
      n.addEventListener('click', function () { select(n); });
      n.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(n); }
        if (e.key === 'Escape') clear();
      });
    });
    document.querySelectorAll('[data-hg-clear]').forEach(function (b) { b.addEventListener('click', clear); });
  }

  // ---- open a sub-theme (<details>) when the URL points at it, e.g. /projects/#affective-neuroscience ----
  var openTarget = function () {
    var el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el && el.tagName === 'DETAILS' && !el.open) { el.open = true; el.scrollIntoView(); }
  };
  openTarget();
  window.addEventListener('hashchange', openTarget);

  // petals that drift up from the bottom edge of a card (title cards here and on /collaborations/)
  var petals = function (n, dur) {
    var box = document.createElement('div');
    box.className = 'nb-petals';
    box.setAttribute('aria-hidden', 'true');
    for (var k = 0; k < n; k++) {
      var i = document.createElement('i');
      i.style.cssText = '--x: ' + Math.round(6 + 88 * k / Math.max(n - 1, 1)) + '%; --t: ' + dur + 's; --w: -' + (k * 7 % 12) + 's';
      box.appendChild(i);
    }
    return box;
  };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Research themes: arriving at a theme (e.g. from a skill on Home) announces it like a new area ----
  var areaCard = function () {
    var el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!el || reduce || !el.matches('.nb-project, .nb-sub')) return;
    var sub = el.matches('.nb-sub');
    var num = el.querySelector(sub ? '.nb-sub__num' : '.nb-label');
    var title = el.querySelector(sub ? '.nb-sub__title' : 'h2');
    var line = el.querySelector(sub ? '.nb-sub__hint' : '.nb-project__body > p');
    if (!num || !title) return;
    var old = document.querySelector('.nb-area');
    if (old) old.remove();
    var card = document.createElement('div');
    card.className = 'cl-title nb-area';
    card.setAttribute('aria-hidden', 'true');
    card.appendChild(petals(7, 11));
    var add = function (cls, text) { var d = document.createElement('div'); d.className = cls; d.textContent = text; card.appendChild(d); };
    add('cl-title__over', 'Research theme ' + num.textContent.replace(/^§?/, '§'));
    add('cl-title__name', title.textContent);
    if (line) add('cl-title__sub', line.textContent);
    document.body.appendChild(card);
    setTimeout(function () { card.classList.add('is-out'); }, 3400);
    setTimeout(function () { card.remove(); }, 4800);
  };
  areaCard();
  window.addEventListener('hashchange', areaCard);

  // ---- 404: the painted number is erased into petals, one digit at a time ----
  document.querySelectorAll('[data-erase]').forEach(function (num) {
    if (reduce) return;
    var chars = num.textContent.split('');
    num.textContent = '';
    var spans = chars.map(function (c) {
      var s = document.createElement('span');
      s.textContent = c;
      num.appendChild(s);
      return s;
    });
    spans.forEach(function (s, k) {
      setTimeout(function () {
        var r = s.getBoundingClientRect(), o = num.getBoundingClientRect();
        for (var p = 0; p < 16; p++) {
          var i = document.createElement('i');
          i.className = 'nb-erase-petal';
          i.style.cssText = 'left: ' + (r.left - o.left + Math.random() * r.width) + 'px; top: ' + (r.top - o.top + r.height * (0.2 + 0.7 * Math.random())) + 'px; ' +
            '--dx: ' + Math.round(30 + Math.random() * 140) + 'px; --dy: ' + Math.round(-60 - Math.random() * 200) + 'px; --r: ' + Math.round(Math.random() * 540) + 'deg; ' +
            '--t: ' + (1.6 + Math.random() * 1.4).toFixed(2) + 's; animation-delay: ' + (Math.random() * 0.9).toFixed(2) + 's';
          num.appendChild(i);
        }
        s.classList.add('is-gone');
      }, 900 + k * 650);
    });
  });

  // ---- Fig. 1 field notes: play the recorded coda and light up each click as it sounds ----
  document.querySelectorAll('.wb-coda').forEach(function (g) {
    var marks = Array.prototype.slice.call(g.querySelectorAll('.wb-clicks path'));
    var onsets = (g.getAttribute('data-onsets') || '').split(' ').map(Number);
    var audio = null, raf = 0;
    var reset = function () {
      cancelAnimationFrame(raf);
      g.classList.remove('is-playing', 'is-pop');
      marks.forEach(function (m) { m.classList.remove('is-hit'); });
    };
    var tick = function () {
      var t = audio.currentTime, hit = false;
      marks.forEach(function (m, i) {
        var on = t >= onsets[i] && t < onsets[i] + 0.18;
        m.classList.toggle('is-hit', on);
        hit = hit || on;
      });
      g.classList.toggle('is-pop', hit);
      if (audio.paused || audio.ended) reset(); else raf = requestAnimationFrame(tick);
    };
    var play = function () {
      if (!audio) {
        audio = new Audio(g.getAttribute('data-src'));
        audio.addEventListener('ended', reset);
      }
      reset();
      audio.currentTime = 0;
      var started = audio.play();
      var go = function () { g.classList.add('is-playing'); raf = requestAnimationFrame(tick); };
      if (started && started.then) started.then(go).catch(reset); else go();
    };
    g.addEventListener('click', play);
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); }
    });
  });

  // ---- expedition journal (Home §2): ink the notebook in once it scrolls into view; a skill panel (or portrait) picked in the
  //      battle scene is shown enlarged over the dimmed scene, and the readout below names it on a brushstroke ----
  document.querySelectorAll('.nb-exp').forEach(function (t) {
    var book = t.querySelector('.nb-exp__book') || t;
    if (!('IntersectionObserver' in window)) { t.classList.add('is-open'); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { t.classList.add('is-open'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(book);
  });
  document.querySelectorAll('[data-exp-scene]').forEach(function (frame) {
    var svg = frame.querySelector('svg');
    var hots = frame.querySelectorAll('[data-hot]');
    var lens = frame.querySelector('[data-exp-lens]');
    var lensImg = lens.querySelector('image');
    var lensLink = lens.querySelector('[data-exp-lens-link]');
    var clip = frame.querySelector('[data-exp-clip]');
    var ring = frame.querySelector('[data-exp-ring]');
    var vb = svg.viewBox.baseVal;
    var K = parseFloat(getComputedStyle(lens).getPropertyValue('--k')) || 1.4, M = 8;
    var out = frame.parentNode.querySelector('[data-exp-readout]');
    var name = out && out.querySelector('[data-exp-name]');
    var current = null;
    // magnify about the panel's centre, nudged so the enlarged panel stays inside the scene
    var origin = function (lo, hi, size) {
      var o = (lo + hi) / 2;
      o = Math.max(o, (K * hi - size + M) / (K - 1));
      return Math.min(o, (K * lo - M) / (K - 1));
    };
    var pick = function (a) {
      if (a === current) return;
      current = a;
      hots.forEach(function (o) { o.classList.toggle('is-active', o === a); });
      var pts = a.querySelector('polygon').getAttribute('points');
      var xy = pts.trim().split(/[\s,]+/).map(Number);
      var xs = xy.filter(function (v, i) { return i % 2 === 0; }), ys = xy.filter(function (v, i) { return i % 2 === 1; });
      clip.setAttribute('points', pts);
      ring.setAttribute('points', pts);
      lensLink.setAttribute('href', a.getAttribute('href'));
      if (!lensImg.getAttribute('href')) lensImg.setAttribute('href', lensImg.getAttribute('data-href'));
      lens.style.transformOrigin = origin(Math.min.apply(null, xs), Math.max.apply(null, xs), vb.width) + 'px ' +
        origin(Math.min.apply(null, ys), Math.max.apply(null, ys), vb.height) + 'px';
      frame.classList.add('is-aiming');
      if (!out) return;
      name.textContent = a.getAttribute('data-name');
      out.querySelector('[data-exp-desc]').textContent = a.getAttribute('data-desc');
      out.querySelector('[data-exp-dest]').textContent = a.getAttribute('data-dest');
      name.classList.remove('is-new');
      void name.offsetWidth;  // restart the brush animation
      name.classList.add('is-new');
      out.classList.add('is-picked');
    };
    var rest = function () {
      current = null;
      frame.classList.remove('is-aiming');
      if (out) out.classList.remove('is-picked');
    };
    // the enlarged panel sits on top of its neighbours, so keep it picked while the pointer is over it
    svg.addEventListener('mouseover', function (e) {
      var a = e.target.closest('[data-hot]');
      if (a) pick(a);
      else if (!e.target.closest('[data-exp-lens]')) rest();
    });
    svg.addEventListener('mouseleave', rest);
    hots.forEach(function (a) {
      a.addEventListener('focus', function () { pick(a); });
      a.addEventListener('blur', rest);
    });
  });

  // ---- optional table columns ----
  document.querySelectorAll('[data-toggle-col]').forEach(function (b) {
    var table = document.getElementById(b.getAttribute('data-toggle-col'));
    if (!table) return;
    var label = b.textContent.replace(/\s*[+−]$/, '');
    b.addEventListener('click', function () {
      var on = table.classList.toggle('show-opt');
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.textContent = label + (on ? ' −' : ' +');
    });
  });

  // ---- copy buttons ----
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var done = function () { b.textContent = 'Equipped ✓'; setTimeout(function () { b.textContent = 'Copy'; }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });
})();
