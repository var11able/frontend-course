const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const itemList = document.getElementById('item-list');

addButton.addEventListener('click', function () {
  const name = itemInput.value.trim();
  if (name === '') {
    return;
  }
  addItem(name);
  itemInput.value = '';
  itemInput.focus();
});

function addItem(name) {
  const numberCell = document.createElement('td');
  numberCell.textContent = itemList.children.length + 1;

  const nameCell = document.createElement('td');
  nameCell.textContent = name;

  const actionCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    itemList.removeChild(row);
  });
  actionCell.appendChild(deleteButton);

  const row = document.createElement('tr');
  row.appendChild(numberCell);
  row.appendChild(nameCell);
  row.appendChild(actionCell);
  itemList.appendChild(row);
}