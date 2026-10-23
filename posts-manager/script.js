const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const LIMIT = 5;

const state = {
  page: 1,
  search: '',
  sort: 'id',
  order: 'asc',
};

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const sortSelect = document.getElementById('sort-select');
const addButton = document.getElementById('add-button');
const postsBody = document.getElementById('posts-body');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const pageInfo = document.getElementById('page-info');
const modal = document.getElementById('modal');
const postForm = document.getElementById('post-form');
const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const titleError = document.getElementById('title-error');
const bodyError = document.getElementById('body-error');
const closeButton = document.getElementById('close-button');
const result = document.getElementById('result');

function currentParams() {
  const params = new URLSearchParams();
  params.set('_page', state.page);
  params.set('_limit', LIMIT);
  if (state.search) {
    params.set('title_like', state.search);
  }
  params.set('_sort', state.sort);
  params.set('_order', state.order);
  return params;
}

function buildUrl() {
  return API_URL + '?' + currentParams().toString();
}

function writeState() {
  history.pushState(null, '', '?' + currentParams().toString());
}

function readState() {
  const params = new URLSearchParams(location.search);
  state.page = parseInt(params.get('_page'), 10) || 1;
  state.search = params.get('title_like') || '';
  state.sort = params.get('_sort') || 'id';
  state.order = params.get('_order') || 'asc';
}

function syncControls() {
  searchInput.value = state.search;
  sortSelect.value = state.sort + '-' + state.order;
}

async function loadPosts() {
  try {
    const response = await fetch(buildUrl());
    const posts = await response.json();
    const total = parseInt(response.headers.get('X-Total-Count'), 10);
    renderPosts(posts);
    updatePagination(total);
  } catch (error) {
    alert('Could not load posts.');
  }
}

function renderPosts(posts) {
  postsBody.innerHTML = '';
  posts.forEach(function (post) {
    const row = document.createElement('tr');
    const id = document.createElement('td');
    id.textContent = post.id;
    const title = document.createElement('td');
    title.textContent = post.title;
    const body = document.createElement('td');
    body.textContent = post.body;
    row.appendChild(id);
    row.appendChild(title);
    row.appendChild(body);
    postsBody.appendChild(row);
  });
}

function updatePagination(total) {
  const totalPages = Math.ceil(total / LIMIT);
  prevButton.disabled = state.page === 1;
  nextButton.disabled = state.page >= totalPages;
  pageInfo.textContent = 'Page ' + state.page + ' of ' + totalPages;
}

function applyFilters() {
  state.page = 1;
  writeState();
  loadPosts();
}

searchButton.addEventListener('click', function () {
  state.search = searchInput.value.trim();
  applyFilters();
});

sortSelect.addEventListener('change', function () {
  const parts = sortSelect.value.split('-');
  state.sort = parts[0];
  state.order = parts[1];
  applyFilters();
});

prevButton.addEventListener('click', function () {
  if (state.page > 1) {
    state.page--;
    writeState();
    loadPosts();
  }
});

nextButton.addEventListener('click', function () {
  state.page++;
  writeState();
  loadPosts();
});

window.addEventListener('popstate', function () {
  readState();
  syncControls();
  loadPosts();
});

function openModal() {
  postForm.classList.remove('hidden');
  result.classList.add('hidden');
  titleInput.value = '';
  bodyInput.value = '';
  clearErrors();
  modal.classList.remove('hidden');
  titleInput.focus();
}

function closeModal() {
  modal.classList.add('hidden');
}

addButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

function clearErrors() {
  titleError.textContent = '';
  bodyError.textContent = '';
  titleError.classList.remove('visible');
  bodyError.classList.remove('visible');
}

function showError(element, message) {
  element.textContent = message;
  element.classList.add('visible');
}

function validateForm() {
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  let valid = true;

  if (title === '') {
    showError(titleError, 'Title is required.');
    valid = false;
  } else if (/\d/.test(title)) {
    showError(titleError, 'Title must not contain digits.');
    valid = false;
  } else if (title.length > 30) {
    showError(titleError, 'Title must be 30 characters or fewer.');
    valid = false;
  }

  if (body === '') {
    showError(bodyError, 'Body is required.');
    valid = false;
  } else if (/\d/.test(body)) {
    showError(bodyError, 'Body must not contain digits.');
    valid = false;
  }

  return valid;
}

postForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  clearErrors();
  if (!validateForm()) {
    return;
  }
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: titleInput.value.trim(),
        body: bodyInput.value.trim(),
        userId: 1,
      }),
    });
    const post = await response.json();
    showResult(post);
  } catch (error) {
    alert('Could not add the post.');
  }
});

function showResult(post) {
  postForm.classList.add('hidden');
  result.innerHTML = '';
  const created = document.createElement('p');
  created.className = 'created';
  created.textContent = 'Created post #' + post.id + ': ' + post.title + ' - ' + post.body;
  const close = document.createElement('button');
  close.textContent = 'Close';
  close.addEventListener('click', closeModal);
  result.appendChild(created);
  result.appendChild(close);
  result.classList.remove('hidden');
}

readState();
syncControls();
loadPosts();