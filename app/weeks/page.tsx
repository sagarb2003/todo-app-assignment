"use client";

import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { getWeekStart, Task } from "@/lib/tasks";
import WeekCard from "@/components/WeekCard";
import TaskForm from "@/components/TaskForm";

export default function WeeksPage() {
  const { tasks, loaded, updateTask, toggleTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const weeks = useMemo(() => {
    const groups = new Map<string, Task[]>();
    for (const task of tasks) {
      const weekStart = getWeekStart(task.date);
      const group = groups.get(weekStart) ?? [];
      group.push(task);
      groups.set(weekStart, group);
    }
    return Array.from(groups.entries()).sort((a, b) =>
      b[0].localeCompare(a[0])
    );
  }, [tasks]);

  if (!loaded) return null;

  return (
    <div className="flex flex-1 flex-col mx-auto w-full max-w-md bg-white min-h-screen">
      <div className="flex items-center gap-3 px-6 pt-8">
        <Link href="/home" aria-label="Back">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Weeks</h1>
      </div>

      <div className="flex flex-col gap-3 px-6 py-6">
        {weeks.length === 0 ? (
          <p className="text-sm text-gray-400">No tasks yet.</p>
        ) : (
          weeks.map(([weekStart, weekTasks]) => (
            <WeekCard
              key={weekStart}
              weekStart={weekStart}
              tasks={weekTasks}
              onToggle={toggleTask}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          ))
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
