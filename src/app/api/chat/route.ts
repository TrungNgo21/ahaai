import { NextResponse, type NextRequest } from "next/server"
import { dishSchema } from "@/types"
import { google } from "@ai-sdk/google"
import { generateText, Output } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: NextRequest) {
  const reqBody = (await req.json()) as { url: string }
  const result = await generateText({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text" as const,
            text: "Extract the menu",
          },
          {
            type: "image" as const,
            image: reqBody.url,
          },
        ] as const,
      },
    ],
    model: google("gemini-2.0-flash-001"),

    experimental_output: Output.object({
      schema: z.array(dishSchema),
    }),
    // onFinish: async ({response}) => {
    //     try {
    //         await saveChat({
    //             id,
    //             messages: [...messages, ...response.messages],
    //             userId,
    //         });
    //     } catch (error) {
    //         console.log('error', error);
    //         console.error('Failed to save chat');
    //     }
    // },
  })

  return NextResponse.json(result)
}
