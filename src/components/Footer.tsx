import { Home, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e Contato */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight">kakodacury</span>
                <span className="text-[10px] font-medium text-primary-foreground/70 tracking-wider uppercase">Corretor de Imóveis</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Você perto de seu sonho!
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (11) 92177-3843
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contato@kakodacury.com.br
              </p>
            </div>
          </div>

          {/* Coluna 2: Empresa */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/sobre" className="hover:text-primary-foreground transition-colors">
                  Empresa
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-primary-foreground transition-colors">
                  Entre em Contato
                </Link>
              </li>
              <li>
                <Link to="/carreiras" className="hover:text-primary-foreground transition-colors">
                  Trabalhe Conosco
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Suporte */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/suporte" className="hover:text-primary-foreground transition-colors">
                  Suporte Via Chat
                </Link>
              </li>
              <li>
                <Link to="/cliente" className="hover:text-primary-foreground transition-colors">
                  Área do Cliente
                </Link>
              </li>
              <li>
                <Link to="/investidor" className="hover:text-primary-foreground transition-colors">
                  Canal do Investidor
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="hover:text-primary-foreground transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div>
            <h3 className="font-semibold mb-4">Siga-nos</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="hover:text-primary-foreground/80 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm">
              <p className="font-semibold mb-2">OAC</p>
              <p className="text-primary-foreground/80">
                Atendimento ao Cliente:
              </p>
              <a href="tel:1192177-3843" className="font-semibold hover:text-primary-foreground/80 transition-colors">
                (11) 92177-3843
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>
            Copyright © 2025 Kakodacury Corretor de Imóveis - Todos os Direitos Reservados | Política de Privacidade | Condôminos Editora Itália | Av. Ibirapuera 234 - 4° Andar
          </p>
        </div>
      </div>
    </footer>
  );
};
