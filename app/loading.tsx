export default function Loading() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container-page grid gap-4">
        <div className="h-8 w-40 animate-pulse rounded-full bg-border" />
        <div className="h-16 max-w-2xl animate-pulse rounded-3xl bg-border" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div className="h-40 animate-pulse rounded-3xl bg-border" key={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
