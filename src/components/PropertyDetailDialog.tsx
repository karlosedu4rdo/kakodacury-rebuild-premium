import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Maximize, Calendar, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PropertyDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: {
    id: string;
    name: string;
    location: string;
    price: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    image: string;
    description?: string;
    amenities?: string[];
  };
}

export const PropertyDetailDialog = ({
  open,
  onOpenChange,
  property,
}: PropertyDetailDialogProps) => {
  const defaultDescription = `Empreendimento completo em ${property.location} com diversas opções de plantas, perfeito para famílias que buscam conforto e praticidade.`;
  
  const defaultAmenities = [
    "Área de lazer completa",
    "Academia",
    "Portaria 24h",
    "Churrasqueira",
    "Piscina",
    "Playground infantil",
    "Salão de festas",
    "Estacionamento",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="relative">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-bold text-primary mb-2">
              {property.name}
            </h2>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">A partir de</p>
              <p className="text-4xl font-bold text-primary">{property.price}</p>
            </div>

            <div className="flex items-center gap-6 mb-6 pb-6 border-b">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-primary" />
                <span className="font-semibold">{property.bedrooms} quartos</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-primary" />
                <span className="font-semibold">{property.bathrooms} banheiros</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="w-5 h-5 text-primary" />
                <span className="font-semibold">{property.area}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Sobre o Imóvel</h3>
              <p className="text-muted-foreground leading-relaxed">
                {property.description || defaultDescription}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Características</h3>
              <div className="grid grid-cols-2 gap-3">
                {(property.amenities || defaultAmenities).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Visita
              </Button>
              <Button className="flex-1 bg-success hover:bg-success/90" size="lg">
                <Heart className="w-4 h-4 mr-2" />
                Tenho Interesse
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
