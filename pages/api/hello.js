// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const path = require("path");
const fs = require("fs");
const solc = require("solc");

const Hello = (req, res) => {
  res.status(200).json({ name: "Mohcen Parsa" });
};

export default Hello;
