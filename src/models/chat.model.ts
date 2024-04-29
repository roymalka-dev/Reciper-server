import mongoose, { Schema, Document } from "mongoose";
import { IChat, IMessage } from "../types/db.types";

const messageSchema: Schema = new Schema(
  {
    performingUser: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const chatSchema: Schema = new Schema(
  {
    chatId: { type: String, required: true },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model<IChat>("Chat", chatSchema);
const Message = mongoose.model<IMessage>("Message", messageSchema);

export { Chat, Message };
