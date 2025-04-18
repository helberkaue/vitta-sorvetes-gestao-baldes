
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Bucket } from '@/types/bucket';
import { ProductionItem } from '@/types/production';
import { flavors } from '@/data/flavors';

export const useStockManagement = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
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
    
    // Create a new array with all items from the production list
    const itemsToProcess = [...productionList];
    
    // First log all items to be processed to confirm they exist
    console.log("Items to process:", itemsToProcess);
    
    // Process each item individually using a proper loop
    itemsToProcess.forEach((item) => {
      const flavorName = flavors.find(f => f.id === item.flavorId)?.name || "Desconhecido";
      console.log(`Processando: ${item.quantity} baldes de ${flavorName} (ID: ${item.flavorId})`);
      
      // Directly update the buckets state to ensure all updates are applied
      setBuckets(currentBuckets => {
        const existingBucketIndex = currentBuckets.findIndex(b => b.flavorId === item.flavorId);
        
        if (existingBucketIndex >= 0) {
          // Update existing bucket
          const updatedBuckets = [...currentBuckets];
          updatedBuckets[existingBucketIndex] = {
            ...updatedBuckets[existingBucketIndex],
            quantity: updatedBuckets[existingBucketIndex].quantity + item.quantity,
            updatedAt: new Date()
          };
          return updatedBuckets;
        } else {
          // Create new bucket
          const newBucket: Bucket = {
            id: uuidv4(),
            flavorId: item.flavorId,
            quantity: item.quantity,
            addedAt: new Date(),
            updatedAt: new Date()
          };
          return [...currentBuckets, newBucket];
        }
      });
    });
    
    toast.success("Fabricação concluída com sucesso!", {
      description: `${itemsToProcess.length} sabores foram fabricados e adicionados ao estoque.`
    });
    
    // Clear production list after processing
    setProductionList([]);
  };
  
  const handleRemoveFromProductionList = (id: string) => {
    const updatedList = productionList.filter(item => item.id !== id);
    setProductionList(updatedList);
  };

  return {
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
  };
};
