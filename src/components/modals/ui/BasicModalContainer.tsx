import type { ReactNode } from "react";

interface BasicModalContainerProps {
    children: ReactNode
}

export default function BasicModalContainer({children}: BasicModalContainerProps) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full text-center border border-green-500">
        {children}
      </div>
    </div>
  );
}
