
import React, { useState } from 'react';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStockByDateRange } from '@/hooks/useStockByDateRange';

const DateRangeFilter = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  const { totalBuckets, bucketsByFlavor } = useStockByDateRange(dateRange.from, dateRange.to);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  format(dateRange.from, "PP", { locale: ptBR })
                ) : (
                  <span>Data inicial</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                initialFocus
                locale={ptBR}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.to ? (
                  format(dateRange.to, "PP", { locale: ptBR })
                ) : (
                  <span>Data final</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                initialFocus
                locale={ptBR}
                className={cn("p-3 pointer-events-auto")}
                disabled={(date) => (dateRange.from ? date < dateRange.from : false)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo de Estoque por Período</CardTitle>
          <CardDescription>
            {dateRange.from && dateRange.to
              ? `${format(dateRange.from, "PP", { locale: ptBR })} até ${format(dateRange.to, "PP", { locale: ptBR })}`
              : "Selecione um período para ver o resumo"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalBuckets}</div>
          <p className="text-xs text-gray-500 mt-1">baldes adicionados no período</p>

          {bucketsByFlavor.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Detalhes por Sabor:</h4>
              <ul className="space-y-1">
                {bucketsByFlavor.map((item) => (
                  <li key={item.flavor.id} className="text-sm flex justify-between">
                    <span>{item.flavor.name}</span>
                    <span className="font-medium">{item.quantity} baldes</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DateRangeFilter;
