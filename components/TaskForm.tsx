"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Priority, Task } from "@/lib/tasks";

type TaskFormProps = {
  initialTask?: Task;
  onSave: (task: {
    title: string;
    description: string;
    date: string;
    time: string;
    priority: Priority | "";
  }) => void;
  onClose: () => void;
};

const PRIORITIES: Priority[] = ["Low", "Medium", "High"];

export default function TaskForm({
  initialTask,
  onSave,
  onClose,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? ""
  );
  const [date, setDate] = useState(initialTask?.date ?? "");
  const [time, setTime] = useState(initialTask?.time ?? "");
  const [priority, setPriority] = useState<Priority | "">(
    initialTask?.priority ?? ""
  );
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !date) {
      setError("Title and date are required.");
      return;
    }
    onSave({ title: title.trim(), description: description.trim(), date, time, priority });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <div className="w-full max-w-md rounded-t-2xl bg-white p-6 sm:rounded-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {initialTask ? "Edit Task" : "Add New Task"}
          </h2>
          <button onClick={onClose} aria-label="Close">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Task title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Doing Homework"
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">
                Set Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">
                Set Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Priority
            </label>
            <div className="mt-1 flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(priority === p ? "" : p)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm ${
                    priority === p
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add Description"
              rows={3}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-indigo-600 py-4 text-center font-medium text-white hover:bg-indigo-700"
          >
            {initialTask ? "Save changes" : "Create task"}
          </button>
        </form>
      </div>
    </div>
  );
}
