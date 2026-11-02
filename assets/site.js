/* ============================================================
   site.js — shared by every page.
   Theme toggle, safe scroll reveal, and the post list renderer.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle (initial theme is set inline in <head>) ---------- */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    var isDark = function () { return root.getAttribute('data-theme') === 'dark'; };
    toggle.setAttribute('aria-pressed', String(isDark()));
    toggle.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      if (next === 'dark') root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
      try { localStorage.setItem('theme', next); } catch (e) {}
      toggle.setAttribute('aria-pressed', String(next === 'dark'));
    });
  }

  /* ---------- Post lists ----------
     Any element with data-posts renders entries from window.POSTS.
     data-limit="3"  → only the newest N
     data-base="posts/" → path prefix for links (use "" inside /posts/)  */
  function fmtDate(iso) {
    var d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function renderPosts(el, tag) {
    var all = (window.POSTS || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    var base = el.getAttribute('data-base') || '';
    var limit = parseInt(el.getAttribute('data-limit'), 10);
    var items = tag ? all.filter(function (p) { return (p.tags || []).indexOf(tag) > -1; }) : all;
    if (limit) items = items.slice(0, limit);
    if (!items.length) {
      el.innerHTML = '<li><p class="mono" style="padding:1.2rem 0">No posts yet.</p></li>';
      return;
    }
    el.innerHTML = items.map(function (p) {
      return '<li><a href="' + esc(base + p.slug + '.html') + '">' +
        '<div><h3>' + esc(p.title) + '</h3>' +
        '<p class="sum">' + esc(p.summary) + '</p>' +
        '<ul class="tags">' + (p.tags || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
        '<span class="when">' + fmtDate(p.date) + ' · ' + esc(p.read) + ' min</span>' +
        '</a></li>';
    }).join('');
  }
  document.querySelectorAll('[data-posts]').forEach(function (el) { renderPosts(el); });

  /* Tag filters on the blog page */
  var filters = document.getElementById('filters');
  var list = document.getElementById('allPosts');
  if (filters && list) {
    var tags = {};
    (window.POSTS || []).forEach(function (p) { (p.tags || []).forEach(function (t) { tags[t] = 1; }); });
    filters.innerHTML = '<button type="button" aria-pressed="true" data-tag="">All</button>' +
      Object.keys(tags).sort().map(function (t) {
        return '<button type="button" aria-pressed="false" data-tag="' + esc(t) + '">' + esc(t) + '</button>';
      }).join('');
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      renderPosts(list, b.getAttribute('data-tag'));
    });
  }

  /* ---------- Scroll reveal ----------
     Content is visible without JS. With JS, sections fade up as they enter.
     Anything already on screen shows immediately; a low threshold means
     tall blocks reveal as soon as their first edge appears. */
  if (!reduced && 'IntersectionObserver' in window) {
    root.classList.add('js');
    var risers = document.querySelectorAll('.rise');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    risers.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('in');
      else io.observe(el);
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
