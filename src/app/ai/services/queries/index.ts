import { Dish } from "@/types"
import useSWR from "swr"

export function useMenuItem() {
  const { data, error, isLoading, mutate } = useSWR<Dish[]>("/api/menu-items")

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}