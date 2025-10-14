import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Users, Award, Target, Heart, TrendingUp } from "lucide-react";

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre a Kakodacury
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Há anos ajudando famílias a realizarem o sonho da casa própria em São Paulo
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Nossa História
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                A Kakodacury nasceu com um propósito claro: tornar o sonho da casa própria acessível para todos os paulistanos. Somos especializados em conectar famílias a empreendimentos imobiliários de qualidade em toda a cidade de São Paulo.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Com anos de experiência no mercado imobiliário, construímos uma reputação sólida baseada em confiança, transparência e comprometimento com nossos clientes. Cada apartamento que vendemos representa não apenas um imóvel, mas a realização de um sonho.
              </p>
              <p className="text-lg leading-relaxed">
                Nossa missão vai além de vender imóveis. Queremos ser parte da história de cada família que atendemos, oferecendo as melhores condições de pagamento, suporte completo durante todo o processo e um atendimento humanizado que faz toda a diferença.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nossos Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Compromisso</h3>
                <p className="text-muted-foreground">
                  Estamos comprometidos com o sucesso de cada cliente, oferecendo suporte em todas as etapas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excelência</h3>
                <p className="text-muted-foreground">
                  Buscamos sempre a excelência no atendimento e na qualidade dos imóveis que oferecemos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Transparência</h3>
                <p className="text-muted-foreground">
                  Trabalhamos com total transparência, garantindo que você tome a melhor decisão.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por que escolher a Kakodacury?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Ampla Variedade de Imóveis</h3>
                <p className="text-muted-foreground">
                  Oferecemos apartamentos em todas as regiões de São Paulo, com opções para todos os perfis e bolsos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Atendimento Personalizado</h3>
                <p className="text-muted-foreground">
                  Cada cliente é único. Oferecemos um atendimento personalizado e humanizado do início ao fim.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Melhores Condições</h3>
                <p className="text-muted-foreground">
                  Trabalhamos para oferecer as melhores condições de pagamento e financiamento do mercado.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Experiência Comprovada</h3>
                <p className="text-muted-foreground">
                  Anos de experiência no mercado imobiliário paulistano nos tornam especialistas na área.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Kakodacury em Números
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="text-white/80">Famílias Atendidas</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-white/80">Empreendimentos</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5</div>
              <p className="text-white/80">Regiões de SP</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">98%</div>
              <p className="text-white/80">Satisfação</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-background">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para realizar seu sonho?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como podemos ajudar você a conquistar seu apartamento próprio em São Paulo.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="default" asChild>
              <a href="/imoveis">Ver Imóveis</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contato">Fale Conosco</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;

