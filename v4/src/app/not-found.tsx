import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 font-mono text-xs tracking-widest text-accent">// error 404</p>
      <h1 className="mb-3 font-display text-3xl font-bold text-fg">token not found</h1>
      <p className="mb-8 max-w-sm text-sm text-muted">
        This sequence isn&apos;t in the vocabulary. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
      >
        Back to home
      </Link>
    </main>
  );
}