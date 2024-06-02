## GraphQL Product API

### About

A simple GraphQL API built with TypeScript, Express, MongoDB, and Mongoose. This API manages product and producer entities.

[Spec](https://github.com/lvnhmd/fr-product-api/blob/master/FR%20Backend%20Challange.pdf)

---

### Running in Development

Clone the repository:

`git clone https://github.com/lvnhmd/fr-product-api.git`

Navigate to the project directory:

`cd fr-product-api`

Run `docker-compose up --build` to start the application and the MongoDB database in Docker containers. The MongoDB database will be seeded with some initial data.

---

### API Endpoint Documentation

You can access the GraphQL API and the GraphiQL interface at http://localhost:4000 when the application is running.

#### Testing via GraphiQL

- Query a single product by its _id:

```
query {
  product(_id: "<product_id>") {
    name
    producer {
      name
      country
      region
    }
  }
}
```

- Query products by producer _id:
```
query {
  productsByProducer(producerId: "<producer_id>") {
    name
    vintage
  }
}

```

- Create multiple products:
```
mutation {
  createProducts(products: [
    {
      vintage: "2020",
      name: "New Product 1",
      producerId: "<producer_id>"
    },
    {
      vintage: "2019",
      name: "New Product 2",
      producerId: "<producer_id>"
    }
  ]) {
    _id
    name
    vintage
  }
}
```

- Update a single product:
```
mutation {
  updateProduct(_id: "<product_id>", input: {
    vintage: "2021",
    name: "Updated Product Name",
    producerId: "<producer_id>"
  }) {
    _id
    name
    vintage
  }
}

```
- Delete multiple products:

```
mutation {
  deleteProducts(
    ids: ["<product_id>",...]
  ) 
}

```
- Upsert products from a CSV file:

```
mutation {
  upsertProductsFromCSV 
}
````
This mutation will return true immediately before it does anything and then proceed to upsert the products from `data/all_listings.csv` while streaming it in batches of 100 rows. The unique key for each product is a combination of `Vintage, Product Name, Producer`. If a producer does not already exist, it will be created.

---

### TODO

- [ ] Write unit tests for resolvers
- [ ] Add end-to-end tests for the GraphQL API 

