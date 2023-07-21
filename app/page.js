import { Feed, Sidebar, Widgets } from "@/components";

export default async function Home() {
  const response = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  const data = await response.json();

  const newsResults = data.articles;

  return (
    <main className="flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets newsResults={newsResults} />
    </main>
  );
}

/* https://saurav.tech/NewsAPI/top-headlines/category/business/us.json */
