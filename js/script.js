"use strict";

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem("todoList")));
  }
  addToStorage() {
    localStorage.setItem("todoList", JSON.stringify([...this.todoData]));
  }
  render() {
    this.todoList.textContent = "";
    this.todoCompleted.textContent = "";
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }
  createItem(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.key = todo.key;
    li.insertAdjacentHTML(
      "beforeend",
      `	<span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
    `
    );
    li.setAttribute("data-key", todo.key);
    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }
  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      alert(" Это поле не должно быть пустым!");
    }
  }
  generateKey() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
  deleteItem(target) {
    const li = target.closest(".todo-item");
    let key = li.dataset.key;
    this.todoData.delete(key);
  }

  completedItem(target) {
    const li = target.closest(".todo-item");
    let key = li.dataset.key;
    let item = this.todoData.get(key);
    item.completed = !item.completed;
    console.log(item);
  }
  handler() {
    //делегирование
    let todoContainer = document.querySelector(".todo-container");
    todoContainer.addEventListener("click", (event) => {
      let target = event.target;
      if (target.matches(".todo-remove")) {
        this.deleteItem(target);
        this.render();
      } else if (target.matches(".todo-complete")) {
        this.completedItem(target);
        this.render();
      }
    });
  }

  init() {
    this.form.addEventListener("submit", this.addTodo.bind(this));
    this.handler();
    this.render();
  }
}

const todo = new Todo(
  ".todo-control",
  ".header-input",
  ".todo-list",
  ".todo-completed"
);
todo.init();
