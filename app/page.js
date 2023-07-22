import { Feed, Sidebar, Widgets } from "@/components";
import { getNews } from "./api/news/route";
import { getRandomUsers } from "./api/users/route";

export default async function Home() {
  const newsResults = await getNews();
  const randomUsersResults = await getRandomUsers();
  return (
    <main className="flex min-h-screen mx-auto">
      <Sidebar />

      <Feed />

      <Widgets
        newsResults={newsResults.articles}
        randomUsersResults={randomUsersResults.results}
      />
    </main>
  );
}
