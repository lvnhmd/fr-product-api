db = db.getSiblingDB('productdb');

db.producers.insertMany([
  { _id: ObjectId(), name: "Martinez", country: "Portugal", region: "Port" },
  { _id: ObjectId(), name: "Finca Villacreces", country: "Spain", region: "Ribera del Duero" },
  { _id: ObjectId(), name: "Gazin", country: "France", region: "Bordeaux" }
]);

db.products.insertMany([
  { vintage: "1955", name: "Martinez", producerId: db.producers.findOne({ name: "Martinez" })._id },
  { vintage: "1994", name: "Martinez", producerId: db.producers.findOne({ name: "Martinez" })._id },
  { vintage: "2010", name: "Finca Villacreces Pruno", producerId: db.producers.findOne({ name: "Finca Villacreces" })._id },
  { vintage: "1981", name: "Gazin", producerId: db.producers.findOne({ name: "Gazin" })._id },
  { vintage: "1985", name: "Gazin", producerId: db.producers.findOne({ name: "Gazin" })._id },
  { vintage: "1998", name: "Gazin", producerId: db.producers.findOne({ name: "Gazin" })._id },
  { vintage: "2000", name: "Gazin", producerId: db.producers.findOne({ name: "Gazin" })._id },
  { vintage: "2001", name: "Gazin", producerId: db.producers.findOne({ name: "Gazin" })._id }
]);
