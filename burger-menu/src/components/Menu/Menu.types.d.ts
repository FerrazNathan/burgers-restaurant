export interface MenuTypes {
  itemsMenu: MenuTypesProps[];
}

export interface MenuTypesProps {
  id: number
  name: string
  description?: any
  position: number
  visible?: number
  images: Image[]
  items: ItemProps[]
}

export interface Image {
  id: number
  image: string
}

export interface ItemProps {
  id: number
  name: string
  description?: string
  alcoholic: number
  price: number
  position: number
  visible?: number
  availabilityType: string
  sku?: string
  images?: Image2[]
  available: boolean
  modifiers?: Modifier[]
}

export interface Image2 {
  id: number
  image: string
}

export interface Modifier {
  id: number
  name: string
  minChoices: number
  maxChoices: number
  items: Item2[]
}

export interface Item2 {
  id: number
  name: string
  price: number
  maxChoices: number
  position: number
  visible: number
  availabilityType: string
  available: boolean
  qty?: number
}
