"use client"

import * as React from "react"
import { Dish } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { getErrorMessage } from "@/lib/handle-error"
import { useUploadFile } from "@/hooks/use-upload-file"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FileUploader } from "@/components/file-uploader"

const schema = z.object({
  images: z.array(z.instanceof(File)),
})

type Schema = z.infer<typeof schema>

interface DialogUploaderDemoProps {
  setDishes: (dishes: Dish[]) => void
}

export function DialogUploaderDemo({ setDishes }: DialogUploaderDemoProps) {
  const [files, setFiles] = React.useState<File[]>([])

  const [loading, setLoading] = React.useState(false)
  const {
    onUpload,
    progresses,
    uploadedFiles,
    isUploading,
    prevUploadedFiles,
  } = useUploadFile("imageUploader", { defaultUploadedFiles: [] })
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      images: [],
    },
  })

  function onSubmit(input: Schema) {
    setLoading(true)

    toast.promise(onUpload(input.images), {
      loading: "Uploading images...",
      success: async () => {
        form.reset()
        const res = await fetch("/api/chat", {
          body: JSON.stringify({ url: prevUploadedFiles[0]?.ufsUrl }),
          method: "POST",
        })
        console.log("prev", prevUploadedFiles[0]!.ufsUrl)
        const data = (await res.json()) as { text: string }
        const menuItems = JSON.parse(data.text) as Dish[];

        // Use Promise.all to wait for all fetch requests to complete
        await Promise.all(menuItems.map((item) => 
          fetch("/api/menuItem", {
            body: JSON.stringify(item),
            method: "POST",
          })
        ));

        setLoading(false)
        return "Images uploaded"
      },
      error: (err) => {
        setLoading(false)
        return getErrorMessage(err)
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Upload files {files.length > 0 && `(${files.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFileCount={4}
                        maxSize={4 * 1024 * 1024}
                        progresses={progresses}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <Button className="w-fit" disabled={loading}>
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
