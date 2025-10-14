import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Property {
  id: string;
  name: string;
  location: string;
  region: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  status: "launch" | "ready" | "construction";
  featured?: boolean;
}

interface PropertyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property;
  onSave: (property: Property) => void;
}

export const PropertyFormDialog = ({
  open,
  onOpenChange,
  property,
  onSave,
}: PropertyFormDialogProps) => {
  const [formData, setFormData] = useState<Property>({
    id: "",
    name: "",
    location: "",
    region: "Centro",
    price: "",
    area: "",
    bedrooms: 1,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800",
    status: "launch",
    featured: false,
  });

  useEffect(() => {
    if (property) {
      setFormData(property);
    } else {
      setFormData({
        id: `prop-${Date.now()}`,
        name: "",
        location: "",
        region: "Centro",
        price: "",
        area: "",
        bedrooms: 1,
        bathrooms: 1,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800",
        status: "launch",
        featured: false,
      });
    }
  }, [property, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.price || !formData.area) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    onSave(formData);
    toast.success(property ? "Imóvel atualizado com sucesso!" : "Imóvel adicionado com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{property ? "Editar Imóvel" : "Adicionar Novo Imóvel"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Empreendimento *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Vila Naquera"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Localização *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ex: Vila Naquera, Zona Leste"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Região *</Label>
              <Select
                value={formData.region}
                onValueChange={(value) => setFormData({ ...formData, region: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Centro">Centro</SelectItem>
                  <SelectItem value="Sul">Sul</SelectItem>
                  <SelectItem value="Leste">Leste</SelectItem>
                  <SelectItem value="Oeste">Oeste</SelectItem>
                  <SelectItem value="Norte">Norte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Ex: R$ 249.900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Área *</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="Ex: 56m² a 66m²"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Dormitórios</Label>
              <Select
                value={formData.bedrooms.toString()}
                onValueChange={(value) => setFormData({ ...formData, bedrooms: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 dormitório</SelectItem>
                  <SelectItem value="2">2 dormitórios</SelectItem>
                  <SelectItem value="3">3 dormitórios</SelectItem>
                  <SelectItem value="4">4 dormitórios</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Banheiros</Label>
              <Select
                value={formData.bathrooms.toString()}
                onValueChange={(value) => setFormData({ ...formData, bathrooms: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 banheiro</SelectItem>
                  <SelectItem value="2">2 banheiros</SelectItem>
                  <SelectItem value="3">3 banheiros</SelectItem>
                  <SelectItem value="4">4 banheiros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "launch" | "ready" | "construction") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="launch">Lançamento</SelectItem>
                  <SelectItem value="ready">Pronto Para Morar</SelectItem>
                  <SelectItem value="construction">Em Construção</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="featured" className="cursor-pointer">Marcar como Destaque</Label>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="cta">
              {property ? "Salvar Alterações" : "Adicionar Imóvel"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
