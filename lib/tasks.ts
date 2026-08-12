export type Priority = "Low" | "Medium" | "High";

export type Task = {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  priority: Priority | "";
  completed: boolean;
};

const STORAGE_KEY = "todo-app-tasks";

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Weeks run Monday to Sunday.
export function getWeekStart(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return toDateStr(date);
}

export function toDateStr(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toDateStr(date);
}

export function formatDay(dateStr: string): { weekday: string; day: string } {
  const date = new Date(`${dateStr}T00:00:00`);
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    day: String(date.getDate()).padStart(2, "0"),
  };
}

export function formatDateLong(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
