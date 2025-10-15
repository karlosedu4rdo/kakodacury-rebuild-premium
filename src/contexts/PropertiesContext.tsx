import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { properties as initialProperties } from "@/lib/mockData";
import { PropertyService } from "@/lib/propertyService";

export interface Property {
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

interface PropertiesContextType {
  properties: Property[];
  loading: boolean;
  addProperty: (property: Property) => Promise<void>;
  updateProperty: (property: Property) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  deleteAllProperties: () => Promise<void>;
  setProperties: (properties: Property[]) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setPropertiesState] = useState<Property[]>(initialProperties);
  const [loading, setLoading] = useState(true);

  // Carregar propriedades na inicialização
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const loadedProperties = await PropertyService.getProperties();
        if (loadedProperties.length > 0) {
          setPropertiesState(loadedProperties);
        }
      } catch (error) {
        console.error("Erro ao carregar propriedades:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const addProperty = async (property: Property) => {
    try {
      const newProperty = await PropertyService.addProperty(property);
      setPropertiesState((prev) => [...prev, newProperty]);
    } catch (error) {
      console.error("Erro ao adicionar propriedade:", error);
      // Fallback para estado local
      setPropertiesState((prev) => [...prev, property]);
    }
  };

  const updateProperty = async (property: Property) => {
    try {
      const updatedProperty = await PropertyService.updateProperty(property);
      setPropertiesState((prev) =>
        prev.map((p) => (p.id === property.id ? updatedProperty : p))
      );
    } catch (error) {
      console.error("Erro ao atualizar propriedade:", error);
      // Fallback para estado local
      setPropertiesState((prev) =>
        prev.map((p) => (p.id === property.id ? property : p))
      );
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await PropertyService.deleteProperty(id);
      setPropertiesState((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao deletar propriedade:", error);
      // Fallback para estado local
      setPropertiesState((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const deleteAllProperties = async () => {
    try {
      await PropertyService.deleteAllProperties();
      setPropertiesState([]);
    } catch (error) {
      console.error("Erro ao deletar todas as propriedades:", error);
      // Fallback para estado local
      setPropertiesState([]);
    }
  };

  const setProperties = (newProperties: Property[]) => {
    setPropertiesState(newProperties);
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        loading,
        addProperty,
        updateProperty,
        deleteProperty,
        deleteAllProperties,
        setProperties,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error("useProperties deve ser usado dentro de PropertiesProvider");
  }
  return context;
};

