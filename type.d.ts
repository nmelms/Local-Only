interface UploadResponse {
  path: string;
  fullPath: string; // Add fullPath if it's a possible property
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
