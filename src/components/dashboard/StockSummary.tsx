
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2 } from 'lucide-react';
import { Bucket } from '@/types/bucket';

interface StockSummaryProps {
  buckets: Bucket[];
}

const StockSummary = ({ buckets }: StockSummaryProps) => {
  const totalBuckets = buckets.reduce((sum, bucket) => sum + bucket.quantity, 0);
  
  return (
    <div className="grid grid-cols-1 mb-8">
      <Card className="hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Total de Baldes</CardTitle>
          <Package2 className="h-5 w-5 text-vitta-pink" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalBuckets}</div>
          <p className="text-xs text-gray-500 mt-1">baldes em estoque</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockSummary;
