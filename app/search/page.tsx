"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/lib/tasks";
import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components/TaskForm";

export default function SearchPage() {
  const { tasks, loaded, updateTask, toggleTask, deleteTask } = useTasks();
  const [query, setQuery] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q)
    );
  }, [tasks, query]);

  if (!loaded) return null;

  return (
    <div className="flex flex-1 flex-col mx-auto w-full max-w-md bg-white min-h-screen">
      <div className="flex items-center gap-3 px-6 pt-8">
        <Link href="/home" aria-label="Back">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Search</h1>
      </div>

      <div className="px-6 pt-6">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3">
          <SearchIcon className="h-4 w-4 text-gray-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a task"
            className="flex-1 text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="px-6 py-6">
        {query.trim() === "" ? (
          <p className="text-sm text-gray-400">
            Start typing to search your tasks.
          </p>
        ) : results.length === 0 ? (
          <p className="text-sm text-gray-400">No matching tasks found.</p>
        ) : (
          <div>
            {results.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onEdit={setEditingTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {editingTask && (
        <TaskForm
          initialTask={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updates) => {
            updateTask(editingTask.id, updates);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
