import type { ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface BasicContainerProps {
  title?: string;
  width?: string;
  height?: string;
  children: ReactNode;
  isLoading?: boolean;
  subtitle?: string;
}
export default function BasicContainer({
  subtitle,
  height,
  title,
  children,
  width,
  isLoading,
}: BasicContainerProps) {
  return (
    <div
      className={`min-h-0 flex flex-1 flex-col rounded-lg border border-slate-200 bg-white shadow-sm p-6 ${width ? width : 'w-sm'} ${height && height}`}
    >
      {title && (
        <div className="flex justify-between">
          <h1 className="mb-2 text-xl">{title}</h1>
          {subtitle && <h1 className="text-md">{subtitle}</h1>}
        </div>
      )}
      <hr className="mb-4" />
      {isLoading ? (
        <LoadingSpinner />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-0 flex-1 flex flex-col">{children}</div>
      )}
    </div>
  );
}
