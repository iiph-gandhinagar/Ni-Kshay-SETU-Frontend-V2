export interface Country {
  _id: string;
  title: string;
}

export interface ResourceMaterialModule {
  _id: string;
  countryId: Country;
  stateId: string[];
  isAllState: boolean;
  cadreId: string[];
  isAllCadre: boolean;
  title: {
    en: string;
  };
  typeOfMaterials: string;
  parentId: string;
  iconType: string;
  index: number;
  createdBy: string;
  relatedMaterials: any[]; // Change to a more specific type if known
  id: number;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  __v: number;
}
