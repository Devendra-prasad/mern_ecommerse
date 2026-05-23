import { z } from "zod";

const listingSchema = z.object({
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
  status: z.enum(["active", "sold", "rented"]).optional(),
  isUpcoming: z.boolean().optional(),
  launchDate: z.string().optional(),
  hypeDescription: z.string().optional(),
}).refine(data => !data.offer || data.discountPrice < data.regularPrice, {
  message: "Discount price must be lower than regular price",
  path: ["discountPrice"],
});

const reqBody = {
  _id: "60f7a5b3b5a1a2b3c4d5e6f7",
  name: "Premium 3BHK starting",
  description: "This is a long description",
  address: "Some long address",
  regularPrice: 50,
  bathrooms: 1,
  bedrooms: 1,
  furnished: false,
  parking: false,
  type: "rent",
  offer: false,
  imageUrls: ["https://example.com/image.jpg"],
  userRef: "60f7a5b3b5a1a2b3c4d5e6f7",
  status: "active"
};

try {
  listingSchema.parse(reqBody);
  console.log("Validation successful");
} catch (error) {
  console.log("Validation failed:");
  console.log(JSON.stringify(error, null, 2));
}
