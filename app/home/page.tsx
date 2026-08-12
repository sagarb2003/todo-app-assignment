"use client";

import { useMemo, useState } from "react";
import { Plus, Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { getWeekStart, toDateStr } from "@/lib/tasks";
import DayStrip from "@/components/DayStrip";
import TaskItem from "@/components/TaskItem";

export default function HomePage() {
  const { tasks, loaded, toggleTask, deleteTask } = useTasks();
  const today = toDateStr(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const weekStart = getWeekStart(selectedDate);

  const weekTasks = useMemo(
    () => tasks.filter((t) => getWeekStart(t.date) === weekStart),
    [tasks, weekStart]
  );
  const completedCount = weekTasks.filter((t) => t.completed).length;
  const pendingCount = weekTasks.length - completedCount;
  const progress =
    weekTasks.length === 0
      ? 0
      : Math.round((completedCount / weekTasks.length) * 100);

  const dayTasks = tasks.filter((t) => t.date === selectedDate);

  if (!loaded) return null;

  return (
    <div className="relative flex flex-1 flex-col mx-auto w-full max-w-md bg-white min-h-screen">
      <div className="flex flex-col gap-6 px-6 pt-8 pb-28">
        <Link
          href="/search"
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-400"
        >
          <SearchIcon className="h-4 w-4" />
          Search for a task
        </Link>

        <DayStrip
          weekStart={weekStart}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />

        <div className="flex gap-4">
          <div className="flex-1 rounded-xl bg-indigo-50 p-4">
            <p className="text-sm font-medium text-gray-700">
              Task Complete
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {completedCount}
            </p>
            <p className="text-xs text-gray-500">This Week</p>
          </div>
          <div className="flex-1 rounded-xl bg-red-50 p-4">
            <p className="text-sm font-medium text-gray-700">Task Pending</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {pendingCount}
            </p>
            <p className="text-xs text-gray-500">This Week</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Weekly Progress
          </h2>
          <div className="mt-2 h-2 w-full rounded-full bg-indigo-100">
            <div
              className="h-2 rounded-full bg-indigo-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">
              Tasks Today
            </h2>
            <Link href="/weeks" className="text-xs font-medium text-indigo-600">
              View All
            </Link>
          </div>

          {dayTasks.length === 0 ? (
            <p className="mt-4 text-sm text-gray-400">
              No tasks for this day yet.
            </p>
          ) : (
            <div className="mt-2">
              {dayTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onEdit={() => {}}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        aria-label="Add task"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
