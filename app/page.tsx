"use client"
import { useEffect, useState } from "react";
import TodoItem from "./_components/TodoItem";
import Task from "./_models/task";

export default function Home() {
  const [todoList, setTodoList] = useState<Task[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const getAllTodos = async () => {
    const response = await fetch("/api/todo");
    const data = await response.json();
    return setTodoList(data);
  }

  const handleAddTodo = (event: any) => {
    event.preventDefault();
    fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ description: newTodo})
    })
      .then((response) => response.json())
      .then((data) => {
        setNewTodo("");
        getAllTodos();
      });
  };

  return (
    <div className="todoapp stack-large">
      <h1>TodoList demo</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
      <h2 id="list-heading">Task list</h2>
      <button onClick={getAllTodos}>Refresh</button>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {todoList.map((todo: Task) => (
          <TodoItem key={todo.id} id={todo.id} description={todo.description} completed={todo.completed} getAllTodos={getAllTodos} />
        ))}
      </ul>
    </div>
  );
}