"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Task, addDays, formatDateLong } from "@/lib/tasks";
import TaskItem from "@/components/TaskItem";

type WeekCardProps = {
  weekStart: string;
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function WeekCard({
  weekStart,
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: WeekCardProps) {
  const [expanded, setExpanded] = useState(false);
  const weekEnd = addDays(weekStart, 6);
  const completedCount = tasks.filter((t) => t.completed).length;
  const openCount = tasks.length - completedCount;

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="text-left">
          <p className="text-sm font-semibold text-gray-900">
            {formatDateLong(weekStart)} - {formatDateLong(weekEnd)}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {openCount} Open &bull; {completedCount} Completed
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
