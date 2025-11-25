import * as z from "zod"

const optionPricerSchema = z.object({
  spotPrice: z.number(),
  strikePrice: z.number(),
  time: z.number(),
  volatility: z.number(),
  rate: z.number()
})

export { optionPricerSchema }