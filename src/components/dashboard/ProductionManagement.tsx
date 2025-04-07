
import React from 'react';
import ProductionForm from './ProductionForm';
import ProductionList from './ProductionList';

interface ProductionItem {
  id: string;
  flavorId: number;
  quantity: number;
  addedAt: Date;
}

interface ProductionManagementProps {
  selectedFlavorId: string;
  setSelectedFlavorId: (id: string) => void;
  productionQuantity: number;
  setProductionQuantity: (quantity: number) => void;
  productionList: ProductionItem[];
  onAddToProductionList: () => void;
  onStartProduction: () => void;
  onRemoveFromProductionList: (id: string) => void;
}

const ProductionManagement = ({
  selectedFlavorId,
  setSelectedFlavorId,
  productionQuantity,
  setProductionQuantity,
  productionList,
  onAddToProductionList,
  onStartProduction,
  onRemoveFromProductionList
}: ProductionManagementProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ProductionForm 
        selectedFlavorId={selectedFlavorId}
        setSelectedFlavorId={setSelectedFlavorId}
        productionQuantity={productionQuantity}
        setProductionQuantity={setProductionQuantity}
        onAddToProductionList={onAddToProductionList}
      />
      
      <ProductionList 
        productionList={productionList}
        onStartProduction={onStartProduction}
        onRemoveFromProductionList={onRemoveFromProductionList}
      />
    </div>
  );
};

export default ProductionManagement;
