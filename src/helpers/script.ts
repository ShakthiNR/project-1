import logger from "@/infrastructure/logger";
import { PrismaClient } from "@prisma/client";
import * as jsonData from "../../public/Dummy API.json";

const prisma = new PrismaClient();
const Process = "Migrate data from json to db";

const run = async () => {
  try {
    logger.info(`Start ${Process}`);
    logger.info(`Data to be migrated: ${jsonData.length}`);
    let count = 0;

    for (let index = 0; index < jsonData.length; index++) {
      logger.info(`Migrating data ${++count} of ${jsonData.length}`);
      const {
        primary_variants,
        title,
        price,
        discountPercentage,
        inventory,
        active,
        leadTime,
        description,
        category,
        image,
        primary_variant_name,
        secondary_variant_name,
      } = jsonData[index];

      const date = new Date();

      let productId = await prisma.products.create({
        data: {
          title,
          price,
          discountPercentage,
          inventory,
          active,
          leadTime,
          description,
          category,
          image,
          primaryVariantName: primary_variant_name,
          secondaryVariantName: secondary_variant_name,
          createdAt: date,
          updatedAt: date,
        },
      });

      primary_variants?.forEach(async (primaryVarient) => {
        const {
          name,
          price,
          discountPercentage,
          inventory,
          active,
          secondary_variants,
        } = primaryVarient;

        // const findPrimaryVariant = await prisma.primaryVariants.findFirst({
        //   where: {
        //     name,
        //     price,
        //     discountPercentage,
        //     inventory,
        //     active,
        //   },
        // });

        // if (findPrimaryVariant) return;

        const _primaryVarient = await prisma.primaryVariants.create({
          data: {
            name,
            price,
            discountPercentage,
            inventory,
            active,
            createdAt: date,
            updatedAt: date,
            productId: productId.id,
          },
        });

        secondary_variants?.forEach(async (secondaryVarient) => {
          const { name, price, discountPercentage, inventory } =
            secondaryVarient;

         // const findSecondaryVariant = await prisma.secondaryVariants.findFirst(
          //   {
          //     where: {
          //       name,
          //       price,
          //       discountPercentage,
          //       inventory,
          //     },
          //   }
          // );

          // if (findSecondaryVariant) return;
            await prisma.secondaryVariants.create({
              data: {
                name,
                price,
                discountPercentage,
                inventory,
                createdAt: date,
                updatedAt: date,
                primaryVariantId: _primaryVarient.id,
              },
            });
        });
      });

      logger.info(`Migrating data ${count} is completed`);
    }
    logger.info(`End ${Process}`);
  } catch (err) {
    logger.info(`${Process} failed`);
    logger.error(err);
  }
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    logger.error("Error in running script");
    logger.info(err);
    await prisma.$disconnect();
    process.exit(1);
  });
