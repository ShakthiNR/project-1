# ANDISOR PROJECT


### Server

- Tech stacks: Express Js, Typescript, Mongo Db, Prisma
- To run the server use npm run dev
- To seed the data use npm run seed

```
1. Prisma ORM create,
2. Seed the data to mongodb  (npm run seed)
3. Api endpoints: GET, GET/:id, PUT/:id, POST
```

```
Improvement: 
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


### Client

- Tech stacks: React Js, Typescript
- To run the server cd /frontend and run npm run dev

```
1. Products listed
2. Pagination added
3. Expanding inner components added
```

```
Improvements: 
1. This Expanding inner components can be done by react libraries.
```

### Examples
![img1](https://github.com/user-attachments/assets/ec9b5c7d-df52-4061-b04a-258c4060994d) { width: 150px; }
![img-2](https://github.com/user-attachments/assets/953b3d14-c751-4b2f-9da7-740ba024bad1) { width: 150px; }
![img-3](https://github.com/user-attachments/assets/5a2c18c7-e259-404e-a580-126323e35c34) { width: 150px; }


