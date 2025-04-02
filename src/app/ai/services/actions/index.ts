import { Dish } from "@/types"
import useSWRMutation from "swr/mutation"

export async function createMenuItem(url: string, { item }: { item: Dish }) {
    const response = await fetch(url, {body: JSON.stringify(item), method: "POST"})

    if (!response.ok) {
        throw new Error("Failed to create menu item")
    }

    return response.json() as unknown as Dish
}

export function useCreateMenuItem() {
    const { trigger, isMutating } = useSWRMutation<Dish, Error, string, Dish>(
        "/api/menu-items",
        async (url, { arg }: { arg: Dish }) => {
            return createMenuItem(url, { item: arg })
        }
    )

    return { trigger, isMutating }
}
