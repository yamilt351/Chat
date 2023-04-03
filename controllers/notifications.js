export const sendNotifications = async (req, res, next) => {
  try {
    console.log("send notifications");
  } catch (error) {
    next(error);
  }
};

export const deleteNotifications = async (req, res, next) => {
  try {
    console.log("delete notifications");
  } catch (error) {
    next(error);
  }
};
export const viewNotifications = async (req, res, next) => {
  try {
    console.log("view notifications");
  } catch (error) {
    next(error);
  }
};
export const getNotificationsById = async (req, res, next) => {
  try {
    console.log("get by id notifications");
  } catch (error) {
    next(error);
  }
};
export const allNotifications = async (req, res, next) => {
  try {
    console.log("notifications");
  } catch (error) {
    next(error);
  }
};
