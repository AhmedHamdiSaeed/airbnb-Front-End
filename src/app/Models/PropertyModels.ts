export interface RootProperty {
  quantity: number;
  properties: Property[];
}

export interface Property {
  id: number;
  name: string;
  displayedImage: string;
  description: string;
}
