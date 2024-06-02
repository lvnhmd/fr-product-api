import Product from "./models/Product";
import Producer from "./models/Producer";
import fs from "fs";
import csv from "csv-parser";

interface CSVRow {
  Vintage: number;
  "Product Name": string;
  Producer: string;
  Country: string;
  Region: string;
  Colour: string;
  Quantity: number;
  Format: string;
  "Price (GBP)": number;
  Duty: string;
  Availability: string;
  Conditions: string;
  ImageUrl: string;
}

const processBatch = async (batch: CSVRow[]) => {
  const bulkOps = [];
  for (const product of batch) {
    // console.log(`Next product in batch: ${JSON.stringify(product)}`);
    let producer = await Producer.findOne({ name: product.Producer });

    if (!producer) {
      try {
        producer = new Producer({
          name: product.Producer,
          country: product.Country,
          region: product.Region
        });
        await producer.save();
        // console.log(`Created new producer: ${producer.name}`);
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `Failed to create producer for product: "${JSON.stringify(
              product
            )}" with error: "${error.message}"`
          );
        } else {
          console.error("Unknown error when creating producer:", error);
        }
        continue; 
      }
    }

    bulkOps.push({
      updateOne: {
        filter: {
          vintage: product.Vintage,
          name: product["Product Name"],
          producerId: producer._id
        },
        update: {
          $set: {
            vintage: product.Vintage,
            name: product["Product Name"],
            producerId: producer._id,
            country: product.Country,
            region: product.Region,
            colour: product.Colour,
            quantity: product.Quantity,
            format: product.Format,
            price: product["Price (GBP)"],
            duty: product.Duty,
            availability: product.Availability,
            conditions: product.Conditions,
            imageUrl: product.ImageUrl
          }
        },
        upsert: true
      }
    });
  }

  if (bulkOps.length > 0) {
    await Product.bulkWrite(bulkOps);
    console.log(`Processed batch of ${bulkOps.length} products.`);
  }
};

export const upsertProductsFromCSV = async () => {
  const filePath = "data/all_listings.csv";
  const batchSize = 100;
  let currentBatch: CSVRow[] = [];
  const processingPromises: Promise<void>[] = [];

  const readStream = fs.createReadStream(filePath);

  readStream.on("error", (error) => {
    if (error instanceof Error) {
      console.error("Stream error:", error.message);
    } else {
      console.error("Unknown stream error:", error);
    }
  });

  const csvStream = readStream.pipe(csv());

  csvStream.on("data", (row: CSVRow) => {
    row.Vintage = parseInt(row.Vintage as unknown as string, 10);
    row.Quantity = parseInt(row.Quantity as unknown as string, 10);
    row["Price (GBP)"] = parseFloat(row["Price (GBP)"] as unknown as string);

    currentBatch.push(row);
    if (currentBatch.length >= batchSize) {
      const batch = [...currentBatch];
      currentBatch = [];
      const batchPromise = processBatch(batch);
      processingPromises.push(batchPromise);
    }
  });

  csvStream.on("end", async () => {
    if (currentBatch.length > 0) {
      processingPromises.push(processBatch(currentBatch));
    }
    await Promise.all(processingPromises);
    console.log("CSV processing completed.");
  });
};
