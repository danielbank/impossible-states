import { db } from "./fakeDb.ts";
import type { Item } from "./item.ts";

export async function sell(itemUpcs: string[]): Promise<Item[]> {
  const { items } = await db.items.findMany({
    where: {
      upc: {
        in: itemUpcs,
      },
    },
  });

  return await sellItems(items);
}

const sellItems = async (items: Item[]) => {
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
