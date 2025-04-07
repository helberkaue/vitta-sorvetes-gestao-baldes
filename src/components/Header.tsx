
import React from 'react';
import { IceCream } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-vitta-pink shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <IceCream size={32} className="text-white" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">Vitta Sorvetes</h1>
        </div>
        <a 
          href="https://www.instagram.com/vittasorvetes/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white hover:text-vitta-gray flex items-center gap-1"
        >
          <span className="hidden md:inline">@vittasorvetes</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
