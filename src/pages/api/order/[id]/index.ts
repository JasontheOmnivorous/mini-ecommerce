import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Number(req.query.id);

  if (!id) return res.status(400).send("Invalid id.");

  const foundData = await prisma.order.findFirst({ where: { id } }); // find query id in the DB to validate
  if (!foundData) return res.status(400).send("Order not found.");

  // have to delete orderline first to delete the actual order, since they have FK relation
  // although we tend to just archive the data in real world, this is just a demo
  await prisma.orderline.deleteMany({ where: { orderId: id } });
  await prisma.order.deleteMany({ where: { id } });

  return res.status(205).send("Delete successful");
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    await deleteHandler(req, res);
  } else {
    res.status(405).send("Method not defined.");
  }
};

export default handler;
