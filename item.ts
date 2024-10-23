export type InventoryStatus = "ordered" | "received" | "in_stock" | "sold";

export type Item = {
  id: string;
  partNumber: string;
  partName: string;
  serialNumber: string;
  upc: string;
  price: number;
  status: InventoryStatus;
};
