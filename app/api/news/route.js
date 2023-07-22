export async function getNews() {
  const news = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  );

  if (!news.ok) {
    throw new Error("Failed to fetch news");
  }

  return news.json();
}
