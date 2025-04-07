
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { flavors } from '@/data/flavors';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddBucketFormProps {
  onAddBucket: (flavorId: number, quantity: number) => void;
}

const AddBucketForm = ({ onAddBucket }: AddBucketFormProps) => {
  const [flavorId, setFlavorId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!flavorId) {
      toast.error("Por favor, selecione um sabor");
      return;
    }

    onAddBucket(parseInt(flavorId), quantity);
    toast.success(`${quantity} balde(s) adicionado(s) com sucesso!`);
    setFlavorId('');
    setQuantity(1);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-vitta-pink hover:bg-vitta-lightpink">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Baldes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Baldes</DialogTitle>
          <DialogDescription>
            Selecione o sabor e a quantidade de baldes para adicionar ao estoque.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="flavor" className="block text-sm font-medium">Sabor</label>
            <Select value={flavorId} onValueChange={setFlavorId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um sabor" />
              </SelectTrigger>
              <SelectContent>
                {flavors.map((flavor) => (
                  <SelectItem key={flavor.id} value={flavor.id.toString()}>
                    {flavor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-sm font-medium">Quantidade</label>
            <Input 
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          
          <DialogFooter>
            <Button type="submit" className="bg-vitta-pink hover:bg-vitta-lightpink">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBucketForm;
