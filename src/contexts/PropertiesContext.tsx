import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { properties as initialProperties } from "@/lib/mockData";

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
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  deleteAllProperties: () => void;
  setProperties: (properties: Property[]) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

const STORAGE_KEY = "kakodacury_properties";

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setPropertiesState] = useState<Property[]>(() => {
    // Tenta carregar do localStorage ao iniciar
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Erro ao carregar propriedades do localStorage:", error);
        return initialProperties;
      }
    }
    return initialProperties;
  });

  // Salva no localStorage sempre que as propriedades mudarem
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  }, [properties]);

  const addProperty = (property: Property) => {
    setPropertiesState((prev) => [...prev, property]);
  };

  const updateProperty = (property: Property) => {
    setPropertiesState((prev) =>
      prev.map((p) => (p.id === property.id ? property : p))
    );
  };

  const deleteProperty = (id: string) => {
    setPropertiesState((prev) => prev.filter((p) => p.id !== id));
  };

  const deleteAllProperties = () => {
    setPropertiesState([]);
  };

  const setProperties = (newProperties: Property[]) => {
    setPropertiesState(newProperties);
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
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

