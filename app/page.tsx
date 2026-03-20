import { BookshelfScene } from "@/components/bookshelf";
import type { CategoryWithTopics } from "@/lib/types";

async function getCategories(): Promise<CategoryWithTopics[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/categories`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen">
      <BookshelfScene categories={categories} />
    </main>
  );
}
