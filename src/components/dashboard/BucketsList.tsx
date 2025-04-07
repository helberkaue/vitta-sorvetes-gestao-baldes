
import React from 'react';
import BucketCard from '@/components/BucketCard';
import { BucketWithFlavor } from '@/types/bucket';
import { IceCream } from 'lucide-react';
import AddBucketForm from '@/components/AddBucketForm';

interface BucketsListProps {
  buckets: BucketWithFlavor[];
  onIncrementBucket: (id: string) => void;
  onDecrementBucket: (id: string) => void;
  onAddBucket: (flavorId: number, quantity: number) => void;
}

const BucketsList = ({ 
  buckets, 
  onIncrementBucket, 
  onDecrementBucket,
  onAddBucket
}: BucketsListProps) => {
  return (
    <>
      {buckets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {buckets.map((bucket) => (
            <BucketCard
              key={bucket.id}
              bucket={bucket}
              onIncrement={onIncrementBucket}
              onDecrement={onDecrementBucket}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <IceCream className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-1">Nenhum balde encontrado</h3>
          <p className="text-gray-500 mb-4">Adicione baldes de sorvete para começar o gerenciamento do estoque.</p>
          <AddBucketForm onAddBucket={onAddBucket} />
        </div>
      )}
    </>
  );
};

export default BucketsList;
