import Provider from "@/components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import RecoilProvider from "@/components/RecoilProvider";
import { CommentModal, Sidebar, Widgets } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter",
  description: "This website is a twitter clone for practising",
};

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

export default async function RootLayout({ children }) {
  const newsResults = await getNews();
  const randomUsersResults = await getRandomUsers();
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilProvider>
          <Provider>
            <main className="flex min-h-screen mx-auto">
              <Sidebar />
              {children}
              <Widgets
                newsResults={newsResults.articles}
                randomUsersResults={randomUsersResults.results}
              />
              <CommentModal />
            </main>
          </Provider>
        </RecoilProvider>
      </body>
    </html>
  );
}
