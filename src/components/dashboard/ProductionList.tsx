
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flavors } from '@/data/flavors';
import { Factory, ListTodo, PlayCircle } from 'lucide-react';

interface ProductionItem {
  id: string;
  flavorId: number;
  quantity: number;
  addedAt: Date;
}

interface ProductionListProps {
  productionList: ProductionItem[];
  onStartProduction: () => void;
  onRemoveFromProductionList: (id: string) => void;
}

const ProductionList = ({ 
  productionList, 
  onStartProduction, 
  onRemoveFromProductionList 
}: ProductionListProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <ListTodo size={20} />
          Lista para Fabricação
        </h3>
        
        <Button
          onClick={onStartProduction}
          className="bg-vitta-pink hover:bg-vitta-lightpink"
          disabled={productionList.length === 0}
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          Iniciar Fabricação
        </Button>
      </div>
      
      {productionList.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sabor</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productionList.map(item => {
              const flavor = flavors.find(f => f.id === item.flavorId) || { name: "Desconhecido" };
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{flavor.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onRemoveFromProductionList(item.id)}
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12">
          <Factory className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Lista de fabricação vazia</h3>
          <p className="text-gray-500 mb-4">Adicione sabores à lista para iniciar a fabricação.</p>
        </div>
      )}
    </div>
  );
};

export default ProductionList;
