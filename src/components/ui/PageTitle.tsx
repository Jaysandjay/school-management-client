interface PageTitleProps {
  title: string;
}
export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="mb-3 mr-10 min-h-0">
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
}
