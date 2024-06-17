export interface Station {
  id: number;
  brandId: number;
  name: string;
  description: string;
  region: string;
  town: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  createdAt: string;
  prices: Price[];
  facilities: Facility[];
  brand: Brand;
  distanceFromSearchCoords: number;
}

export interface ICluster { 
  clusterName: string;
  stations: Station[];
}

export interface Price {
  id: number;
  stationId: number;
  fuelTypeId: number;
  price: number;
  updatedAt: string;
  fuelType: FuelType;
}

export interface FuelType {
  id: number;
  type: string;
  description: string;
}

export interface Facility {
  id: number;
  stationId: number;
  facilityId: number;
  updatedAt: string;
  facility: FacilityFullInfo;
}

export interface FacilityFullInfo {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}

export interface Brand {
  id: number;
  name: string;
  description: string;
  logo: string;
}
