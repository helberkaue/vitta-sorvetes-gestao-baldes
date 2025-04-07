
import React, { ReactNode } from 'react';
import Header from '@/components/Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Vitta Sorvetes. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
