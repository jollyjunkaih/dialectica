import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📝</div>
        <h1 className="font-display text-4xl text-amber-200 mb-4">
          CMS Editor
        </h1>
        <p className="text-amber-500/60 font-serif text-lg mb-8">
          Coming Soon
        </p>
        <p className="text-amber-700/40 font-serif text-sm mb-8">
          The editor will let you create and manage topics, questions, and the
          infinite knowledge tree.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-amber-800/30 hover:bg-amber-800/50 text-amber-300 rounded-lg font-serif transition-colors border border-amber-700/30"
        >
          ← Back to the Library
        </Link>
      </div>
    </div>
  );
}
