export type InventoryStatus = "ordered" | "received" | "in_stock" | "sold";

export type Item<T extends InventoryStatus = InventoryStatus> = {
  id: string;
  partNumber: string;
  partName: string;
  serialNumber: string;
  upc: string;
  price: number;
  status: T;
};
