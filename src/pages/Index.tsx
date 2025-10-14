import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Search, DollarSign, Users, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { regions } from "@/lib/mockData";
import { useProperties } from "@/contexts/PropertiesContext";
import { useBanners } from "@/contexts/BannersContext";
import { useLeads } from "@/contexts/LeadsContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const { properties } = useProperties();
  const { banners } = useBanners();
  const { trackEvent } = useLeads();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const activeBanners = banners.filter(b => b.active).sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (activeBanners.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000); // Troca de banner a cada 5 segundos

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const currentBanner = activeBanners[currentBannerIndex];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedRegion) params.set("region", selectedRegion);
    if (selectedBedrooms) params.set("bedrooms", selectedBedrooms);
    navigate(`/imoveis?${params.toString()}`);
  };

  const handleRegionClick = (regionName: string) => {
    navigate(`/imoveis?region=${regionName.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Banner Carousel */}
      <section className="relative h-[500px] md:h-[550px] overflow-hidden">
        {currentBanner ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ 
                backgroundImage: `url(${currentBanner.image})`,
              }}
            />
            
            {/* Navigation Arrows */}
            {activeBanners.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                  onClick={prevBanner}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                  onClick={nextBanner}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Indicators */}
            {activeBanners.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {activeBanners.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentBannerIndex 
                        ? "bg-white w-8" 
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    onClick={() => setCurrentBannerIndex(index)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-primary" />
        )}
      </section>

      {/* Guide Section */}
      <section className="py-16 bg-muted">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full mb-6">
            <Home className="w-5 h-5" />
            <span className="font-semibold">Simulação Gratuita e Sem Compromisso</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Descubra Como é Fácil Ter Seu Imóvel Próprio!
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simule em poucos minutos e veja as condições ideais para você
          </p>
          <Button size="lg" variant="default" asChild>
            <a href="https://wa.me/5511921773843?text=Olá!%20Gostaria%20de%20fazer%20uma%20simulação%20gratuita." target="_blank" rel="noopener noreferrer">
              Iniciar Simulação Gratuita
            </a>
          </Button>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-16 bg-primary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Onde você quer morar?
          </h2>
          <p className="text-center text-white/90 mb-12 max-w-3xl mx-auto">
            Descubra as características únicas de cada área da cidade e encontre a opção perfeita para o seu estilo de vida!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {regions.map((region) => (
              <Card
                key={region.name}
                className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 border-0"
                onClick={() => handleRegionClick(region.name)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h3 className="text-2xl font-bold text-white">
                      {region.name}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Encontre seu imóvel ideal
          </h2>
          <Card className="max-w-5xl mx-auto shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <Input 
                    placeholder="Buscar por nome" 
                    className="h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Região" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centro">Centro</SelectItem>
                    <SelectItem value="sul">Sul</SelectItem>
                    <SelectItem value="leste">Leste</SelectItem>
                    <SelectItem value="oeste">Oeste</SelectItem>
                    <SelectItem value="norte">Norte</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Dormitórios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 dormitório</SelectItem>
                    <SelectItem value="2">2 dormitórios</SelectItem>
                    <SelectItem value="3">3 dormitórios</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-12" variant="cta" onClick={handleSearch}>
                  <Search className="w-4 h-4 mr-2" />
                  Pesquisar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Apartamentos em todas as Regiões da Cidade de São Paulo
              </h2>
            </div>
            <Button variant="outline" asChild>
              <a href="/imoveis">Ver Todos</a>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.slice(0, 8).map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            PARA COMPRAR VOCÊ PRECISA:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">Não ter restrição no nome</h3>
                <p className="text-sm text-muted-foreground">
                  Tenha seu nome limpo e sem pendências no mercado
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-success-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">Entrada a partir de R$5.000</h3>
                <p className="text-sm text-muted-foreground">
                  Um valor acessível para dar o primeiro passo
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-success-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">Renda familiar a partir de R$3 mil</h3>
                <p className="text-sm text-muted-foreground">
                  Seu sonho pode começar com renda acessível
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Referral Program Section */}
      <section className="py-16 bg-primary">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Junte-se ao nosso Programa<br />
                <span className="text-secondary">"Indique e Ganhe"</span> agora mesmo
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Cadastre-se hoje e comece a indicar! Quanto mais pessoas você indicar, mais prêmios você ganha. É uma oportunidade imperdível de ganhar ao mesmo tempo que você ajuda outras pessoas a realizarem seus sonhos de ter um imóvel próprio em São Paulo.
              </p>
              <Button variant="outline" size="lg" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="/indicacao">Indicar agora</a>
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Cadastre-se agora</h3>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const nome = formData.get('nome');
                  const email = formData.get('email');
                  const telefone = formData.get('telefone');
                  
                  // Track form submission
                  trackEvent("form_submit", "homepage_indique_ganhe", {
                    nome,
                    email,
                    telefone,
                    formType: "indique_e_ganhe"
                  });
                  
                  const message = `Olá! Gostaria de me cadastrar no programa Indique e Ganhe.\n\nNome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}`;
                  window.open(`https://wa.me/5511921773843?text=${encodeURIComponent(message)}`, '_blank');
                }}>
                  <Input placeholder="Nome" name="nome" required />
                  <Input type="email" placeholder="E-mail" name="email" required />
                  <Input type="tel" placeholder="Telefone" name="telefone" required />
                  <Button type="submit" className="w-full" variant="cta" size="lg">
                    REALIZAR CADASTRO
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nunca Pare de Sonhar Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
            Nunca Pare de Sonhar
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-4xl mx-auto">
            Descubra histórias inspiradoras de conquistas! Confira alguns depoimentos reais de quem transformou o sonho do apartamento próprio em realidade. Sua história pode ser a próxima!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop"
                  alt="História de conquista"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <p className="text-sm font-medium mb-2 tracking-wider">NUNCA PARE DE</p>
                  <h3 className="text-5xl font-bold mb-4">Sonhar</h3>
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop"
                  alt="História de conquista"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <p className="text-sm font-medium mb-2 tracking-wider">NUNCA PARE DE</p>
                  <h3 className="text-5xl font-bold mb-4">Sonhar</h3>
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent to-primary-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-accent-foreground">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Aqui, você realiza o sonho<br />
                do seu apartamento próprio<br />
                com as melhores condições.
              </h2>
              <p className="text-accent-foreground/90 mb-4">
                Temos as melhores opções de apartamentos em toda a cidade de São Paulo, com condições especiais e parcelas que cabem no seu bolsillo. Não é um sonho distante - com a Kakodacury, o seu apartamento está ao seu alcance.
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Nosso Contato</h3>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const nome = formData.get('nome');
                  const email = formData.get('email');
                  const telefone = formData.get('telefone');
                  
                  // Track form submission
                  trackEvent("form_submit", "homepage_contato", {
                    nome,
                    email,
                    telefone,
                    formType: "contato"
                  });
                  
                  const message = `Olá! Gostaria de mais informações sobre os imóveis.\n\nNome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}`;
                  window.open(`https://wa.me/5511921773843?text=${encodeURIComponent(message)}`, '_blank');
                }}>
                  <Input placeholder="Nome" name="nome" required />
                  <Input type="email" placeholder="E-mail" name="email" required />
                  <Input type="tel" placeholder="Telefone" name="telefone" required />
                  <Button type="submit" className="w-full" variant="cta" size="lg">
                    ENVIAR
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
