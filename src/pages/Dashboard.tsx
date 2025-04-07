import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, Package2 } from 'lucide-react';
import { toast } from 'sonner';
import { flavors } from '@/data/flavors';
import { Bucket, BucketWithFlavor } from '@/types/bucket';
import { ProductionItem } from '@/types/production';

// Import refactored components
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StockSummary from '@/components/dashboard/StockSummary';
import StockManagement from '@/components/dashboard/StockManagement';
import ProductionManagement from '@/components/dashboard/ProductionManagement';

const Dashboard = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [mainTab, setMainTab] = useState('estoque');
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>("");
  const [productionQuantity, setProductionQuantity] = useState<number>(1);
  const [productionList, setProductionList] = useState<ProductionItem[]>([]);

  useEffect(() => {
    const loadSampleData = () => {
      const sampleBuckets: Bucket[] = [
        {
          id: uuidv4(),
          flavorId: 1, // Chocolate
          quantity: 5,
          addedAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          flavorId: 2, // Morango
          quantity: 3,
          addedAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          flavorId: 5, // Ninho Trufado
          quantity: 2,
          addedAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      const sampleProductionList: ProductionItem[] = [
        {
          id: uuidv4(),
          flavorId: 3, // Baunilha
          quantity: 8,
          addedAt: new Date()
        },
        {
          id: uuidv4(),
          flavorId: 4, // Creme
          quantity: 6,
          addedAt: new Date()
        }
      ];
      
      setBuckets(sampleBuckets);
      setProductionList(sampleProductionList);
    };
    
    loadSampleData();
  }, []);

  const handleAddBucket = (flavorId: number, quantity: number) => {
    const existingBucketIndex = buckets.findIndex(b => b.flavorId === flavorId);
    
    if (existingBucketIndex >= 0) {
      const updatedBuckets = [...buckets];
      updatedBuckets[existingBucketIndex] = {
        ...updatedBuckets[existingBucketIndex],
        quantity: updatedBuckets[existingBucketIndex].quantity + quantity,
        updatedAt: new Date()
      };
      setBuckets(updatedBuckets);
    } else {
      const newBucket: Bucket = {
        id: uuidv4(),
        flavorId,
        quantity,
        addedAt: new Date(),
        updatedAt: new Date()
      };
      setBuckets([...buckets, newBucket]);
    }
  };

  const handleIncrementBucket = (id: string) => {
    const updatedBuckets = buckets.map(bucket => {
      if (bucket.id === id) {
        return {
          ...bucket,
          quantity: bucket.quantity + 1,
          updatedAt: new Date()
        };
      }
      return bucket;
    });
    
    setBuckets(updatedBuckets);
  };

  const handleDecrementBucket = (id: string) => {
    let updatedBuckets = buckets.map(bucket => {
      if (bucket.id === id) {
        return {
          ...bucket,
          quantity: Math.max(0, bucket.quantity - 1),
          updatedAt: new Date()
        };
      }
      return bucket;
    });
    
    updatedBuckets = updatedBuckets.filter(bucket => bucket.quantity > 0);
    
    setBuckets(updatedBuckets);
  };

  const handleAddToProductionList = () => {
    if (!selectedFlavorId || productionQuantity <= 0) {
      toast.error("Por favor, selecione um sabor e uma quantidade válida");
      return;
    }

    const flavorId = parseInt(selectedFlavorId);
    const flavor = flavors.find(f => f.id === flavorId);
    
    if (flavor) {
      const existingItem = productionList.find(item => item.flavorId === flavorId);
      
      if (existingItem) {
        const updatedList = productionList.map(item => {
          if (item.flavorId === flavorId) {
            return {
              ...item,
              quantity: item.quantity + productionQuantity
            };
          }
          return item;
        });
        setProductionList(updatedList);
      } else {
        const newItem: ProductionItem = {
          id: uuidv4(),
          flavorId,
          quantity: productionQuantity,
          addedAt: new Date()
        };
        setProductionList([...productionList, newItem]);
      }
      
      toast.success(`${productionQuantity} baldes de ${flavor.name} adicionados à lista de fabricação!`);
      
      setSelectedFlavorId("");
      setProductionQuantity(1);
    }
  };
  
  const handleStartProduction = () => {
    if (productionList.length === 0) {
      toast.error("A lista de fabricação está vazia!");
      return;
    }
    
    const productionItems = [...productionList];
    
    for (const item of productionItems) {
      handleAddBucket(item.flavorId, item.quantity);
    }
    
    toast.success("Fabricação concluída com sucesso!", {
      description: `${productionItems.length} sabores foram fabricados e adicionados ao estoque.`
    });
    
    setProductionList([]);
  };
  
  const handleRemoveFromProductionList = (id: string) => {
    const updatedList = productionList.filter(item => item.id !== id);
    setProductionList(updatedList);
  };

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
