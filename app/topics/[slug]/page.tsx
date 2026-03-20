import TopicView from "@/components/topic/TopicView";
import type { TopicWithNodes } from "@/lib/types";

async function getTopic(slug: string): Promise<TopicWithNodes | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/topics/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function TopicPage({
  params,
}: {
  params: { slug: string };
}) {
  const topic = await getTopic(params.slug);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-amber-200 mb-4">
            Topic Not Found
          </h1>
          <a
            href="/"
            className="text-amber-500 hover:text-amber-400 font-serif underline"
          >
            Return to the library
          </a>
        </div>
      </div>
    );
  }

  return <TopicView topic={topic} />;
}
