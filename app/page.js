import { CommentModal, Feed, Sidebar, Widgets } from "@/components";

async function getNews() {
  const news = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  );

  if (!news.ok) {
    throw new Error("Failed to fetch news");
  }

  return news.json();
}

async function getRandomUsers() {
  const randomUsers = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  );

  if (!randomUsers.ok) {
    throw new Error("Failed to fetch users");
  }

  return randomUsers.json();
}

export default async function Home() {
  const newsResults = await getNews();
  const randomUsersResults = await getRandomUsers();

  return (
    <main className="flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets
        newsResults={newsResults.articles}
        randomUsersResults={randomUsersResults.results}
      />

      <CommentModal />
    </main>
  );
}
