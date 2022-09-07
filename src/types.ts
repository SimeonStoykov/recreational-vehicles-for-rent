export interface VehicleDataItem {
  id: string;
  type: string;
  attributes: {
    name: string;
    url: string;
  };
  relationships: {
    primary_image: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface VehicleData {
  data: VehicleDataItem[];
  included: VehicleDataItem[];
}
