import Product from "../../models/Product";

export default async (req, res) => {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }

  async function handleGetRequest(req, res) {
    const { id } = req.query;
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  }
};

async function handleDeleteRequest(req, res) {
  const { id } = req.query;
  console.log(id);
  await Product.findOneAndDelete({ _id: id });
  res.status(204).json({});
}
