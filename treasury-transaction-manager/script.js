const transactions = [
  { id: 1, customer: 'Budi Santoso', amount: 12500000, date: '2026-01-05' },
  { id: 2, customer: 'Siti Rahayu', amount: 34000000, date: '2026-01-12' },
  { id: 3, customer: 'Agus Wijaya', amount: 9800000, date: '2026-01-20' },
  { id: 4, customer: 'Dewi Lestari', amount: 56700000, date: '2026-02-02' },
  { id: 5, customer: 'Andi Saputra', amount: 2100000, date: '2026-02-14' },
  { id: 6, customer: 'Rina Marlina', amount: 124000000, date: '2026-02-23' },
  { id: 7, customer: 'Dedi Kurniawan', amount: 7750000, date: '2026-03-03' },
  { id: 8, customer: 'Sri Wahyuni', amount: 45200000, date: '2026-03-15' },
  { id: 9, customer: 'Bambang Susilo', amount: 13300000, date: '2026-03-28' },
  { id: 10, customer: 'Maya Anggraini', amount: 89900000, date: '2026-04-04' },
  { id: 11, customer: 'Hendra Gunawan', amount: 2500000, date: '2026-04-18' },
  { id: 12, customer: 'Lina Hidayati', amount: 61000000, date: '2026-04-30' },
  { id: 13, customer: 'Rudi Hartono', amount: 42300000, date: '2026-05-09' },
  { id: 14, customer: 'Nita Sari', amount: 7300000, date: '2026-05-21' },
  { id: 15, customer: 'Yanto Purnomo', amount: 15800000, date: '2026-06-02' },
  { id: 16, customer: 'Fitri Handayani', amount: 98700000, date: '2026-06-14' },
  { id: 17, customer: 'Joko Santoso', amount: 3450000, date: '2026-06-27' },
  { id: 18, customer: 'Ratna Wulandari', amount: 23400000, date: '2026-07-08' },
  { id: 19, customer: 'Eko Prasetyo', amount: 152000000, date: '2026-07-19' },
  { id: 20, customer: 'Intan Permata', amount: 6120000, date: '2026-08-01' },
  { id: 21, customer: 'Wahyu Setiawan', amount: 48900000, date: '2026-08-15' },
  { id: 22, customer: 'Citra Kirana', amount: 110000000, date: '2026-08-29' },
  { id: 23, customer: 'Arif Hidayat', amount: 8200000, date: '2026-09-06' },
  { id: 24, customer: 'Putri Ayu', amount: 67500000, date: '2026-09-18' },
  { id: 25, customer: 'Fajar Ramadhan', amount: 29800000, date: '2026-09-30' },
];

let currentList = transactions.slice();

const fieldSelect = document.getElementById('field-select');
const algoSelect = document.getElementById('algo-select');
const sortButton = document.getElementById('sort-button');
const searchTypeSelect = document.getElementById('search-type-select');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const tableBody = document.getElementById('table-body');
const message = document.getElementById('message');

function formatAmount(amount) {
  return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

function compare(a, b, field) {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
}

function bubbleSort(list, field) {
  const arr = list.slice();
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1], field) > 0) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function merge(left, right, field) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j], field) <= 0) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSort(list, field) {
  if (list.length <= 1) {
    return list.slice();
  }
  const mid = Math.floor(list.length / 2);
  const left = mergeSort(list.slice(0, mid), field);
  const right = mergeSort(list.slice(mid), field);
  return merge(left, right, field);
}

function linearSearch(key) {
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    if (transaction.customer.toLowerCase() === key.toLowerCase()) {
      return transaction;
    }
  }
  return null;
}

function binarySearch(key) {
  let low = 0;
  let high = transactions.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midId = transactions[mid].id;
    if (midId === key) {
      return transactions[mid];
    }
    if (midId < key) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return null;
}

function describe(transaction) {
  return '#' + transaction.id + ' ' + transaction.customer + ' ' +
    formatAmount(transaction.amount) + ' on ' + transaction.date;
}

function render(list) {
  tableBody.innerHTML = '';
  list.forEach(function (transaction) {
    const row = document.createElement('tr');
    const id = document.createElement('td');
    id.textContent = transaction.id;
    const customer = document.createElement('td');
    customer.textContent = transaction.customer;
    const amount = document.createElement('td');
    amount.textContent = formatAmount(transaction.amount);
    const date = document.createElement('td');
    date.textContent = transaction.date;
    row.appendChild(id);
    row.appendChild(customer);
    row.appendChild(amount);
    row.appendChild(date);
    tableBody.appendChild(row);
  });
}

sortButton.addEventListener('click', function () {
  const field = fieldSelect.value;
  const algorithm = algoSelect.value;
  currentList = algorithm === 'bubble'
    ? bubbleSort(currentList, field)
    : mergeSort(currentList, field);
  render(currentList);
  message.textContent = 'Sorted by ' + field + ' using ' + algorithm + ' sort.';
});

searchButton.addEventListener('click', function () {
  const query = searchInput.value.trim();
  if (query === '') {
    message.textContent = 'Enter a search query.';
    return;
  }
  if (searchTypeSelect.value === 'linear') {
    const found = linearSearch(query);
    message.textContent = found ? 'Found: ' + describe(found) : 'Not found.';
  } else {
    const id = Number(query);
    if (isNaN(id)) {
      message.textContent = 'Binary search needs a numeric id.';
      return;
    }
    const found = binarySearch(id);
    message.textContent = found ? 'Found: ' + describe(found) : 'Not found.';
  }
});

render(transactions);
message.textContent = 'Showing ' + transactions.length + ' transactions.';