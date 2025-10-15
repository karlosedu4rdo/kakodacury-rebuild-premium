import { supabase, isSupabaseAvailable } from './supabase'
import { Property } from '@/contexts/PropertiesContext'

export interface DatabaseProperty {
  id: string
  name: string
  location: string
  region: string
  price: string
  area: string
  bedrooms: number
  bathrooms: number
  image: string
  status: "launch" | "ready" | "construction"
  featured?: boolean
  created_at?: string
  updated_at?: string
}

// Função para converter Property para DatabaseProperty
const propertyToDb = (property: Property): DatabaseProperty => ({
  ...property,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
})

// Função para converter DatabaseProperty para Property
const dbToProperty = (dbProperty: DatabaseProperty): Property => ({
  id: dbProperty.id,
  name: dbProperty.name,
  location: dbProperty.location,
  region: dbProperty.region,
  price: dbProperty.price,
  area: dbProperty.area,
  bedrooms: dbProperty.bedrooms,
  bathrooms: dbProperty.bathrooms,
  image: dbProperty.image,
  status: dbProperty.status,
  featured: dbProperty.featured
})

// Serviço de persistência de propriedades
export class PropertyService {
  private static STORAGE_KEY = 'kakodacury_properties'

  // Buscar todas as propriedades
  static async getProperties(): Promise<Property[]> {
    if (isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase!
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Erro ao buscar propriedades do Supabase:', error)
          return this.getPropertiesFromLocalStorage()
        }

        return data ? data.map(dbToProperty) : []
      } catch (error) {
        console.error('Erro de conexão com Supabase:', error)
        return this.getPropertiesFromLocalStorage()
      }
    }

    return this.getPropertiesFromLocalStorage()
  }

  // Adicionar nova propriedade
  static async addProperty(property: Property): Promise<Property> {
    if (isSupabaseAvailable()) {
      try {
        const dbProperty = propertyToDb(property)
        const { data, error } = await supabase!
          .from('properties')
          .insert([dbProperty])
          .select()
          .single()

        if (error) {
          console.error('Erro ao adicionar propriedade no Supabase:', error)
          return this.addPropertyToLocalStorage(property)
        }

        return dbToProperty(data)
      } catch (error) {
        console.error('Erro de conexão com Supabase:', error)
        return this.addPropertyToLocalStorage(property)
      }
    }

    return this.addPropertyToLocalStorage(property)
  }

  // Atualizar propriedade
  static async updateProperty(property: Property): Promise<Property> {
    if (isSupabaseAvailable()) {
      try {
        const dbProperty = {
          ...propertyToDb(property),
          updated_at: new Date().toISOString()
        }
        
        const { data, error } = await supabase!
          .from('properties')
          .update(dbProperty)
          .eq('id', property.id)
          .select()
          .single()

        if (error) {
          console.error('Erro ao atualizar propriedade no Supabase:', error)
          return this.updatePropertyInLocalStorage(property)
        }

        return dbToProperty(data)
      } catch (error) {
        console.error('Erro de conexão com Supabase:', error)
        return this.updatePropertyInLocalStorage(property)
      }
    }

    return this.updatePropertyInLocalStorage(property)
  }

  // Deletar propriedade
  static async deleteProperty(id: string): Promise<void> {
    if (isSupabaseAvailable()) {
      try {
        const { error } = await supabase!
          .from('properties')
          .delete()
          .eq('id', id)

        if (error) {
          console.error('Erro ao deletar propriedade no Supabase:', error)
          this.deletePropertyFromLocalStorage(id)
        }
      } catch (error) {
        console.error('Erro de conexão com Supabase:', error)
        this.deletePropertyFromLocalStorage(id)
      }
    } else {
      this.deletePropertyFromLocalStorage(id)
    }
  }

  // Deletar todas as propriedades
  static async deleteAllProperties(): Promise<void> {
    if (isSupabaseAvailable()) {
      try {
        const { error } = await supabase!
          .from('properties')
          .delete()
          .neq('id', '') // Deleta todos os registros

        if (error) {
          console.error('Erro ao deletar todas as propriedades no Supabase:', error)
          this.deleteAllPropertiesFromLocalStorage()
        }
      } catch (error) {
        console.error('Erro de conexão com Supabase:', error)
        this.deleteAllPropertiesFromLocalStorage()
      }
    } else {
      this.deleteAllPropertiesFromLocalStorage()
    }
  }

  // Métodos de fallback para localStorage
  private static getPropertiesFromLocalStorage(): Property[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Erro ao carregar propriedades do localStorage:', error)
      return []
    }
  }

  private static addPropertyToLocalStorage(property: Property): Property {
    const properties = this.getPropertiesFromLocalStorage()
    const newProperties = [...properties, property]
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newProperties))
    return property
  }

  private static updatePropertyInLocalStorage(property: Property): Property {
    const properties = this.getPropertiesFromLocalStorage()
    const updatedProperties = properties.map(p => p.id === property.id ? property : p)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedProperties))
    return property
  }

  private static deletePropertyFromLocalStorage(id: string): void {
    const properties = this.getPropertiesFromLocalStorage()
    const filteredProperties = properties.filter(p => p.id !== id)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProperties))
  }

  private static deleteAllPropertiesFromLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]))
  }
}
