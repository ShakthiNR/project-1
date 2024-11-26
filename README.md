### ANDISOR PROJECT


# Server

- Tech stacks: Express Js, Typescript, Mongo Db, Prisma
- To run the server use npm run dev
- To seed the data use npm run seed

```
1. Prisma ORM create,
2. Seed the data to mongodb 
3. Api endpoints: GET, GET/:id, PUT/:id, POST
```

```
Note: 
1. Db scheme optimised solution
model Product {
  id                   String    @id @default(auto()) @map("_id") @db.ObjectId
  title                String
  price                Float
  discountPercentage   Float
  inventory            Int
  active               Boolean
  leadTime             String
  description          String
  category             String
  image                String
  primaryVariantName   String
  secondaryVariantName String
  productVariants      Variant[] @relation("ProductVariants") // One-to-many relation with Variant
}

model Variant {
  id                 String   @id @default(auto()) @map("_id") @db.ObjectId
  name               String
  price              Float
  discountPercentage Float
  inventory          Int
  active             Boolean? // Nullable if needed
  product            Product? @relation("ProductVariants", fields: [productId], references: [id]) // Back-reference to Product
  productId          String?  @db.ObjectId

  primaryVariants Variant[] @relation("primaryVariants") // One-to-many relation with Variant
  primaryVariant  Variant @relation("primaryVariants", fields: [primaryVariantId], references: [id], onDelete: NoAction, onUpdate: NoAction) // Self-referencing relation

  primaryVariantId String @db.ObjectId
}

2. Only some attribute in a product is updated in PUT/:id
```


# Client

- Tech stacks: React Js, Typescript
- To run the server use npm run dev

```
1. Products listed
2. Pagination added
3. Expanding inner components added
```