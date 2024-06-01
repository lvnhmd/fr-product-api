import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Product {
    _id: ID!
    vintage: String!
    name: String!
    producerId: ID!
    producer: Producer
  }

  type Producer {
    _id: ID!
    name: String!
    country: String
    region: String
  }

  type Query {
    product(_id: ID!): Product
    productsByProducer(producerId: ID!): [Product]
  }

  input ProductInput {
    vintage: String!
    name: String!
    producerId: ID!
  }

  type Mutation {
    createProducts(products: [ProductInput]!): [Product]
    updateProduct(_id: ID!, input: ProductInput!): Product
    deleteProducts(ids: [ID]!): Boolean
  }
`);
