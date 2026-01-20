import React from 'react';
import Providers from './providers';
import Sidebar from './Sidebar';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = React.memo(function RootLayout({ children }: RootLayoutProps) {
  return (
    <Providers>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50 text-black overflow-auto">
          {children}
        </main>
      </div>
    </Providers>
  );
});

export default RootLayout;
