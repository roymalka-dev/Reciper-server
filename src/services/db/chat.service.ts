import { get } from "http";
import { Chat, Message } from "../../models/chat.model";

export const chatService = {
  saveMessage: async (chatId: string, message: any): Promise<any> => {
    try {
      let chat = await Chat.findOne({ chatId }).exec();

      const newMessage = new Message({
        performingUser: message.performingUser,
        text: message.text,
        date: new Date(),
      });
      newMessage.save();

      if (!chat) {
        chat = new Chat({
          chatId: chatId,
          messages: [newMessage],
        });
      } else {
        chat.messages.push(newMessage);
      }

      await chat.save();
      return chat; // Optionally return the updated/new chat document
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  },
  getChat: async (chatId: string): Promise<any> => {
    try {
      const chat = await Chat.findOne({ chatId: chatId }).exec();
      if (!chat) {
        console.log("No chat found with the provided chatId");
        return null;
      }
      return chat;
    } catch (error) {
      console.error("Error getting chat:", error);
      throw error;
    }
  },
};
