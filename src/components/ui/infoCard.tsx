import type { ReactNode } from 'react';
import BasicContainer from './BasicContainer';
import PrimaryButton from './PrimaryButton';

interface InfoCardProps {
  title: string;
  data?: object;
  toggle?: (values: any) => any;
  isLoading?: boolean;
  emptyMessage?: string;
  buttonTitle?: string;
  buttonColor?: string;
  children?: ReactNode;
}

export default function InfoCard({
  children,
  buttonTitle = 'Edit',
  buttonColor = 'bg-blue-500',
  data,
  toggle,
  title,
  isLoading,
  emptyMessage,
}: InfoCardProps) {
  return (
    <BasicContainer title={title} isLoading={isLoading}>
      <div className="flex flex-col flex-1 justify-between min-h-0">
        {/* Data rows */}
        {data ? (
          <div className="flex flex-col gap-3">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex gap-5 items-center">
                <h3 className="w-40 font-semibold text-slate-700">{key}</h3>
                <p className="flex-1 truncate">{value as string}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <h3 className="text-red-600">{emptyMessage ?? 'N/A'}</h3>
          </div>
        )}

        {toggle && (
          <div className="flex justify-end mt-auto">
            <PrimaryButton
              title={buttonTitle}
              onclick={toggle}
              color={buttonColor}
            />
          </div>
        )}
        {children && <div className="flex justify-end mt-auto">{children}</div>}
      </div>
    </BasicContainer>
  );
}
