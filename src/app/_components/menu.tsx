"use client"

import { useState } from "react"
import { type Dish } from "@/types"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DialogUploaderDemo } from "@/app/_components/dialog-uploader-demo"

import useMenuItemData from "../ai/_hooks/use-menu-item-data"

export default function MenuInterface() {
  const [expandedDish, setExpandedDish] = useState<string | null>(null)
  const { menuItems, setMenuItems } = useMenuItemData()

  const toggleExpand = (dishName: string) => {
    if (expandedDish === dishName) {
      setExpandedDish(null)
    } else {
      setExpandedDish(dishName)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>Manage your restaurant menu items</CardDescription>
          </div>
          <DialogUploaderDemo setDishes={setMenuItems} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dish Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((dish) => (
                <>
                  <TableRow key={dish.dishName}>
                    <TableCell className="font-medium">
                      {dish.dishName}
                    </TableCell>
                    <TableCell>{dish.size || "N/A"}</TableCell>
                    <TableCell>${dish.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(dish.dishName)}
                      >
                        {expandedDish === dish.dishName ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow key={dish.dishName + Date.now().toString()}>
                    <TableCell colSpan={4} className="bg-muted/50">
                      <div className="p-2">
                        <div className="mb-2">
                          <span className="font-semibold">Categories:</span>{" "}
                          {dish.cookingMethods?.map((cat, i) => (
                            <Badge key={i} variant="outline" className="mr-1">
                              {cat}
                            </Badge>
                          )) || "None"}
                        </div>
                        <div>
                          <span className="font-semibold">Ingredients:</span>{" "}
                          {dish.ingredients?.join(", ") || "None"}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
