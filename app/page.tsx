"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input.trim()]);
    setInput("");
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="px-3 py-2 border rounded-md w-64"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          추가
        </button>
      </div>

      <ul className="w-72 space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-md"
          >
            <span>{todo}</span>
            <button
              onClick={() => removeTodo(index)}
              className="text-red-500 hover:underline"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}