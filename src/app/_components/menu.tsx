"use client"

import { Badge } from "@/components/ui/badge"
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
import { useMenuItem } from "../ai/services/queries"
import { Fragment } from "react"


export default function MenuInterface() {
  const { data, isLoading, error, mutate } = useMenuItem();

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>Manage your restaurant menu items</CardDescription>
          </div>
          <DialogUploaderDemo setDishes={(dishes) => {
            if (dishes) mutate();
          }} />
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
              {data && data.map((dish) => (
                <Fragment key={dish.dishName + dish.size + dish.price + Date.now().toString()}>
                  <TableRow>
                    <TableCell className="font-medium">
                      {dish.dishName}
                    </TableCell>
                    <TableCell>{dish.size || "N/A"}</TableCell>
                    <TableCell>${dish.price.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow >
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
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
