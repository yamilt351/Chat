export const createRoom = async (req, res, next) => {
  try {
    console.log("chat");
  } catch (error) {
    next(error);
  }
};

export const editRoom = async (req, res, next) => {
  try {
    console.log("editRoom");
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    console.log("deleting chat");
  } catch (error) {
    next(error);
  }
};

export const getIdRoom = async (req, res, next) => {
  try {
    console.log("get chat id");
  } catch (error) {
    next(error);
  }
};
export const searchRoom = async (req, res, next) => {
  try {
    console.log("searching chat");
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    console.log("getting all chats");
  } catch (error) {
    next(error);
  }
};
