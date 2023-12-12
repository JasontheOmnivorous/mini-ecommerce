import { CartItem } from "@/types/cart";
import { prisma } from "@/utils/db";
import { OrderStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cartItems = req.body as CartItem[];
  const cartItemIds = cartItems.map((item) => item.id);

  // validate total price again with real prices
  const dbProducts = await prisma.product.findMany({
    where: { id: { in: cartItemIds } }, // find for where the data ids are array of desired ids (cartItemIds)
  });

  const getProductPriceWithQuantity = (item: CartItem) => {
    // search for the product in the db with the same id
    const product = dbProducts.find((product) => product.id === item.id);
    // multiply price from backend and quantity from frontend
    if (product) return product?.price * item.quantity; // we can't use price from client side, since it's unreliable
  };

  let totalPrice = 0;
  cartItems.forEach((item) => {
    const price = getProductPriceWithQuantity(item);
    if (price) totalPrice += price;
  });

  // update order tabel with status and totalPrice
  // create method is for creating rows in the db
  const createOrder = await prisma.order.create({
    data: { status: OrderStatus.ORDERED, totalPrice },
  });
  // update orderline tabel with orderId, productId and quantity of the orders
  const orderId = createOrder.id;
  cartItems.forEach(async (item) => {
    const data = { orderId, productId: item.id, quantity: item.quantity };
    await prisma.orderline.create({ data });
  });

  // send order id and order status back to frontend
  return res.status(200).send({ orderId, status: OrderStatus.ORDERED });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
   await postHandler(req, res);
  } else {
    res.status(405).send("Method not defined.");
  }
};

export default handler;
