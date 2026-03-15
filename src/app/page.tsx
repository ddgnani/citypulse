import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-6 sm:py-8">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
          CityPulse
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Real-time city dashboard
        </p>
      </header>
      <Dashboard />
    </main>
  );
}
