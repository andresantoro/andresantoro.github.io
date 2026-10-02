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
      ws.forEach(function (w) { (data.works[+w] || { titles: [] }).titles.forEach(function (t) { titles.push(t); }); });
      panelSel.querySelector('[data-hg-role]').textContent = roleNames[person.role] || '';
      panelSel.querySelector('[data-hg-name]').textContent = node.dataset.name;
      panelSel.querySelector('[data-hg-stats]').textContent =
        titles.length + (titles.length === 1 ? ' joint work' : ' joint works');
      var ol = panelSel.querySelector('[data-hg-works]');
      ol.innerHTML = '';
      titles.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; ol.appendChild(li); });
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
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });
})();
