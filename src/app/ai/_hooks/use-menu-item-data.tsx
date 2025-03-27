import { type Dish } from "@/types";
import { useEffect, useState } from "react"
import useSWR from "swr";  
  
export default function useMenuItemData() {
    const { data: menuItems, isLoading, error } = useSWR("/api/menuItem", )

    useEffect(()=>{  
        const fetchMenuItems = async () => {
            const response = await fetch("/api/menuItem")
            const data = await response.json() as Dish[]
            setMenuItems(data)
        }
        fetchMenuItems().catch(console.error);
    }, [])

    return {
        menuItems,
        setMenuItems,
    }
}      