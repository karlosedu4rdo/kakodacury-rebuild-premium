import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useProperties } from "@/contexts/PropertiesContext";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Imoveis = () => {
  const { properties } = useProperties();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get("region") || "");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion && selectedRegion !== "todos") {
      filtered = filtered.filter((p) =>
        p.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    if (selectedStatus && selectedStatus !== "todos") {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    setFilteredProperties(filtered);
  }, [searchTerm, selectedRegion, selectedStatus, properties]);

  const handleSearch = () => {
    // Filter is already applied via useEffect
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-8 text-center">
            O primeiro passo para o seu Apê!
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center mb-8">Encontre seu imóvel</p>

          {/* Search Form */}
          <div className="bg-background rounded-lg p-6 shadow-lg max-w-5xl mx-auto">
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
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="sul">Sul</SelectItem>
                  <SelectItem value="leste">Leste</SelectItem>
                  <SelectItem value="oeste">Oeste</SelectItem>
                  <SelectItem value="norte">Norte</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="launch">Lançamento</SelectItem>
                  <SelectItem value="ready">Pronto Para Morar</SelectItem>
                  <SelectItem value="construction">Em Construção</SelectItem>
                </SelectContent>
              </Select>
              <Button className="h-12" variant="cta" onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Pesquisar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6">
            <p className="text-muted-foreground">Mostrando {filteredProperties.length} imóveis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Imoveis;
