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

![img1](https://github.com/user-attachments/assets/312a1750-08b6-48e9-bff2-ad3a85d0e285)
![img-2](https://github.com/user-attachments/assets/857bf8a1-030e-47ed-aef4-2e94239da7d0)
![img-3](https://github.com/user-attachments/assets/b627f851-1cca-43f9-8435-566104706920)




