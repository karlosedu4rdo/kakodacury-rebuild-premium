import { useState } from "react";
import { Home, LogOut, Star, Eye, Edit, Trash, Download, Upload, Trash2, Image as ImageIcon, Users as UsersIcon, MapPin, Monitor, Calendar, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { PropertyFormDialog } from "@/components/PropertyFormDialog";
import { BannerFormDialog } from "@/components/BannerFormDialog";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useProperties, Property } from "@/contexts/PropertiesContext";
import { useBanners, Banner } from "@/contexts/BannersContext";
import { useLeads } from "@/contexts/LeadsContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"imoveis" | "content" | "leads">("imoveis");
  const { properties, addProperty, updateProperty, deleteProperty, deleteAllProperties, setProperties } = useProperties();
  const { banners, addBanner, updateBanner, deleteBanner, deleteAllBanners } = useBanners();
  const { leads, deleteLead, deleteAllLeads, exportLeads } = useLeads();
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [showBannerDialog, setShowBannerDialog] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>();
  const [editingBanner, setEditingBanner] = useState<Banner | undefined>();
  const [leadsFilterSource, setLeadsFilterSource] = useState<string>("all");
  const [leadsFilterDateStart, setLeadsFilterDateStart] = useState<string>("");
  const [leadsFilterDateEnd, setLeadsFilterDateEnd] = useState<string>("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin");
  };

  const stats = {
    total: properties.length,
    destaque: properties.filter(p => p.featured).length,
    avaliacao: Math.floor(properties.length / 2),
    pronto: properties.filter(p => p.status === "ready").length,
  };

  const handleAddProperty = () => {
    setEditingProperty(undefined);
    setShowPropertyDialog(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowPropertyDialog(true);
  };

  const handleSaveProperty = (property: Property) => {
    if (editingProperty) {
      updateProperty(property);
      toast.success("Imóvel atualizado com sucesso!");
    } else {
      addProperty(property);
      toast.success("Imóvel adicionado com sucesso!");
    }
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este imóvel?")) {
      deleteProperty(id);
      toast.success("Imóvel excluído com sucesso!");
    }
  };

  const handleDeleteAllProperties = () => {
    if (confirm(`Tem certeza que deseja excluir TODOS os ${properties.length} imóveis?\n\nEsta ação não pode ser desfeita!`)) {
      if (confirm("⚠️ CONFIRMAÇÃO FINAL: Isso irá apagar todos os imóveis permanentemente. Continuar?")) {
        deleteAllProperties();
        toast.success("Todos os imóveis foram excluídos!");
      }
    }
  };

  const handleToggleFeatured = (property: Property) => {
    updateProperty({ ...property, featured: !property.featured });
    toast.success(property.featured ? "Imóvel removido dos destaques" : "Imóvel adicionado aos destaques!");
  };

  const handleImageUpload = (property: Property, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verificar se é uma imagem
    if (!file.type.startsWith('image/')) {
      toast.error("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    // Verificar tamanho (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updateProperty({ ...property, image: reader.result as string });
      toast.success("Imagem atualizada com sucesso!");
    };
    reader.readAsDataURL(file);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      properties.map(p => ({
        Nome: p.name,
        Localização: p.location,
        Região: p.region,
        Preço: p.price,
        Área: p.area,
        Dormitórios: p.bedrooms,
        Banheiros: p.bathrooms,
        Status: p.status,
        Destaque: p.featured ? "Sim" : "Não",
        Imagem: p.image,
      }))
    );
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Imóveis");
    XLSX.writeFile(workbook, `imoveis_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success("Planilha exportada com sucesso!");
  };

  const handleImportFromExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        const importedProperties: Property[] = jsonData.map((row, index) => ({
          id: row.ID || `imported-${Date.now()}-${index}`,
          name: row.Nome || "",
          location: row.Localização || "",
          region: row.Região || "Centro",
          price: row.Preço || "",
          area: row.Área || "",
          bedrooms: parseInt(row.Dormitórios) || 1,
          bathrooms: parseInt(row.Banheiros) || 1,
          status: row.Status || "launch",
          featured: row.Destaque === "Sim",
          image: row.Imagem || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800",
        }));

        setProperties([...properties, ...importedProperties]);
        toast.success(`${importedProperties.length} imóveis importados com sucesso!`);
      } catch (error) {
        toast.error("Erro ao importar planilha. Verifique o formato do arquivo.");
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const handleAddBanner = () => {
    setEditingBanner(undefined);
    setShowBannerDialog(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setShowBannerDialog(true);
  };

  const handleSaveBanner = (banner: Banner) => {
    if (editingBanner) {
      updateBanner(banner);
      toast.success("Banner atualizado com sucesso!");
    } else {
      addBanner(banner);
      toast.success("Banner adicionado com sucesso!");
    }
    setShowBannerDialog(false);
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este banner?")) {
      deleteBanner(id);
      toast.success("Banner excluído com sucesso!");
    }
  };

  const handleDeleteAllBanners = () => {
    if (confirm(`Tem certeza que deseja excluir TODOS os ${banners.length} banners?\n\nEsta ação não pode ser desfeita!`)) {
      if (confirm("⚠️ CONFIRMAÇÃO FINAL: Isso irá apagar todos os banners permanentemente. Continuar?")) {
        deleteAllBanners();
        toast.success("Todos os banners foram excluídos!");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "default" | "success" | "secondary" }> = {
      launch: { label: "Lançamento", variant: "default" },
      ready: { label: "Pronto Para Morar", variant: "success" },
      construction: { label: "Em Construção", variant: "secondary" },
    };
    return variants[status] || variants.launch;
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Dashboard Admin - Kakodacury</span>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "imoveis" ? "default" : "outline"}
            onClick={() => setActiveTab("imoveis")}
          >
            <Home className="w-4 h-4 mr-2" />
            Imóveis
          </Button>
          <Button
            variant={activeTab === "content" ? "default" : "outline"}
            onClick={() => setActiveTab("content")}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Banco de Conteúdo (Banners)
          </Button>
          <Button
            variant={activeTab === "leads" ? "default" : "outline"}
            onClick={() => setActiveTab("leads")}
          >
            <UsersIcon className="w-4 h-4 mr-2" />
            Leads & Rastreamento
          </Button>
        </div>

        {activeTab === "imoveis" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Imóveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Destaque
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                {stats.destaque}
                <Star className="w-5 h-5 text-warning fill-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Avaliação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.avaliacao}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pronto para Morar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pronto}</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <Button variant="cta" onClick={handleAddProperty}>
            Adicionar Novo Imóvel
          </Button>
          <Button variant="outline" onClick={handleExportToExcel}>
            <Download className="w-4 h-4 mr-2" />
            Exportar Planilha
          </Button>
          <label>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleImportFromExcel}
              className="hidden"
            />
            <Button variant="outline" asChild>
              <span className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Importar Planilha
              </span>
            </Button>
          </label>
          {properties.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={handleDeleteAllProperties}
              className="ml-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Todos ({properties.length})
            </Button>
          )}
        </div>

        {/* Properties Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Região</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Dorms</TableHead>
                    <TableHead>Banh</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Destaque</TableHead>
                    <TableHead>Imagem</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">
                        {property.name}
                      </TableCell>
                      <TableCell>{property.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{property.region}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{property.price}</TableCell>
                      <TableCell>{property.area}</TableCell>
                      <TableCell>{property.bedrooms}</TableCell>
                      <TableCell>{property.bathrooms}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(property.status).variant as any}>
                          {getStatusBadge(property.status).label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={property.featured || false}
                            onCheckedChange={() => handleToggleFeatured(property)}
                          />
                          {property.featured && (
                            <Star className="w-4 h-4 text-warning fill-warning" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(property, e)}
                          />
                          <Button variant="outline" size="sm" asChild>
                            <span className="flex items-center gap-2">
                              <ImagePlus className="w-4 h-4" />
                              Upload
                            </span>
                          </Button>
                        </label>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => window.open(`/?preview=${property.id}`, '_blank')}
                            title="Visualizar"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditProperty(property)}
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProperty(property.id)}
                            title="Excluir"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
          </>
        )}

        {activeTab === "content" && (
          <>
            {/* Banners Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Gerenciar Banners</h2>
              <p className="text-muted-foreground">Gerencie os banners exibidos no carrossel da página inicial</p>
            </div>

            {/* Banner Actions */}
            <div className="flex gap-3 mb-6 flex-wrap">
              <Button variant="cta" onClick={handleAddBanner}>
                <ImageIcon className="w-4 h-4 mr-2" />
                Adicionar Novo Banner
              </Button>
              {banners.length > 0 && (
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAllBanners}
                  className="ml-auto"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Todos ({banners.length})
                </Button>
              )}
            </div>

            {/* Banners Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ordem</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Subtítulo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {banners
                        .sort((a, b) => a.order - b.order)
                        .map((banner) => (
                        <TableRow key={banner.id}>
                          <TableCell className="font-medium">{banner.order}</TableCell>
                          <TableCell>{banner.title}</TableCell>
                          <TableCell className="max-w-md truncate">{banner.subtitle}</TableCell>
                          <TableCell>
                            <Badge variant={banner.active ? "success" : "secondary"}>
                              {banner.active ? "Ativo" : "Inativo"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditBanner(banner)}
                                title="Editar"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteBanner(banner.id)}
                                title="Excluir"
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "leads" && (
          <>
            {/* Leads Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total de Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leads.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Formulários Enviados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {leads.filter(l => l.action === "form_submit").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cliques WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {leads.filter(l => l.action === "whatsapp_click").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {leads.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leads Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Filtrar por Origem</label>
                    <select
                      className="w-full px-3 py-2 border rounded-md"
                      value={leadsFilterSource}
                      onChange={(e) => setLeadsFilterSource(e.target.value)}
                    >
                      <option value="all">Todas as Origens</option>
                      {Array.from(new Set(leads.map(l => l.source))).map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data Inicial</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                      value={leadsFilterDateStart}
                      onChange={(e) => setLeadsFilterDateStart(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data Final</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                      value={leadsFilterDateEnd}
                      onChange={(e) => setLeadsFilterDateEnd(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setLeadsFilterSource("all");
                    setLeadsFilterDateStart("");
                    setLeadsFilterDateEnd("");
                  }}
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>

            {/* Leads Actions */}
            <div className="flex gap-3 mb-6 flex-wrap">
              <Button variant="default" onClick={exportLeads}>
                <Download className="w-4 h-4 mr-2" />
                Exportar Leads (JSON)
              </Button>
              {leads.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (confirm(`Tem certeza que deseja excluir TODOS os ${leads.length} leads?\n\nEsta ação não pode ser desfeita!`)) {
                      if (confirm("⚠️ CONFIRMAÇÃO FINAL: Isso irá apagar todos os leads permanentemente. Continuar?")) {
                        deleteAllLeads();
                        toast.success("Todos os leads foram excluídos!");
                      }
                    }
                  }}
                  className="ml-auto"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Todos ({leads.length})
                </Button>
              )}
            </div>

            {/* Leads Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Ação</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>Localização</TableHead>
                        <TableHead>Dispositivo</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(() => {
                        // Aplicar filtros
                        let filteredLeads = leads;
                        
                        // Filtrar por origem
                        if (leadsFilterSource !== "all") {
                          filteredLeads = filteredLeads.filter(l => l.source === leadsFilterSource);
                        }
                        
                        // Filtrar por data inicial
                        if (leadsFilterDateStart) {
                          const startDate = new Date(leadsFilterDateStart);
                          startDate.setHours(0, 0, 0, 0);
                          filteredLeads = filteredLeads.filter(l => new Date(l.timestamp) >= startDate);
                        }
                        
                        // Filtrar por data final
                        if (leadsFilterDateEnd) {
                          const endDate = new Date(leadsFilterDateEnd);
                          endDate.setHours(23, 59, 59, 999);
                          filteredLeads = filteredLeads.filter(l => new Date(l.timestamp) <= endDate);
                        }
                        
                        return filteredLeads.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                              {leads.length === 0 ? "Nenhum lead registrado ainda." : "Nenhum lead encontrado com os filtros aplicados."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredLeads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span className="text-sm">
                                  {new Date(lead.timestamp).toLocaleDateString('pt-BR')}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(lead.timestamp).toLocaleTimeString('pt-BR')}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                lead.action === "form_submit" ? "default" :
                                lead.action === "whatsapp_click" ? "success" :
                                "secondary"
                              }>
                                {lead.action === "form_submit" ? "Formulário" :
                                 lead.action === "whatsapp_click" ? "WhatsApp" :
                                 lead.action}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {lead.source}
                            </TableCell>
                            <TableCell>
                              {lead.formData?.nome || "-"}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col text-sm">
                                {lead.formData?.email && (
                                  <span className="truncate max-w-xs">{lead.formData.email}</span>
                                )}
                                {lead.formData?.telefone && (
                                  <span className="text-muted-foreground">{lead.formData.telefone}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {lead.ip}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                {lead.geolocation?.city || lead.geolocation?.country ? (
                                  <>
                                    <MapPin className="w-3 h-3" />
                                    <span>
                                      {lead.geolocation.city && lead.geolocation.country
                                        ? `${lead.geolocation.city}, ${lead.geolocation.country}`
                                        : lead.geolocation.city || lead.geolocation.country}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm max-w-xs">
                                <Monitor className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate" title={lead.device.userAgent}>
                                  {lead.device.platform}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    alert(JSON.stringify(lead, null, 2));
                                  }}
                                  title="Ver Detalhes"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => {
                                    if (confirm("Tem certeza que deseja excluir este lead?")) {
                                      deleteLead(lead.id);
                                      toast.success("Lead excluído com sucesso!");
                                    }
                                  }}
                                  title="Excluir"
                                >
                                  <Trash className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                        );
                      })()}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <PropertyFormDialog
        open={showPropertyDialog}
        onOpenChange={setShowPropertyDialog}
        property={editingProperty}
        onSave={handleSaveProperty}
      />
      
      <BannerFormDialog
        open={showBannerDialog}
        onOpenChange={setShowBannerDialog}
        banner={editingBanner}
        onSave={handleSaveBanner}
      />
    </div>
  );
};

export default Dashboard;
