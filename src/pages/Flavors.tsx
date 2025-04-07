
import React from 'react';
import Header from '@/components/Header';
import { flavors } from '@/data/flavors';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, IceCream } from 'lucide-react';

const Flavors = () => {
  const navigate = useNavigate();
  
  // Dividir os sabores em duas colunas, como na imagem
  const leftColumnFlavors = flavors.slice(0, Math.ceil(flavors.length / 2));
  const rightColumnFlavors = flavors.slice(Math.ceil(flavors.length / 2));
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h2 className="text-3xl font-bold text-gray-800">Nossos Sabores</h2>
        </div>
        
        <Card className="overflow-hidden border-2 bg-vitta-pink text-white mb-8">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold mb-2 text-center">Vitta Sorvetes</h2>
            <p className="text-center text-xl">27 Deliciosos Sabores</p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div>
            {leftColumnFlavors.map((flavor) => (
              <div 
                key={flavor.id} 
                className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="flex-shrink-0 mr-3">
                  <IceCream className="h-6 w-6 text-vitta-pink" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{flavor.id}. {flavor.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            {rightColumnFlavors.map((flavor) => (
              <div 
                key={flavor.id} 
                className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="flex-shrink-0 mr-3">
                  <IceCream className="h-6 w-6 text-vitta-pink" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{flavor.id}. {flavor.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Vitta Sorvetes. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Flavors;
