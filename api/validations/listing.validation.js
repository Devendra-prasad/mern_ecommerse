import { z } from "zod";

export const listingSchema = z.object({
  name: z.string().min(10, "Name must be at least 10 characters long").max(100, "Name must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  address: z.string().min(10, "Address must be at least 10 characters long"),
  regularPrice: z.coerce.number().positive("Regular price must be positive"),
  discountPrice: z.coerce.number().nonnegative("Discount price must be non-negative"),
  bathrooms: z.coerce.number().int().min(1, "At least one bathroom is required"),
  bedrooms: z.coerce.number().int().min(1, "At least one bedroom is required"),
  furnished: z.boolean(),
  parking: z.boolean(),
  type: z.enum(["rent", "sale"]),
  offer: z.boolean(),
  imageUrls: z.array(z.string().url("Invalid image URL")).min(1, "At least one image URL is required"),
  userRef: z.string(),
  isUpcoming: z.boolean().optional(),
  launchDate: z.string().optional(), // Flexible for YYYY-MM-DD from date pickers
  hypeDescription: z.string().optional(),
}).refine(data => !data.offer || data.discountPrice < data.regularPrice, {
  message: "Discount price must be lower than regular price",
  path: ["discountPrice"],
});
