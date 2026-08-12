"use client";

import { Check, Pencil, Trash2 } from "lucide-react";
import { Task } from "@/lib/tasks";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as pending" : "Mark as complete"}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
          task.completed
            ? "border-indigo-600 bg-indigo-600"
            : "border-gray-300"
        }`}
      >
        {task.completed && <Check className="h-3.5 w-3.5 text-white" />}
      </button>

      <span
        className={`flex-1 text-sm ${
          task.completed
            ? "text-gray-400 line-through"
            : "text-gray-900 font-medium"
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onEdit(task)}
        aria-label="Edit task"
        className="text-gray-400 hover:text-indigo-600"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="text-gray-400 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
