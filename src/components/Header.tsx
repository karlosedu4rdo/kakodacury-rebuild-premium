import { Home, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Home className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary leading-tight">kakodacury</span>
            <span className="text-[10px] font-medium text-primary/70 tracking-wider uppercase">Corretor de Imóveis</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Início
          </Link>
          <Link to="/imoveis" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Imóveis
          </Link>
          <Link to="/sobre" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Sobre Nós
          </Link>
          <Link to="/indicacao" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Indicação
          </Link>
          <Link to="/contato" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contato
          </Link>
        </nav>

            <div className="flex items-center gap-4">
              <a href="tel:1192177-3843" className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                (11) 92177-3843
              </a>
              <Button variant="cta" size="sm" asChild>
                <a href="https://wa.me/5511921773843?text=Olá!%20Gostaria%20de%20fazer%20uma%20simulação." target="_blank" rel="noopener noreferrer">
                  Fazer Simulação
                </a>
              </Button>
            </div>
      </div>
    </header>
  );
};
