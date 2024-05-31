import Product from './models/Product';
import Producer from './models/Producer';

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
  }
};
