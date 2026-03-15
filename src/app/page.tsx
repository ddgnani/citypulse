import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
        CityPulse
      </h1>
      <Dashboard />
    </main>
  );
}
