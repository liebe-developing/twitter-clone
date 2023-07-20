import { Feed, Sidebar } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
    </main>
  );
}
