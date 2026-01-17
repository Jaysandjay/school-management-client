interface EmptyMessageProps {
  message: string;
}

export default function EmptyMessage({ message }: EmptyMessageProps) {
  return (
    <div className="w-full flex justify-center h-5 items-center">
      <h3 className="text-red-600">{message}</h3>
    </div>
  );
}
