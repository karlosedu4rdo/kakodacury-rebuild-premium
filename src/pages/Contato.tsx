import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLeads } from "@/contexts/LeadsContext";

const Contato = () => {
  const { trackEvent } = useLeads();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.telefone || !formData.mensagem) {
      toast.error("Preencha todos os campos");
      return;
    }
    
    // Track form submission
    trackEvent("form_submit", "contato_page", {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      mensagem: formData.mensagem,
      formType: "contato"
    });
    
    const whatsappMessage = `Olá! Tenho uma mensagem para vocês:\n\nNome: ${formData.nome}\nE-mail: ${formData.email}\nTelefone: ${formData.telefone}\nMensagem: ${formData.mensagem}`;
    window.open(`https://wa.me/5511921773843?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Estamos aqui para ajudar você a realizar o sonho da casa própria. Fale conosco!
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Informações de Contato</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Telefone</h3>
                    <p className="text-muted-foreground">(11) 92177-3843</p>
                    <p className="text-muted-foreground">(11) 92777-3841</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">E-mail</h3>
                    <p className="text-muted-foreground">contato@kakodacury.com.br</p>
                    <p className="text-muted-foreground">vendas@kakodacury.com.br</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      Av. Ipiranga 344 - 4° Andar<br />
                      República, São Paulo - SP<br />
                      CEP: 01046-010
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Horário de Atendimento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 9h às 13h
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-bold mb-4">Redes Sociais</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <span className="sr-only">Facebook</span>
                    📘
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <span className="sr-only">Instagram</span>
                    📷
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <span className="sr-only">LinkedIn</span>
                    💼
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <span className="sr-only">WhatsApp</span>
                    💬
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Envie sua Mensagem</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Nome completo *"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="E-mail *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Telefone *"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Sua mensagem *"
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="cta" size="lg">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">Nossa Localização</h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1962689945043!2d-46.64428492378715!3d-23.561684278806963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Ipiranga%2C%20344%20-%20Rep%C3%BAblica%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1697564000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;

