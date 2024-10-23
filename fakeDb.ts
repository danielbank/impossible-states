import type { InventoryStatus, Item } from "./item.ts";

const mockItems: Item[] = [
  {
    id: "1",
    partNumber: "12345",
    partName: "Widget",
    serialNumber: "A1",
    upc: "123456789012",
    price: 1.23,
    status: "in_stock",
  },
  {
    id: "2",
    partNumber: "54321",
    partName: "Gadget",
    serialNumber: "B2",
    upc: "210987654321",
    price: 4.56,
    status: "ordered",
  },
  {
    id: "3",
    partNumber: "13579",
    partName: "Doohickey",
    serialNumber: "C3",
    upc: "098765432109",
    price: 7.89,
    status: "received",
  },
  {
    id: "4",
    partNumber: "97531",
    partName: "Thingamajig",
    serialNumber: "D4",
    upc: "765432109876",
    price: 0.12,
    status: "sold",
  },
  {
    id: "5",
    partNumber: "24680",
    partName: "Whatchamacallit",
    serialNumber: "E5",
    upc: "654321098765",
    price: 3.45,
    status: "in_stock",
  },
  {
    id: "6",
    partNumber: "86420",
    partName: "Doodad",
    serialNumber: "F6",
    upc: "543210987654",
    price: 6.78,
    status: "ordered",
  },
  {
    id: "7",
    partNumber: "80246",
    partName: "Contraption",
    serialNumber: "G7",
    upc: "432109876543",
    price: 9.01,
    status: "received",
  },
  {
    id: "8",
    partNumber: "24680",
    partName: "Thingamabob",
    serialNumber: "H8",
    upc: "321098765432",
    price: 2.34,
    status: "sold",
  },
  {
    id: "9",
    partNumber: "13579",
    partName: "Doohickey",
    serialNumber: "I9",
    upc: "210987654321",
    price: 5.67,
    status: "in_stock",
  },
  {
    id: "10",
    partNumber: "86420",
    partName: "Doodad",
    serialNumber: "J0",
    upc: "098765432109",
    price: 8.9,
    status: "ordered",
  },
  {
    id: "11",
    partNumber: "12345",
    partName: "Widget",
    serialNumber: "K1",
    upc: "987654321098",
    price: 1.23,
    status: "received",
  },
  {
    id: "12",
    partNumber: "54321",
    partName: "Gadget",
    serialNumber: "L2",
    upc: "876543210987",
    price: 4.56,
    status: "sold",
  },
];

const updateItems = ({
  where,
  data,
}: {
  where: {
    id: {
      in: string[];
    };
  };
  data: {
    status: InventoryStatus;
  };
}): Item[] => {
  const baseItems = mockItems.filter((item) => where.id.in.includes(item.id));
  const hasStatus = !!data.status;
  const updatedItems = baseItems.map((item) => {
    return {
      ...item,
      status: hasStatus ? data.status : item.status,
    };
  });
  return updatedItems;
};

const findItems = ({
  where,
}: {
  where: {
    upc: {
      in: string[];
    };
    status?: InventoryStatus;
  };
}): {
  items: Item<InventoryStatus>[];
  unmatchedItems: Item<InventoryStatus>[];
} => {
  const baseItems = mockItems.filter((item) => where.upc.in.includes(item.upc));
  const hasStatus = !!where.status;
  const filteredItems = hasStatus
    ? baseItems.filter((item) => item.status === where.status)
    : baseItems;
  return {
    items: filteredItems,
    unmatchedItems: baseItems.filter((item) => !filteredItems.includes(item)),
  };
};

export const db = {
  items: {
    update: updateItems,
    findMany: findItems,
  },
};
