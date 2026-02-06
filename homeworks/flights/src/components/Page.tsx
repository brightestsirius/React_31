type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function Page({ title, description, children }: Props) {
  return (
    <section className="mx-auto w-full max-w-5xl p-4 md:p-6">
      {(title || description) && (
        <header className="mb-6 space-y-1">
          {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}