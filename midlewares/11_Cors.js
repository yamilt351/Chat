import cors from "cors";

export default cors({
  origin: ["*"],
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  credentials: true,
  maxAge: 4000000,
  exposedHeaders: ["Authorization"],
});
