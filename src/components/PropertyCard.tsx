import { Heart, Bed, Bath, Maximize } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PropertyDetailDialog } from "./PropertyDetailDialog";

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  status: "launch" | "ready" | "construction";
  featured?: boolean;
}

export const PropertyCard = ({
  id,
  name,
  location,
  price,
  area,
  bedrooms,
  bathrooms,
  image,
  status,
  featured = false,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const statusVariant: Record<string, { label: string; variant: "default" | "secondary" | "success" }> = {
    launch: { label: "Lançamento", variant: "default" },
    ready: { label: "Pronto Para Morar", variant: "success" },
    construction: { label: "Em Construção", variant: "secondary" },
  };

  return (
    <Card className="group overflow-hidden hover:shadow-hover transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}`}
          />
        </button>
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={statusVariant[status].variant as any}>
            {statusVariant[status].label}
          </Badge>
          {featured && (
            <Badge className="bg-warning text-warning-foreground">
              Destaque
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{location}</p>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-2xl font-bold text-primary">{price}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{area}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{bedrooms} dorms</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms} banh</span>
          </div>
        </div>

        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => setShowDetails(true)}
        >
          Ver Detalhes
        </Button>
      </CardContent>

      <PropertyDetailDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        property={{
          id,
          name,
          location,
          price,
          area,
          bedrooms,
          bathrooms,
          image,
        }}
      />
    </Card>
  );
};
