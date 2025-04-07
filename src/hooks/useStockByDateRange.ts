
import { useState, useEffect } from 'react';
import { useStockManagement } from './useStockManagement';
import { flavors } from '@/data/flavors';

interface FlavorSummary {
  flavor: {
    id: number;
    name: string;
  };
  quantity: number;
}

export const useStockByDateRange = (from?: Date, to?: Date) => {
  const { buckets } = useStockManagement();
  const [totalBuckets, setTotalBuckets] = useState(0);
  const [bucketsByFlavor, setBucketsByFlavor] = useState<FlavorSummary[]>([]);

  useEffect(() => {
    if (!from && !to) {
      setTotalBuckets(0);
      setBucketsByFlavor([]);
      return;
    }

    // If only one date is selected, use it for both from and to
    const startDate = from ? new Date(from.setHours(0, 0, 0, 0)) : undefined;
    const endDate = to ? new Date(to.setHours(23, 59, 59, 999)) : (from ? new Date(from.setHours(23, 59, 59, 999)) : undefined);

    // Filter buckets by date range (using the addedAt date)
    const filteredBuckets = buckets.filter(bucket => {
      const bucketDate = new Date(bucket.addedAt);
      
      if (startDate && endDate) {
        return bucketDate >= startDate && bucketDate <= endDate;
      } else if (startDate) {
        return bucketDate >= startDate;
      } else if (endDate) {
        return bucketDate <= endDate;
      }
      
      return false;
    });

    // Calculate total buckets
    const total = filteredBuckets.reduce((sum, bucket) => sum + bucket.quantity, 0);
    setTotalBuckets(total);

    // Group buckets by flavor
    const flavorCounts: Record<number, number> = {};
    filteredBuckets.forEach(bucket => {
      if (flavorCounts[bucket.flavorId]) {
        flavorCounts[bucket.flavorId] += bucket.quantity;
      } else {
        flavorCounts[bucket.flavorId] = bucket.quantity;
      }
    });

    // Create flavor summary array
    const summaryArray = Object.entries(flavorCounts).map(([flavorId, quantity]) => {
      const flavor = flavors.find(f => f.id === parseInt(flavorId)) || { id: 0, name: "Desconhecido" };
      return {
        flavor: {
          id: flavor.id,
          name: flavor.name
        },
        quantity
      };
    });

    // Sort by quantity (highest first)
    summaryArray.sort((a, b) => b.quantity - a.quantity);
    
    setBucketsByFlavor(summaryArray);
  }, [buckets, from, to]);

  return {
    totalBuckets,
    bucketsByFlavor
  };
};
