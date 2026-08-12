import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="flex flex-1 flex-col mx-auto w-full max-w-md bg-white min-h-screen">
      <div className="relative flex-1 bg-indigo-600 overflow-hidden min-h-[420px]">
        <ZigzagPattern className="absolute top-8 left-6 text-indigo-400/40" />
        <ZigzagPattern className="absolute bottom-10 right-6 text-indigo-400/40" />
      </div>

      <div className="flex flex-col gap-6 px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage What To Do</h1>
          <p className="mt-2 text-sm text-gray-500">
            The best way to manage what you have to do, don&apos;t forget your
            plans
          </p>
        </div>

        <Link
          href="/home"
          className="w-full rounded-xl bg-indigo-600 py-4 text-center font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

function ZigzagPattern({ className }: { className?: string }) {
  const rows = [0, 10, 20, 30, 40];

  return (
    <svg
      className={className}
      width="90"
      height="90"
      viewBox="0 0 60 60"
      fill="none"
    >
      {rows.map((y) => (
        <polyline
          key={y}
          points={`0,${y + 6} 10,${y} 20,${y + 6} 30,${y} 40,${y + 6} 50,${y} 60,${y + 6}`}
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
