"use client";

import { useEffect, useState } from "react";
import { Task, loadTasks, saveTasks } from "@/lib/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveTasks(tasks);
  }, [tasks, loaded]);

  function addTask(task: Omit<Task, "id" | "completed">) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function updateTask(id: string, updates: Partial<Task>) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return { tasks, loaded, addTask, updateTask, deleteTask, toggleTask };
}
