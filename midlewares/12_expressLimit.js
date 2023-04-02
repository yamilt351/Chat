import { rateLimit } from "express-rate-limit";
function limiter() {
  const limit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
  });
		return limit
}
export default limiter;
