import { Server as SocketIOServer } from "socket.io";
import redisClient from "./redisClient";

const addUser = async (userId: string, socketId: string) => {
  await redisClient.hSet("online_users", userId, socketId);
};

const removeUser = async (socketId: string) => {
  const users = await redisClient.hGetAll("online_users");

  for (const userId in users) {
    if (users[userId] === socketId) {
      await redisClient.hDel("online_users", userId);
    }
  }
};

const getUser = async (userId: string) => {
  return await redisClient.hGet("online_users", userId);
};

export const initializeSocket = (io: SocketIOServer) => {
  io.on("connection", (socket) => {
    socket.on("newUser", async (userId) => {
      await addUser(userId, socket.id);
    });

    socket.on("sendMessage", async ({ recieverId, data }) => {
      const receiverSocketId = await getUser(recieverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("getMessage", data);
      }
    });

    socket.on("disconnect", async () => {
      await removeUser(socket.id);
    });
  });

  io.listen(4000);
};
