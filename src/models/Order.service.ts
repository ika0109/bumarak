import OrderItemModel from "../schema/OrderItem.model";
import OrderModel from "../schema/Order.model";
import { Member } from "../libs/types/member";

import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { ObjectId } from "mongoose";
import MemberService from "./Member.service";
import { OrderStatus } from "../libs/enums/order.enum";
import {
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../libs/types/order";
import { Order } from "../libs/types/order";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;
  private readonly memberService;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
    this.memberService = new MemberService();
  }

  public async createOrder(
    //parametr
    member: Member,
    input: OrderItemInput[]
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id); //argument
    const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
      // obshiy zakaz puli
      return accumulator + item.itemPrice * item.itemQuantity; // item => har bir produkta
    }, 0); // reduce yordamchi iteration method asosan total value bn ishledi
    const delivery = amount < 100 ? 5 : 0;

    try {
      const newOrder: Order = await this.orderModel.create({
        orderTotal: amount + delivery,
        orderDelivery: delivery,
        memberId: memberId,
      }); // bitta objectni argument sifatida beryapmiz u objectninichida 3 tani database yapmiz

      const orderId = newOrder._id;
      console.log("orderId:", orderId);

      await this.recordOrderItem(orderId, input); //argument orderimizdda kelayotgan har bir
      //  itemlarni databasega borib yozib keldi
      return newOrder;
    } catch (err) {
      console.log("Error, model: createOrder:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  private async recordOrderItem(
    orderId: ObjectId,
    input: OrderItemInput[] // parametr
  ): Promise<void> {
    // hich narsa qaytarmaydi

    // promisedlist bizga orderitem collectionga yozib kegan itemlarni array korinishida ozida saqlayapti
    const promisedList = input.map(async (item: OrderItemInput) => {
      // input => orderimiz
      item.orderId = orderId;
      item.productId = shapeIntoMongooseObjectId(item.productId);
      await this.orderItemModel.create(item);
      return "INSERTED";
    });

    console.log("promisedList:", promisedList);
    const orderItemsState = await Promise.all(promisedList); //promisedlist ichidagi har bir item
    // databasega borib
    //yozib kelib success bogandan keyin kuttrib keyingi mantiqqa otkazadi
    console.log("orderItemsState:", orderItemsState);
  }

  public async getMyOrders(
    member: Member,
    inquiry: OrderInquiry //parametr
  ): Promise<Order[]> {
    // orderlardan tashkil topgan arrayni return
    const memberId = shapeIntoMongooseObjectId(member._id);
    const matches = { memberId: memberId, orderStatus: inquiry.orderstatus }; // match => filter

    const result = await this.orderModel
      .aggregate([
        // complex mantiqlarni yaratyapti
        //array ichidagi objectlarni ketma ket shakllantirish uchun
        { $match: matches }, //$ aggregate maxsus operatori
        { $sort: { updatedAt: -1 } }, // eng ohirida yaratilganlarni
        { $skip: (inquiry.page - 1) * inquiry.limit }, //otkazvoradi
        { $limit: inquiry.limit }, // eng boshidagi nechta limit qoyilgan bolsa oshani
        {
          $lookup: {
            // boshqa collection bn ishlash (data obkelish)
            from: "orderItems", // orderitemdan qidir
            localField: "_id", // orderid ob beradi
            foreignField: "orderId", // orderitems collection ichidagi orderid
            as: "orderItems", // qaysi nom ostida olib berish
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "productData",
          },
        },
        {
          $lookup: {
            from: "members",
            localField: "memberId",
            foreignField: "_id",
            as: "Nana",
          },
        },
      ])

      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async updateOrder(
    member: Member,
    input: OrderUpdateInput
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id),
      orderId = shapeIntoMongooseObjectId(input.orderId),
      orderStatus = input.orderStatus;

    const result = await this.orderModel
      .findOneAndUpdate(
        {
          memberId: memberId,
          _id: orderId,
        },
        { orderStatus: orderStatus },
        { new: true }
      )
      .exec();

    if (!result)
      throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATED_FAILED);

    // orderStatus Pause => Process + 1
    if (orderStatus === OrderStatus.PROCESS) {
      await this.memberService.addUserPoint(member, 1);
    }
    return result;
  }
}

export default OrderService;
