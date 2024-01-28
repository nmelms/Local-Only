interface UploadResponse {
  path: string;
  fullPath: string;
}
interface ShopFormData {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  description: string;
  imageURL: string;
}

interface DatabaseShopData {
  city: string;
  description: string;
  id?: number;
  type: string;
  geometry?: string;
  geometry_type?: string;
  imageURL: string;
  lat: number;
  lng: number;
  name: string;
  state: string;
  street: string;
  zip: string;
}

interface PopupStoreProps {
  popupData: DatabaseShopData;
}

interface PageProps {
  params: { id: number };
}
