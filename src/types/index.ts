import { type ClientUploadedFileData } from "uploadthing/types"
import { z } from "zod"

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}

export const dishSchema = z.object({
  dishName: z.string().describe("Name of the dish"),
  cookingMethods: z
    .array(z.string().describe("Cooking methods of the dish"))
    .optional(),
  ingredients: z
    .array(z.string().describe("Ingredients of the dish"))
    .optional(),
  size: z
    .string()
    .describe("Size of the dish base on the size and cooking methods")
    .optional(),
  price: z.number().describe("Price of the dish"),
})

export type Dish = z.infer<typeof dishSchema>
