import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Gift, CheckCircle, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLeads } from "@/contexts/LeadsContext";

const Indicacao = () => {
  const { trackEvent } = useLeads();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.telefone) {
      toast.error("Preencha todos os campos");
      return;
    }
    
    // Track form submission
    trackEvent("form_submit", "indicacao_page", {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      formType: "indicacao"
    });
    
    const message = `Olá! Gostaria de me cadastrar no programa Indique e Ganhe.\n\nNome: ${formData.nome}\nE-mail: ${formData.email}\nTelefone: ${formData.telefone}`;
    window.open(`https://wa.me/5511921773843?text=${encodeURIComponent(message)}`, '_blank');
    
    toast.success("Cadastro realizado com sucesso! Você já pode começar a indicar!");
    setFormData({ nome: "", email: "", telefone: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-success py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Programa <span className="text-warning">"Indique e Ganhe"</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Ajude amigos e familiares a realizarem o sonho da casa própria e seja recompensado por isso!
          </p>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Como funciona?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-success" />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Cadastre-se</h3>
              <p className="text-muted-foreground text-sm">
                Faça seu cadastro no programa de indicação gratuitamente
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-10 h-10 text-success" />
              </div>
              <h3 className="font-bold text-lg mb-2">2. Indique</h3>
              <p className="text-muted-foreground text-sm">
                Compartilhe com amigos e familiares que querem comprar um imóvel
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Acompanhe</h3>
              <p className="text-muted-foreground text-sm">
                Acompanhe o processo de compra do seu indicado
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-10 h-10 text-success" />
              </div>
              <h3 className="font-bold text-lg mb-2">4. Ganhe</h3>
              <p className="text-muted-foreground text-sm">
                Receba sua recompensa quando a venda for concretizada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Vantagens do Programa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-8 pb-6 text-center">
                <h3 className="text-xl font-bold text-success mb-3">
                  Sem Limite de Indicações
                </h3>
                <p className="text-muted-foreground">
                  Quanto mais você indicar, mais você ganha. Não há limite para o número de indicações.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-6 text-center">
                <h3 className="text-xl font-bold text-success mb-3">
                  Processo Simples
                </h3>
                <p className="text-muted-foreground">
                  Cadastro rápido e fácil. Basta preencher o formulário e começar a indicar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-6 text-center">
                <h3 className="text-xl font-bold text-success mb-3">
                  Recompensas Atrativas
                </h3>
                <p className="text-muted-foreground">
                  Receba recompensas em dinheiro por cada indicação que resultar em venda.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cadastro */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Junte-se ao nosso Programa<br />
                <span className="text-success">"Indique e Ganhe"</span> agora mesmo
              </h2>
              <p className="text-muted-foreground mb-6">
                Cadastre-se hoje e comece a indicar! Quanto mais pessoas você indicar, mais prêmios você ganha. É uma oportunidade imperdível de ganhar ao mesmo tempo que você ajuda outras pessoas a realizarem seus sonhos de ter um imóvel próprio em São Paulo.
              </p>
              <Button variant="default" size="lg" className="bg-success hover:bg-success/90" asChild>
                <a href="https://wa.me/5511921773843?text=Olá!%20Gostaria%20de%20fazer%20uma%20simulação." target="_blank" rel="noopener noreferrer">
                  Simular agora
                </a>
              </Button>
            </div>

            <Card className="bg-success border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Cadastre-se agora
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Nome completo"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="bg-white"
                  />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white"
                  />
                  <Input
                    type="tel"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="bg-white"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-success hover:bg-white/90" 
                    size="lg"
                  >
                    REALIZAR CADASTRO
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

export default Indicacao;

