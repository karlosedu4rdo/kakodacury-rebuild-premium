import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Banner } from "@/contexts/BannersContext";

interface BannerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  banner?: Banner;
  onSave: (banner: Banner) => void;
}

export const BannerFormDialog = ({
  open,
  onOpenChange,
  banner,
  onSave,
}: BannerFormDialogProps) => {
  const [formData, setFormData] = useState<Banner>({
    id: "",
    title: "",
    subtitle: "",
    image: "",
    active: true,
    order: 1,
  });

  useEffect(() => {
    if (banner) {
      setFormData(banner);
    } else {
      setFormData({
        id: `banner-${Date.now()}`,
        title: "",
        subtitle: "",
        image: "",
        active: true,
        order: 1,
      });
    }
  }, [banner, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subtitle || !formData.image) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{banner ? "Editar Banner" : "Adicionar Novo Banner"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: O primeiro passo para o seu Apê!"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo *</Label>
            <Textarea
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Ex: Encontre seu imóvel dos sonhos em São Paulo"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL da Imagem *</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
            />
            <p className="text-xs text-muted-foreground">
              Recomendado: Imagem em formato landscape com resolução mínima de 1920x600px
            </p>
          </div>

          {formData.image && (
            <div className="space-y-2">
              <Label>Pré-visualização</Label>
              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/1920x600?text=Imagem+Inválida";
                  }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order">Ordem de Exibição</Label>
              <Input
                id="order"
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div className="flex items-end space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="active" className="cursor-pointer">Banner Ativo</Label>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="cta">
              {banner ? "Salvar Alterações" : "Adicionar Banner"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

