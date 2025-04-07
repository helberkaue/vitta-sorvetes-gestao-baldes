
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BucketWithFlavor } from '@/types/bucket';
import BucketsList from './BucketsList';
import DateRangeFilter from './DateRangeFilter';

interface StockManagementProps {
  filteredBuckets: BucketWithFlavor[];
  onIncrementBucket: (id: string) => void;
  onDecrementBucket: (id: string) => void;
  onAddBucket: (flavorId: number, quantity: number) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const StockManagement = ({ 
  filteredBuckets, 
  onIncrementBucket, 
  onDecrementBucket,
  onAddBucket,
  activeTab,
  setActiveTab
}: StockManagementProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList>
        <TabsTrigger value="all">Todos os Sabores</TabsTrigger>
        <TabsTrigger value="available">Disponíveis em Estoque</TabsTrigger>
        <TabsTrigger value="date">Por Data</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-6">
        <BucketsList 
          buckets={filteredBuckets}
          onIncrementBucket={onIncrementBucket}
          onDecrementBucket={onDecrementBucket}
          onAddBucket={onAddBucket}
        />
      </TabsContent>
      
      <TabsContent value="available" className="mt-6">
        <BucketsList 
          buckets={filteredBuckets}
          onIncrementBucket={onIncrementBucket}
          onDecrementBucket={onDecrementBucket}
          onAddBucket={onAddBucket}
        />
      </TabsContent>
      
      <TabsContent value="date" className="mt-6">
        <DateRangeFilter />
      </TabsContent>
    </Tabs>
  );
};

export default StockManagement;
