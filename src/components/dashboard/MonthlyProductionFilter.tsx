
import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStockManagement } from '@/hooks/useStockManagement';
import { flavors } from '@/data/flavors';

interface FlavorSummary {
  flavorId: number;
  name: string;
  quantity: number;
}

const MonthlyProductionFilter = () => {
  const { buckets } = useStockManagement();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState<FlavorSummary[]>([]);
  const [totalBuckets, setTotalBuckets] = useState(0);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Filter and aggregate data whenever currentDate or buckets change
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Filter buckets for the selected month
    const filteredBuckets = buckets.filter(bucket => {
      const bucketDate = new Date(bucket.addedAt);
      return bucketDate.getFullYear() === year && bucketDate.getMonth() === month;
    });
    
    // Calculate total buckets for the month
    const total = filteredBuckets.reduce((sum, bucket) => sum + bucket.quantity, 0);
    setTotalBuckets(total);
    
    // Group by flavor and aggregate quantities
    const flavorMap = new Map<number, number>();
    
    filteredBuckets.forEach(bucket => {
      const currentQuantity = flavorMap.get(bucket.flavorId) || 0;
      flavorMap.set(bucket.flavorId, currentQuantity + bucket.quantity);
    });
    
    // Convert to array and add flavor names
    const summary: FlavorSummary[] = [];
    flavorMap.forEach((quantity, flavorId) => {
      const flavor = flavors.find(f => f.id === flavorId);
      if (flavor) {
        summary.push({
          flavorId,
          name: flavor.name,
          quantity
        });
      }
    });
    
    // Sort by quantity (highest first)
    summary.sort((a, b) => b.quantity - a.quantity);
    setMonthlyData(summary);
    
  }, [currentDate, buckets]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-medium">
          {format(currentDate, "MMMM yyyy", { locale: ptBR })}
        </h3>
        <Button variant="outline" size="icon" onClick={goToNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produção Mensal</CardTitle>
          <CardDescription>
            {format(currentDate, "MMMM yyyy", { locale: ptBR })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalBuckets}</div>
          <p className="text-xs text-gray-500 mt-1">baldes fabricados no mês</p>

          {monthlyData.length > 0 ? (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Detalhes por Sabor:</h4>
              <ul className="space-y-1">
                {monthlyData.map((item) => (
                  <li key={item.flavorId} className="text-sm flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.quantity} baldes</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-4 text-center py-4 text-gray-500">
              Nenhum sorvete fabricado neste mês
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyProductionFilter;
