
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flavors } from '@/data/flavors';
import { ListPlus, Plus } from 'lucide-react';

interface ProductionFormProps {
  selectedFlavorId: string;
  setSelectedFlavorId: (id: string) => void;
  productionQuantity: number;
  setProductionQuantity: (quantity: number) => void;
  onAddToProductionList: () => void;
}

const ProductionForm = ({ 
  selectedFlavorId, 
  setSelectedFlavorId, 
  productionQuantity, 
  setProductionQuantity, 
  onAddToProductionList 
}: ProductionFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <ListPlus size={20} />
        Adicionar à Lista de Fabricação
      </h3>
      <p className="text-gray-600 mb-6">
        Adicione sabores à lista para fabricação futura.
      </p>
      
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="flavor">Sabor</Label>
          <Select
            value={selectedFlavorId}
            onValueChange={setSelectedFlavorId}
          >
            <SelectTrigger id="flavor">
              <SelectValue placeholder="Selecione um sabor" />
            </SelectTrigger>
            <SelectContent>
              {flavors.map(flavor => (
                <SelectItem key={flavor.id} value={flavor.id.toString()}>
                  {flavor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="quantity">Quantidade</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={productionQuantity}
            onChange={(e) => setProductionQuantity(parseInt(e.target.value) || 0)}
          />
        </div>
        
        <Button
          onClick={onAddToProductionList}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar à Lista
        </Button>
      </div>
    </div>
  );
};

export default ProductionForm;
