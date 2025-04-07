
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BucketWithFlavor } from '@/types/bucket';
import { Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface BucketCardProps {
  bucket: BucketWithFlavor;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const BucketCard = ({ bucket, onIncrement, onDecrement }: BucketCardProps) => {
  const handleIncrement = () => {
    onIncrement(bucket.id);
    toast.success(`Adicionado mais um balde de ${bucket.flavor.name}`);
  };

  const handleDecrement = () => {
    if (bucket.quantity <= 1) {
      if (confirm(`Deseja remover o último balde de ${bucket.flavor.name}?`)) {
        onDecrement(bucket.id);
        toast.info(`Removido balde de ${bucket.flavor.name}`);
      }
    } else {
      onDecrement(bucket.id);
      toast.info(`Removido um balde de ${bucket.flavor.name}`);
    }
  };

  return (
    <Card className="overflow-hidden border-2 hover:shadow-md transition-all">
      <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
        <div className="w-full h-8 rounded-full bg-vitta-pink mb-2"></div>
        <h3 className="font-bold text-lg">{bucket.flavor.name}</h3>
        <div className="text-3xl font-bold">{bucket.quantity}</div>
        <p className="text-gray-500 text-sm">baldes em estoque</p>
      </CardContent>
      <CardFooter className="bg-gray-50 p-3 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleDecrement}
        >
          <Minus size={16} />
          Remover
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-vitta-pink hover:bg-vitta-lightpink flex items-center gap-1"
          onClick={handleIncrement}
        >
          <Plus size={16} />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BucketCard;
