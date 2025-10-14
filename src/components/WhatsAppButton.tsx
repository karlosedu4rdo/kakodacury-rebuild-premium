import { MessageCircle } from "lucide-react";
import { useLeads } from "@/contexts/LeadsContext";
import { useLocation } from "react-router-dom";

export const WhatsAppButton = () => {
  const { trackEvent } = useLeads();
  const location = useLocation();
  const whatsappNumber = "5511921773843"; // Formato: código do país + DDD + número
  const message = "Olá! Gostaria de mais informações sobre os imóveis.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    trackEvent("whatsapp_click", "floating_button", {
      type: "floating_whatsapp_button",
      message,
    });
  };

  // Não mostrar o botão nas páginas administrativas
  if (location.pathname === "/dashboard" || location.pathname === "/admin") {
    return null;
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group animate-float"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Fale Conosco
      </span>
    </a>
  );
};

