
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, Package2 } from 'lucide-react';
import { flavors } from '@/data/flavors';
import { BucketWithFlavor } from '@/types/bucket';
import { useStockManagement } from '@/hooks/useStockManagement';

// Import refactored components
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StockSummary from '@/components/dashboard/StockSummary';
import StockManagement from '@/components/dashboard/StockManagement';
import ProductionManagement from '@/components/dashboard/ProductionManagement';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [mainTab, setMainTab] = useState('estoque');
  
  const {
    buckets,
    selectedFlavorId,
    setSelectedFlavorId,
    productionQuantity,
    setProductionQuantity,
    productionList,
    handleAddBucket,
    handleIncrementBucket,
    handleDecrementBucket,
    handleAddToProductionList,
    handleStartProduction,
    handleRemoveFromProductionList
  } = useStockManagement();

  const bucketsWithFlavor: BucketWithFlavor[] = buckets.map(bucket => {
    const flavor = flavors.find(f => f.id === bucket.flavorId) || { id: 0, name: "Desconhecido" };
    return {
      ...bucket,
      flavor
    };
  });

  const filteredBuckets = bucketsWithFlavor.filter(bucket => 
    bucket.flavor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <DashboardHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddBucket={handleAddBucket}
      />
      
      <StockSummary buckets={buckets} />
      
      <Tabs value={mainTab} onValueChange={setMainTab} className="mb-6">
        <TabsList className="w-full max-w-md mx-auto bg-gray-100">
          <TabsTrigger value="estoque" className="flex-1">
            <Package2 size={16} className="mr-2" />
            Gerenciar Estoque
          </TabsTrigger>
          <TabsTrigger value="fabricar" className="flex-1">
            <Factory size={16} className="mr-2" />
            Lista de Fabricação
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="estoque" className="mt-6">
          <StockManagement 
            filteredBuckets={filteredBuckets}
            onIncrementBucket={handleIncrementBucket}
            onDecrementBucket={handleDecrementBucket}
            onAddBucket={handleAddBucket}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
        
        <TabsContent value="fabricar" className="mt-6">
          <ProductionManagement
            selectedFlavorId={selectedFlavorId}
            setSelectedFlavorId={setSelectedFlavorId}
            productionQuantity={productionQuantity}
            setProductionQuantity={setProductionQuantity}
            productionList={productionList}
            onAddToProductionList={handleAddToProductionList}
            onStartProduction={handleStartProduction}
            onRemoveFromProductionList={handleRemoveFromProductionList}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
