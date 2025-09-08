import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "12345";

/** Creates a token with the given payload */
export function createToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

/** Extracts the payload from a token */
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    // You can throw or return null to handle it in your middleware
    return null;
  }
}
