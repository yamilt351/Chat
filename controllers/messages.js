import Message from "../models/message.js";
import Notification from "../models/notification.js";

export const sendMessage = async (req, res, next) => {
  console.log("sendMessage");
  const chatRoomId = req.params.chatRoomId;
  const message = req.body.content;
  if (!chatRoomId) {
    const error = new Error("chat room not found");
    error.status = 404;
    return next(error);
  } else if (!message) {
    const error = new Error("message not found");
    return next(error);
  } else {
    try {
      const newMessage = new Message({
        ...req.body,
        userId: req.user.id,
        chatRoomId: chatRoomId,
      });
      if (!newMessage) {
        const error = new Error("message not found");
        error.status = 404;
        return next(error);
      }
      const newNotification = new Notification({
        chatRoomId: chatRoomId,
        message: message,
        read: false,
      });
      if (!newNotification) {
        const error = new Error("notification not found");
        error.status = 404;
        return next(error);
      }
      const savedNotification = await newNotification.save();
      const savedMessage = await newMessage.save();
      const io = req.app.get("io"); // Obtener el servidor de Socket.IO
      io.to(chatRoomId).emit("newNotification", savedNotification);
      io.to(req.params.chatRoomId).emit("newMessage", savedMessage);
      res
        .status(200)
        .send({ message: savedMessage, notification: savedNotification });
    } catch (error) {
      next(error);
    }
  }
};

export const editMessage = async (req, res, next) => {
  try {
    console.log("edit msg");
  } catch (error) {
    next(error);
  }
};
export const viewMessage = async (req, res, next) => {
  try {
    console.log("viewd");
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    console.log("deleting message");
  } catch (error) {
    next(error);
  }
};
export const messageById = async (req, res, next) => {
  try {
    console.log("get messageById");
  } catch (error) {
    next(error);
  }
};
export const searchMessage = async (req, res, next) => {
  try {
    console.log("search");
  } catch (error) {
    next(error);
  }
};
export const allMessages = async (req, res, next) => {
  try {
    console.log("all messages");
  } catch (error) {
    next(error);
  }
};
