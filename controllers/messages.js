export const sendMessage = async (req, res, next) => {
  try {
    console.log("sendMessage");
  } catch (error) {
    next(error);
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
			console.log('deleting message');
		} catch (error) {
			next(error)
		}
}
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
