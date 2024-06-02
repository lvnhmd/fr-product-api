import Product, { IProduct } from "./models/Product";
import Producer, { IProducer } from "./models/Producer";
import { upsertProductsFromCSV } from "./upsertProductsFromCSV";

export const root = {
  product: async ({ _id }: { _id: string }) => {
    const product = await Product.findById(_id).exec();
    if (product) {
      const producer = await Producer.findById(product.producerId).exec();
      return { ...product.toObject(), producer };
    }
    return null;
  },
  productsByProducer: async ({ producerId }: { producerId: string }) => {
    return await Product.find({ producerId }).exec();
  },
  createProducts: async ({ products }: { products: IProduct[] }) => {
    return await Product.insertMany(products);
  },
  updateProduct: async ({ _id, input }: { _id: string; input: IProduct }) => {
    const updatedProduct = await Product.findByIdAndUpdate(_id, input, {
      new: true
    });
    return updatedProduct;
  },
  deleteProducts: async ({ ids }: { ids: string[] }) => {
    await Product.deleteMany({ _id: { $in: ids } });
    return true;
  },
  upsertProductsFromCSV: async () => {
    process.nextTick(upsertProductsFromCSV);
    return true;
  }
};
