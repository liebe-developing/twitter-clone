export async function getRandomUsers() {
  const randomUsers = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  );

  if (!randomUsers.ok) {
    throw new Error("Failed to fetch users");
  }

  return randomUsers.json();
}
