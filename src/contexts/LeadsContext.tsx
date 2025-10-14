import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface LeadData {
  id: string;
  timestamp: string;
  ip: string;
  device: {
    userAgent: string;
    platform: string;
    language: string;
    screenResolution: string;
    viewport: string;
  };
  geolocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    city?: string;
    country?: string;
  };
  action: "whatsapp_click" | "form_submit" | "page_view" | "button_click";
  source: string; // Qual página/componente originou
  formData?: {
    nome?: string;
    email?: string;
    telefone?: string;
    mensagem?: string;
    [key: string]: any;
  };
  referrer: string;
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

interface LeadsContextType {
  leads: LeadData[];
  trackEvent: (action: LeadData["action"], source: string, formData?: any) => Promise<void>;
  deleteLead: (id: string) => void;
  deleteAllLeads: () => void;
  exportLeads: () => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

const STORAGE_KEY = "kakodacury_leads";

// Função para obter IP do usuário (usando API pública)
const getIPAddress = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Erro ao obter IP:", error);
    return "unknown";
  }
};

// Função para obter geolocalização
const getGeolocation = (): Promise<GeolocationPosition | null> => {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        () => resolve(null),
        { timeout: 5000 }
      );
    } else {
      resolve(null);
    }
  });
};

// Função para obter informações de localização por IP
const getLocationByIP = async (ip: string): Promise<{ city?: string; country?: string }> => {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      city: data.city,
      country: data.country_name,
    };
  } catch (error) {
    console.error("Erro ao obter localização por IP:", error);
    return {};
  }
};

// Função para extrair parâmetros UTM da URL
const getUTMParams = (): LeadData["utmParams"] => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get("utm_source") || undefined,
    utm_medium: urlParams.get("utm_medium") || undefined,
    utm_campaign: urlParams.get("utm_campaign") || undefined,
    utm_term: urlParams.get("utm_term") || undefined,
    utm_content: urlParams.get("utm_content") || undefined,
  };
};

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<LeadData[]>(() => {
    const storedLeads = localStorage.getItem(STORAGE_KEY);
    return storedLeads ? JSON.parse(storedLeads) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  const trackEvent = async (
    action: LeadData["action"],
    source: string,
    formData?: any
  ): Promise<void> => {
    try {
      // Obter IP
      const ip = await getIPAddress();

      // Obter informações do dispositivo
      const device = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      };

      // Tentar obter geolocalização
      const geoPosition = await getGeolocation();
      let geolocation: LeadData["geolocation"] | undefined;

      if (geoPosition) {
        const locationData = await getLocationByIP(ip);
        geolocation = {
          latitude: geoPosition.coords.latitude,
          longitude: geoPosition.coords.longitude,
          accuracy: geoPosition.coords.accuracy,
          ...locationData,
        };
      } else {
        // Se não conseguir geolocalização do navegador, tenta por IP
        const locationData = await getLocationByIP(ip);
        if (locationData.city || locationData.country) {
          geolocation = {
            latitude: 0,
            longitude: 0,
            accuracy: 0,
            ...locationData,
          };
        }
      }

      // Criar lead
      const newLead: LeadData = {
        id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        ip,
        device,
        geolocation,
        action,
        source,
        formData,
        referrer: document.referrer || "direct",
        utmParams: getUTMParams(),
      };

      setLeads((prev) => [newLead, ...prev]);
    } catch (error) {
      console.error("Erro ao rastrear evento:", error);
    }
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const deleteAllLeads = () => {
    setLeads([]);
  };

  const exportLeads = () => {
    const dataStr = JSON.stringify(leads, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kakodacury-leads-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        trackEvent,
        deleteLead,
        deleteAllLeads,
        exportLeads,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadsProvider");
  }
  return context;
};

