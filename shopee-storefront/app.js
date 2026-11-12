(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var grid = $('picks-grid');
  var stateBox = $('picks-state');
  var countLine = $('picks-count');
  var controls = $('controls');
  var catsRow = $('cats');
  var searchInput = $('search');
  var sortSelect = $('sort');
  var leadSection = $('lead');
  var themeToggle = $('theme-toggle');

  var products = [];
  var view = { query: '', category: 'all', sort: 'curated' };
  var rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function safeUrl(value) {
    try {
      var u = new URL(String(value));
      return u.protocol === 'https:' ? u.href : null;
    } catch (e) { return null; }
  }

  function normalise(list) {
    var out = [];
    list.forEach(function (raw, i) {
      if (!raw || typeof raw.name !== 'string' || !raw.name.trim()) {
        console.warn('products.js: entry ' + (i + 1) + ' has no name and was skipped.');
        return;
      }
      out.push({
        number: out.length + 1,
        name: raw.name.trim(),
        url: safeUrl(raw.url),
        category: typeof raw.category === 'string' && raw.category.trim() ? raw.category.trim() : 'Other',
        note: typeof raw.note === 'string' ? raw.note.trim() : '',
        price: typeof raw.price === 'number' && isFinite(raw.price) && raw.price > 0 ? raw.price : null,
        image: typeof raw.image === 'string' && raw.image.trim() ? raw.image.trim() : null,
        imageBackup: typeof raw.imageBackup === 'string' ? safeUrl(raw.imageBackup) : null,
        featured: raw.featured === true,
        rating: typeof raw.rating === 'number' && raw.rating > 0 && raw.rating <= 5 ? raw.rating : null,
        sold: typeof raw.sold === 'string' && raw.sold.trim() ? raw.sold.trim() : null
      });
    });
    return out;
  }

  function showState(kind, title, detail, action) {
    stateBox.textContent = '';
    stateBox.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    stateBox.className = 'state' + (kind === 'error' ? ' state--error' : '');
    stateBox.appendChild(el('p', 'state__title', title));
    if (detail) stateBox.appendChild(el('p', null, detail));
    if (action) {
      var btn = el('button', 'btn', action.label);
      btn.type = 'button';
      btn.addEventListener('click', action.run);
      stateBox.appendChild(btn);
    }
    stateBox.hidden = false;
    grid.hidden = true;
  }

  function photo(product, isLead) {
    var frame = el('div', 'photo' + (isLead ? ' photo--lead' : ''));
    function placeholder(message) {
      frame.textContent = '';
      frame.classList.add('photo--empty');
      frame.appendChild(el('span', 'photo__num', pad(product.number)));
      frame.appendChild(el('span', 'photo__msg', message));
    }
    if (!product.image) {
      placeholder('No photo added yet');
      return frame;
    }
    var img = document.createElement('img');
    img.alt = product.name;
    img.width = isLead ? 800 : 600;
    img.height = 600;
    img.decoding = 'async';
    if (isLead) img.setAttribute('fetchpriority', 'high');
    else img.loading = 'lazy';
    var triedBackup = false;
    img.addEventListener('error', function () {
      if (product.imageBackup && !triedBackup) {
        triedBackup = true;
        img.src = product.imageBackup;
      } else {
        placeholder('Photo did not load');
      }
    });
    img.src = product.image;
    frame.appendChild(img);
    return frame;
  }

  function priceLine(product) {
    var line = el('p', 'price', product.price ? rupiah.format(product.price) : 'See price on Shopee');
    var facts = [];
    if (product.rating) facts.push(product.rating.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' out of 5 on Shopee');
    if (product.sold) facts.push(product.sold + ' sold');
    if (facts.length) line.appendChild(el('span', 'price__facts', facts.join(', ')));
    return line;
  }

  function action(product, primary) {
    if (!product.url) {
      var off = el('button', 'btn', 'Link not added yet');
      off.type = 'button';
      off.disabled = true;
      return off;
    }
    var a = el('a', 'btn' + (primary ? ' btn--accent' : ''));
    a.href = product.url;
    a.target = '_blank';
    a.rel = 'sponsored nofollow noopener';
    a.appendChild(document.createTextNode('Buy on Shopee'));
    a.appendChild(el('span', 'sr-only', ': ' + product.name + ' (opens in a new tab)'));
    return a;
  }

  function meta(product) {
    var line = el('p', 'meta');
    line.appendChild(el('span', 'meta__num', 'No. ' + pad(product.number)));
    line.appendChild(el('span', 'meta__cat', product.category));
    return line;
  }

  function card(product) {
    var li = el('li', 'card');
    li.appendChild(meta(product));
    li.appendChild(photo(product, false));
    var body = el('div', 'card__body');
    body.appendChild(el('h3', 'card__name', product.name));
    if (product.note) body.appendChild(el('p', 'card__note', product.note));
    body.appendChild(priceLine(product));
    body.appendChild(action(product, false));
    li.appendChild(body);
    return li;
  }

  function renderLead() {
    var lead = products.filter(function (p) { return p.featured; })[0];
    leadSection.textContent = '';
    if (!lead) { leadSection.hidden = true; return; }
    leadSection.appendChild(photo(lead, true));
    var body = el('div', 'lead__body');
    var label = el('p', 'lead__label', 'Featured');
    label.id = 'lead-label';
    body.appendChild(label);
    body.appendChild(meta(lead));
    body.appendChild(el('h2', 'lead__name', lead.name));
    if (lead.note) body.appendChild(el('p', 'lead__note', lead.note));
    body.appendChild(priceLine(lead));
    body.appendChild(action(lead, true));
    leadSection.appendChild(body);
    leadSection.hidden = false;
  }

  function renderCategories() {
    var names = [];
    products.forEach(function (p) { if (names.indexOf(p.category) === -1) names.push(p.category); });
    catsRow.textContent = '';
    ['all'].concat(names).forEach(function (name) {
      var btn = el('button', 'cat', name === 'all' ? 'All' : name);
      btn.type = 'button';
      btn.dataset.category = name;
      btn.setAttribute('aria-pressed', String(view.category === name));
      catsRow.appendChild(btn);
    });
  }

  function visibleProducts() {
    var q = view.query.toLowerCase();
    var list = products.filter(function (p) {
      if (view.category !== 'all' && p.category !== view.category) return false;
      if (!q) return true;
      return (p.name + ' ' + p.category + ' ' + p.note).toLowerCase().indexOf(q) !== -1;
    });
    if (view.sort === 'name') {
      list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    } else if (view.sort === 'price' || view.sort === 'price-desc') {
      var dir = view.sort === 'price' ? 1 : -1;
      list.sort(function (a, b) {
        if (a.price === null) return b.price === null ? a.number - b.number : 1;
        if (b.price === null) return -1;
        return (a.price - b.price) * dir;
      });
    }
    return list;
  }

  function resetFilters() {
    view.query = '';
    view.category = 'all';
    searchInput.value = '';
    renderCategories();
    renderList();
    searchInput.focus();
  }

  function renderList() {
    var list = visibleProducts();
    var total = products.length;
    var filtered = view.query || view.category !== 'all';
    countLine.textContent = filtered
      ? list.length + ' of ' + total + ' shown'
      : total + (total === 1 ? ' product' : ' products');

    if (!list.length) {
      var what = view.query ? 'Nothing matches "' + view.query + '"' : 'Nothing here';
      if (view.category !== 'all') what += ' in ' + view.category;
      showState('empty', what + '.', 'Try a shorter search, or go back to the full list.',
        { label: 'Show all products', run: resetFilters });
      return;
    }
    grid.textContent = '';
    list.forEach(function (p) { grid.appendChild(card(p)); });
    stateBox.hidden = true;
    grid.hidden = false;
  }

  function start() {
    var data = window.STOREFRONT_PRODUCTS;
    if (!Array.isArray(data)) {
      controls.hidden = true;
      countLine.textContent = '';
      showState('error', 'The product list did not load.',
        'products.js is missing or has a typing mistake in it. Check that it sits next to index.html, then try again.',
        { label: 'Try loading again', run: reload });
      return;
    }
    products = normalise(data);
    if (!products.length) {
      controls.hidden = true;
      countLine.textContent = '';
      leadSection.hidden = true;
      showState('empty', 'No products have been added yet.',
        'Add your first product to products.js and it will show up here.');
      return;
    }
    if (products.some(function (p) { return p.price !== null; }) && !sortSelect.querySelector('[value="price"]')) {
      [['price', 'Price, low to high'], ['price-desc', 'Price, high to low']].forEach(function (pair) {
        var opt = el('option', null, pair[1]);
        opt.value = pair[0];
        sortSelect.appendChild(opt);
      });
    }
    controls.hidden = false;
    renderLead();
    renderCategories();
    renderList();
  }

  function reload() {
    showState('loading', 'Loading the product list.');
    var s = document.createElement('script');
    s.src = 'products.js?retry=' + Date.now();
    s.onload = start;
    s.onerror = start;
    document.head.appendChild(s);
  }

  controls.addEventListener('submit', function (e) { e.preventDefault(); });
  searchInput.addEventListener('input', function () {
    view.query = searchInput.value.trim();
    renderList();
  });
  sortSelect.addEventListener('change', function () {
    view.sort = sortSelect.value;
    renderList();
  });
  catsRow.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-category]');
    if (!btn) return;
    view.category = btn.dataset.category;
    Array.prototype.forEach.call(catsRow.children, function (b) {
      b.setAttribute('aria-pressed', String(b === btn));
    });
    renderList();
  });

  function currentTheme() {
    var set = document.documentElement.dataset.theme;
    if (set) return set;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function labelTheme() {
    themeToggle.textContent = currentTheme() === 'dark' ? 'Light mode' : 'Dark mode';
  }
  themeToggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('storefront-theme', next); } catch (e) {}
    labelTheme();
  });
  labelTheme();

  start();
})();
