
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import BucketCard from '@/components/BucketCard';
import AddBucketForm from '@/components/AddBucketForm';
import { Bucket, BucketWithFlavor } from '@/types/bucket';
import { flavors, Flavor } from '@/data/flavors';
import { Search, IceCream, Package2, Factory, Truck, Plus, PlayCircle, ListTodo, ListPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProductionItem {
  id: string;
  flavorId: number;
  quantity: number;
  addedAt: Date;
}

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
      
      // Amostra de lista de produção
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

  const handleManageIceCream = () => {
    toast.success("Gerenciando sorvetes!", { 
      description: "Esta função seria conectada ao Supabase para gerenciamento dos sabores."
    });
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
      
      // Reset the form
      setSelectedFlavorId("");
      setProductionQuantity(1);
    }
  };
  
  const handleStartProduction = () => {
    if (productionList.length === 0) {
      toast.error("A lista de fabricação está vazia!");
      return;
    }
    
    // Fix: Create a copy of the production list to iterate over
    const productionListCopy = [...productionList];
    
    // Add all items from the production list to the stock
    productionListCopy.forEach(item => {
      handleAddBucket(item.flavorId, item.quantity);
    });
    
    toast.success("Fabricação concluída com sucesso!", {
      description: `${productionListCopy.length} sabores foram fabricados e adicionados ao estoque.`
    });
    
    // Clear the production list
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

  const totalBuckets = buckets.reduce((sum, bucket) => sum + bucket.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Gestão de Baldes</h2>
            <p className="text-gray-600">Controle seu estoque de sorvetes</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              className="bg-vitta-pink hover:bg-vitta-lightpink flex items-center gap-2"
              onClick={handleManageIceCream}
            >
              <IceCream size={18} />
              Gerenciar Sorvete
            </Button>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar sabor..."
                className="pl-8 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <AddBucketForm onAddBucket={handleAddBucket} />
          </div>
        </div>
        
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList>
                <TabsTrigger value="all">Todos os Sabores</TabsTrigger>
                <TabsTrigger value="available">Disponíveis em Estoque</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {filteredBuckets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredBuckets.map((bucket) => (
                      <BucketCard
                        key={bucket.id}
                        bucket={bucket}
                        onIncrement={handleIncrementBucket}
                        onDecrement={handleDecrementBucket}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IceCream className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-1">Nenhum balde encontrado</h3>
                    <p className="text-gray-500 mb-4">Adicione baldes de sorvete para começar o gerenciamento do estoque.</p>
                    <AddBucketForm onAddBucket={handleAddBucket} />
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="available" className="mt-6">
                {filteredBuckets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredBuckets.map((bucket) => (
                      <BucketCard
                        key={bucket.id}
                        bucket={bucket}
                        onIncrement={handleIncrementBucket}
                        onDecrement={handleDecrementBucket}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IceCream className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-1">Nenhum balde em estoque</h3>
                    <p className="text-gray-500 mb-4">Adicione baldes de sorvete para começar o gerenciamento do estoque.</p>
                    <AddBucketForm onAddBucket={handleAddBucket} />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="fabricar" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Formulário para adicionar à lista de fabricação */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ListPlus size={20} />
                  Adicionar à Lista de Fabricação
                </h3>
                <p className="text-gray-600 mb-6">
                  Adicione sabores à lista para fabricação futura.
                </p>
                
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="flavor">Sabor</Label>
                    <Select
                      value={selectedFlavorId}
                      onValueChange={setSelectedFlavorId}
                    >
                      <SelectTrigger id="flavor">
                        <SelectValue placeholder="Selecione um sabor" />
                      </SelectTrigger>
                      <SelectContent>
                        {flavors.map(flavor => (
                          <SelectItem key={flavor.id} value={flavor.id.toString()}>
                            {flavor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={productionQuantity}
                      onChange={(e) => setProductionQuantity(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <Button
                    onClick={handleAddToProductionList}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Adicionar à Lista
                  </Button>
                </div>
              </div>
              
              {/* Lista de fabricação */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <ListTodo size={20} />
                    Lista para Fabricação
                  </h3>
                  
                  <Button
                    onClick={handleStartProduction}
                    className="bg-vitta-pink hover:bg-vitta-lightpink"
                    disabled={productionList.length === 0}
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Iniciar Fabricação
                  </Button>
                </div>
                
                {productionList.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sabor</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productionList.map(item => {
                        const flavor = flavors.find(f => f.id === item.flavorId) || { name: "Desconhecido" };
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{flavor.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveFromProductionList(item.id)}
                              >
                                Remover
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Factory className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Lista de fabricação vazia</h3>
                    <p className="text-gray-500 mb-4">Adicione sabores à lista para iniciar a fabricação.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Vitta Sorvetes. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
