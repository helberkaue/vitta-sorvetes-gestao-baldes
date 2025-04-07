
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { IceCream, Package2, List } from 'lucide-react';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-vitta-pink py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4 animate-float">Vitta Sorvetes</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sistema de Gestão de Baldes de Sorvetes
          </p>
          <Button 
            className="bg-white text-vitta-pink hover:bg-gray-100 mr-4"
            onClick={() => navigate('/dashboard')}
          >
            <Package2 className="mr-2 h-4 w-4" />
            Gerenciar Baldes
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-vitta-pink"
            onClick={() => navigate('/flavors')}
          >
            <List className="mr-2 h-4 w-4" />
            Ver Sabores
          </Button>
        </div>
        
        <div className="container mx-auto py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Gestão de Baldes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-vitta-pink text-white p-3 rounded-full inline-block mb-4">
                <Package2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Inserir Baldes</h3>
              <p className="text-gray-600 mb-4">
                Adicione novos baldes de sorvete para controlar o estoque.
              </p>
              <Button 
                className="bg-vitta-pink hover:bg-vitta-lightpink"
                onClick={() => navigate('/dashboard')}
              >
                Começar
              </Button>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-vitta-pink text-white p-3 rounded-full inline-block mb-4">
                <IceCream className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Remover Baldes</h3>
              <p className="text-gray-600 mb-4">
                Remova baldes do estoque quando forem utilizados.
              </p>
              <Button 
                className="bg-vitta-pink hover:bg-vitta-lightpink"
                onClick={() => navigate('/dashboard')}
              >
                Começar
              </Button>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-vitta-pink text-white p-3 rounded-full inline-block mb-4">
                <List className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ver Sabores</h3>
              <p className="text-gray-600 mb-4">
                Consulte todos os 27 deliciosos sabores disponíveis.
              </p>
              <Button 
                className="bg-vitta-pink hover:bg-vitta-lightpink"
                onClick={() => navigate('/flavors')}
              >
                Ver Sabores
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Vitta Sorvetes. Todos os direitos reservados.</p>
          <a 
            href="https://www.instagram.com/vittasorvetes/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-vitta-pink hover:underline mt-2 inline-block"
          >
            @vittasorvetes
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
