import { db } from "./fakeDb.ts";
import type { InventoryStatus, Item } from "./item.ts";

export async function sell(itemUpcs: string[]): Promise<Item[]> {
  const { items } = await db.items.findMany({
    where: {
      upc: {
        in: itemUpcs,
      },
    },
  });

  const sellableItems = items.filter(hasStatus("in_stock"));

  return await sellItems(sellableItems);
}

const sellItems = async (items: Item<"in_stock">[]) => {
  return await db.items.update({
    where: {
      id: {
        in: items.map((item) => item.id),
      },
    },
    data: {
      status: "sold",
    },
  });
};

const hasStatus =
  <T extends InventoryStatus>(status: T) =>
  (item: Item): item is Item<T> =>
    item.status === status;
