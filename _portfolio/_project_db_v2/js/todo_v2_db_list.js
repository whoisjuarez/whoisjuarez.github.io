//listData global
let listData = [];

const fetchItems = async (url) => {
   const response = await fetch(url);

   if (response.status === 200) {
      listData = await response.json(); // Store data in 'listData' array
      displayItems(listData); // Call the displayItems function and pass the 'listData' array
  } else {
      throw new Error("Not able to fetch notes");
  }
}

fetchItems('app/todo_v2_db_select.php');

// Show pending items
let pendingItems = false; // false = show all, true = show pending
const showPending = document.getElementById("show_pending");
showPending.addEventListener("click", () => {
   //filter -> returns a new array with the elements that pass the condition
   const checkedItems = listData.filter((listToDo) => listToDo.status === 0);
   displayItems(checkedItems);
});

// show checked items
let checkedItems = false;
const showChecked = document.getElementById("show_checked");
showChecked.addEventListener("click", () => {
   const checkedItems = listData.filter((listToDo) => listToDo.status === 1);
   displayItems(checkedItems);
});

// Show all items
const showAll = document.getElementById("show_all");
showAll.addEventListener("click", () => { displayItems(listData); });

// Order items by timestamp
let oldFirst = true; // Initialize the flag
const orderAll = document.getElementById("order_all");
orderAll.addEventListener("click", () => {
   // Toggle the flag before sorting
   oldFirst = !oldFirst;
   if (oldFirst) {
      // Descending
      listData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
   } else {
      // Ascending
      listData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
   }
   displayItems(listData);
});

/**
 * Display items
 */
const displayItems = (data) => {
   const list = document.querySelector('.list');
   list.innerHTML = '';

   let div = document.createElement('div');
   div.classList.add('container');

   data.forEach((listToDo) => {
      let article = document.createElement('article');
      article.setAttribute('id', `${listToDo.todoID}`);
      article.classList.add('item');
      article.innerHTML = 
      `<a href="" class="btn-check" data-id="${listToDo.todoID}"><i class="fa-regular fa-square check-icon"></i></a>
      
      <p id="item_desc">${listToDo.item}</p>
      
      <a href="" class="btn-edit" data-id="${listToDo.todoID}"><i class="fa-solid fa-pen-to-square"></i></i></a>
      
      <a href="" class="btn-delete" data-id="${listToDo.todoID}"><i class="fa-regular fa-trash-can"></i></a>`;

      if (listToDo.status == 1) {
         article.querySelector('#item_desc').classList.add('completed');
         article.querySelector('.check-icon').classList.remove('fa-regular', 'fa-square');
         article.querySelector('.check-icon').classList.add('fa-solid', 'fa-square-check');
         article.querySelector('.btn-check').classList.add('btn_checked');
      }
      
      div.appendChild(article);
   })
   list.appendChild(div);

   // Check event listener
   const checkBtn = document.querySelectorAll('.btn-check');
   checkBtn.forEach((btnCheck) => {
      btnCheck.addEventListener('click', checkFormData);
   });

   // Delete event listener
   const deleteBtn = document.querySelectorAll('.btn-delete');
   deleteBtn.forEach(btnDelete => {
      btnDelete.addEventListener('click', deleteFormData);
   });

   // Edit event listener
   const editBtn = document.querySelectorAll('.btn-edit');
   editBtn.forEach(btnEdit => {
      btnEdit.addEventListener('click', getEditFormData);
   });
}

/**
 * ADD items to the list
 */
// To start ADD items when add button clicked
const addBtn = document.querySelector('#add_btn');
addBtn.addEventListener('click', getFormData);

// To start ADD items when enter key pressed
const addForm = document.querySelector('#add_form');
addForm.addEventListener('submit', getFormData);

function getFormData(e) {
   e.preventDefault();
   const addFormData = new FormData(addForm);
   let addUrl = 'app/todo_db_insert.php';
   addItem(addFormData, addUrl);
}

const addItem = async (data, addUrl) => {
   const addRes = await fetch(addUrl, {
      method: 'POST',
      body: data
   });
   // console.log(addRes); // Log response for debugging
   const confirmation = await addRes.json(); 
   console.log(confirmation);

   if (addRes.status === 200) {
      console.log("Successfully added!");
      addForm.reset();
      fetchItems("app/todo_v2_db_select.php");
   } else {
       console.log("Failed to add.");
   }
}

/**
 * CHECK items from the list
 */
function checkFormData(e) {
   e.preventDefault();
   let element = e.target.parentNode;
   
   const checkedFormData = new FormData();
   checkedFormData.append('todoID', element.dataset.id);

   let url = 'app/todo_v2_db_completed.php';
   addItem(checkedFormData, url);
}

/**
 * EDIT items from the list
 */
const editFormInput = document.querySelector('#edit_form_field');
function getEditFormData (e){
   e.preventDefault();
   addForm.style.display = 'none'; 
   editForm.style.display = 'grid'; 

   let element = e.target.parentNode.parentNode;
   editFormInput.value = element.querySelector('#item_desc').textContent;
   editFormInput.dataset.id = element.id;
}

const saveBtn = document.querySelector('#save_btn');
saveBtn.addEventListener('click', editItem);

const editForm = document.querySelector('#edit_form');
editForm.addEventListener('submit', editItem);

function editItem(e) {
   e.preventDefault();
   const itemId = editFormInput.dataset.id;
   const editUrl = 'app/todo_db_edit.php';
   
   saveEditedItem(itemId, editUrl);
};

const saveEditedItem = async (itemId, editUrl) => {
   const newItemValue = editFormInput.value;

   const editedItemData = new FormData();
   editedItemData.append('todoID', itemId);
   editedItemData.append('item', newItemValue);

   const saveEditedRes = await fetch(editUrl, {
      method: 'POST',
      body: editedItemData
   });

   const confirmation = await saveEditedRes.json();
   console.log(confirmation);

   if (saveEditedRes.status === 200) {
      console.log('Successfully updated!');
      editForm.reset();

      addForm.style.display = 'grid'; 
      editForm.style.display = 'none'; 

      fetchItems('app/todo_v2_db_select.php');
   } else {
      console.log('Failed to update.');
   }
}

/**
 * DELETE items from the list
 */
function deleteFormData(e){
   e.preventDefault();
   let element = e.target.parentNode;
   // console.log(element.dataset.id);
   const deleteFormData = new FormData();
   deleteFormData.append('todoID', element.dataset.id); 
   
   let deleteUrl = 'app/todo_db_delete.php';
   deleteItem(deleteFormData, deleteUrl);
}

const deleteItem = async (data, deleteUrl) => {
   const deleteRes = await fetch(deleteUrl, {
      method: 'POST',
      body: data
   });
   const confirmation = await deleteRes.json();
   console.log(confirmation);
   
   if (deleteRes.status === 200) {
      console.log("Successfully deleted!");
      fetchItems("app/todo_v2_db_select.php");
   } else {
       console.log("Failed to delete.");
   }
}