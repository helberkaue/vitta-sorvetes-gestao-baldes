
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, IceCream } from 'lucide-react';
import AddBucketForm from '@/components/AddBucketForm';
import { toast } from 'sonner';

interface DashboardHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddBucket: (flavorId: number, quantity: number) => void;
}

const DashboardHeader = ({ 
  searchTerm, 
  setSearchTerm, 
  onAddBucket 
}: DashboardHeaderProps) => {
  const handleManageIceCream = () => {
    toast.success("Gerenciando sorvetes!", { 
      description: "Esta função seria conectada ao Supabase para gerenciamento dos sabores."
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Gestão de Baldes</h2>
        <p className="text-gray-600">Controle seu estoque de sorvetes</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          className="bg-vitta-pink hover:bg-vitta-lightpink flex items-center gap-2"
          onClick={handleManageIceCream}
        >
          <IceCream size={18} />
          Gerenciar Sorvete
        </Button>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar sabor..."
            className="pl-8 w-full md:w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddBucketForm onAddBucket={onAddBucket} />
      </div>
    </div>
  );
};

export default DashboardHeader;
