import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  active: boolean;
  order: number;
}

interface BannersContextType {
  banners: Banner[];
  addBanner: (banner: Banner) => void;
  updateBanner: (banner: Banner) => void;
  deleteBanner: (id: string) => void;
  deleteAllBanners: () => void;
  setBanners: (banners: Banner[]) => void;
}

const BannersContext = createContext<BannersContextType | undefined>(undefined);

const STORAGE_KEY = "kakodacury_banners";

const defaultBanners: Banner[] = [
  {
    id: "1",
    title: "O primeiro passo para o seu Apê!",
    subtitle: "Encontre seu imóvel dos sonhos em São Paulo",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&auto=format&fit=crop",
    active: true,
    order: 1,
  },
  {
    id: "2",
    title: "Apartamentos com as melhores condições",
    subtitle: "Parcelas que cabem no seu bolso",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&auto=format&fit=crop",
    active: true,
    order: 2,
  },
  {
    id: "3",
    title: "Realize o sonho da casa própria",
    subtitle: "Entre a partir de R$ 5.000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&auto=format&fit=crop",
    active: true,
    order: 3,
  },
];

export const BannersProvider = ({ children }: { children: ReactNode }) => {
  const [banners, setBannersState] = useState<Banner[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Erro ao carregar banners do localStorage:", error);
        return defaultBanners;
      }
    }
    return defaultBanners;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(banners));
  }, [banners]);

  const addBanner = (banner: Banner) => {
    setBannersState((prev) => [...prev, banner]);
  };

  const updateBanner = (banner: Banner) => {
    setBannersState((prev) =>
      prev.map((b) => (b.id === banner.id ? banner : b))
    );
  };

  const deleteBanner = (id: string) => {
    setBannersState((prev) => prev.filter((b) => b.id !== id));
  };

  const deleteAllBanners = () => {
    setBannersState([]);
  };

  const setBanners = (newBanners: Banner[]) => {
    setBannersState(newBanners);
  };

  return (
    <BannersContext.Provider
      value={{
        banners,
        addBanner,
        updateBanner,
        deleteBanner,
        deleteAllBanners,
        setBanners,
      }}
    >
      {children}
    </BannersContext.Provider>
  );
};

export const useBanners = () => {
  const context = useContext(BannersContext);
  if (!context) {
    throw new Error("useBanners deve ser usado dentro de BannersProvider");
  }
  return context;
};

