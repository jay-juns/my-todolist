"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input.trim()]);
    setInput("");
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-text p-4">
      <button
        type="button"
        onClick={toggleDarkMode}
        className="absolute top-4 right-4"
        aria-label="toggle dark mode"
      >
        {darkMode ? (
          <svg
            className="h-6 w-6 text-yellow-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </button>

      <h1 className="text-3xl font-bold mb-6 text-text">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-64 bg-white dark:bg-gray-700 text-text dark:text-text"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          추가
        </button>
      </div>

      <ul className="w-72 space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-4 py-2 rounded-md"
          >
            <span className="text-text">{todo}</span>
            <button
              onClick={() => removeTodo(index)}
              className="text-red-500 hover:underline dark:text-red-400"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}