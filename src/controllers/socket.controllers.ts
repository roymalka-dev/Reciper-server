import { Socket } from "socket.io";
import { chatService } from "../services/db/chat.service";

interface Message {
  id?: string;
  text: string;
  performingUser: string;
}

export const socketControllers = {
  sendMessage: (socket: Socket) => {
    socket.on("message", async (newMessage: Message) => {
      const { id } = socket.handshake.query;

      try {
        if (id) {
          const chatId = String(id);
          socket.broadcast.to(id).emit("recieveMessage", newMessage);
          chatService.saveMessage(chatId, newMessage);
        }
      } catch (error) {
        socket.emit("updateError", { message: "Failed to update document." });
      }
    });
  },
  disconnect: (socket: Socket) => {
    socket.on("disconnect", () => {});
  },
};
