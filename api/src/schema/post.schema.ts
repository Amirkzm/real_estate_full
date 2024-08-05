import { z } from "zod";

enum Type {
  SALE = "SALE",
  RENT = "RENT",
}

enum Property {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
}

export const PostDetailsSchema = z.object({
  description: z.string().min(5).max(50),
  utilities: z.string().optional(),
  income: z.string().min(1).optional(),
  pet: z.string().optional(),
  size: z.number().int().min(1).optional(),
  school: z.number().optional(),
  bus: z.number().optional(),
  restaurant: z.number().optional(),
});

export const CreatePostSchema = z.object({
  title: z.string().min(5).max(50),
  price: z.number().int().min(1),
  images: z.array(z.string()).optional(),
  address: z.string(),
  city: z.string(),
  bedroom: z.number().int().min(1),
  bathroom: z.number().int().min(1),
  latitude: z.string(),
  longitude: z.string(),
  type: z.string().toUpperCase().pipe(z.nativeEnum(Type)),
  property: z.string().toUpperCase().pipe(z.nativeEnum(Property)),
  postDetails: PostDetailsSchema.optional(),
});

export type CreatePostDataType = z.infer<typeof CreatePostSchema>;

export const UpdatePostSchema = z.object({
  title: z.string().min(5).max(50).optional(),
  price: z.number().int().min(1).optional(),
  images: z.array(z.string()).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  bedroom: z.number().int().min(1).optional(),
  bathroom: z.number().int().min(1).optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  type: z.string().toUpperCase().pipe(z.nativeEnum(Type)).optional(),
  property: z.string().toUpperCase().pipe(z.nativeEnum(Property)).optional(),
});

export type UpdatePostDataType = z.infer<typeof UpdatePostSchema>;

const parseNumber = (value: unknown) => {
  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new Error("Invalid number");
    }
    return parsed;
  }
  if (typeof value === "number") {
    return value;
  }
  throw new Error("Invalid type");
};

export const GetPostsParamsSchema = z.object({
  city: z.string().optional(),
  property: z.string().toUpperCase().pipe(z.nativeEnum(Property)).optional(),
  type: z.string().toUpperCase().pipe(z.nativeEnum(Type)).optional(),
  bedroom: z.preprocess(parseNumber, z.number().int().min(0)).optional(),
  minPrice: z.preprocess(parseNumber, z.number().int().min(0)).optional(),
  maxPrice: z.preprocess(parseNumber, z.number().int().min(1)).optional(),
});

export type GetPostParamType = z.infer<typeof GetPostsParamsSchema>;
