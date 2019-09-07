;
(function () {
  const todo = JSON.parse(localStorage.getItem('todoData')) || [];
  const todoList = document.querySelector('#todoList')
  const completedList = document.querySelector('#completedList')
  const addButton = document.querySelector('.add-item .btn')
  const todoInput = document.querySelector('#input')

  addButton.addEventListener('click', addHandler)
  todoInput.addEventListener('keydown', e => {
    if (e.keyCode == 13) {
      addHandler()
    }
  })

  //renderTodo
  function renderTodos(todo) {
    let str = '';
    let completedStr = ''
    let icon = ``

    for (let i = 0; i < todo.length; i++) {
      if (todo[i].completed == false) {
        icon = `<input type="checkbox" class="ui-checkbox"> 
    <i class="material-icons ui-show">check_box_outline_blank</i>`
      } else {
        icon = `<input type="checkbox" class="ui-checkbox" checked> 
      <i class="material-icons ui-show">check_box</i>`
      }
      
      // Add class to completed item and render to list
      if (todo[i].completed) {
        completedStr += `
          <li class="listItem completed" data-index=${i}>
            <label class="ui-checked-display">
              ` +
          icon +
          `</label>
            <div class="item">
              <p class="text">${todo[i].todoItem}</p>
            </div>
            <a href="javascript:;" class="iconBtn" data-action="delete"><i class="material-icons">delete</i>
            </a>
          </li>`
      } else {
        str += `
          <li class="listItem" data-index=${i}>
            <label class="ui-checked-display">
              ` +
          icon +
          `</label>
            <div class="item">
              <p class="text">${todo[i].todoItem}</p>
            </div>
            <a href="javascript:;" class="iconBtn" data-action="delete"><i class="material-icons">delete</i>
            </a>
          </li>`
      }
    }

    todoList.innerHTML = str;
    completedList.innerHTML = completedStr;
  }


  //updateTodoData and eventlistener
  function updateTodoData() {
    let toString = JSON.stringify(todo);
    localStorage.setItem('todoData', toString);
    renderTodos(todo)

    let deleteButton = document.querySelectorAll('a[data-action="delete"]')
    deleteButton.forEach(item => item.addEventListener('click', deleteHandler))

    let todoItem = document.querySelectorAll('#todoList .item')
    todoItem.forEach(item => item.addEventListener('dblclick', editHandler))

    let todoCheckbox = document.querySelectorAll('.ui-checkbox')
    todoCheckbox.forEach(item => item.addEventListener('click', checkHandler))
  }


  //addTodo
  function addHandler(e) {
    if (todoInput.value) {
      todo.push({
        completed: false,
        todoItem: todoInput.value
      })
      todoInput.value = ''
      updateTodoData()
    }
  }


  //editTodo
  function editHandler() {
    if (!this.parentNode.classList.contains('completed')) {
      let index = this.parentNode.dataset.index
      todoStr = todo[index].todoItem

      this.innerHTML = `<input type="text" class='editing'>`
      let editingTodo = document.querySelector('.editing')
      editingTodo.value = todoStr
      editingTodo.focus()

      editingTodo.addEventListener('blur', () => {
        todo[index].todoItem = editingTodo.value
        updateTodoData()
      })

      editingTodo.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
          todo[index].todoItem = editingTodo.value
          updateTodoData()
        }
      })
    }
  }


  //deleteTodo
  function deleteHandler() {
    if (confirm('確定刪除?')) {
      let index = this.parentNode.dataset.index
      todo.splice(index, 1)
      updateTodoData()
    }
  }


  //compeleteTodo
  function checkHandler() {
    let listItem = this.parentNode.parentNode
    let index = listItem.dataset.index
    if (this.checked) {
      listItem.classList.add('completed')
      todo[index].completed = true
      updateTodoData()
    } else {
      listItem.classList.remove('completed')
      todo[index].completed = false
      updateTodoData()
    }
  }

  //initialize
  todoInput.focus()
  updateTodoData()
})()