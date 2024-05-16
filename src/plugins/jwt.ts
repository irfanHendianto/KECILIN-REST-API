import { FastifyReply, FastifyRequest } from "fastify";
import { getSession } from "../repository/auth";
import { AppError } from "../helpers/onError";

const jwtPluggins = async (request: FastifyRequest, reply: FastifyReply) => {
  const verify: any = await request.jwtVerify();
  request.user = {
    id: verify.id,
    email: verify.email,
    name: verify.name,
    role: verify.role,
  };
  const token: any = request.headers.authorization?.split("Bearer ")[1];
  const isExists = await getSession(verify.id, token);
  if (!isExists) {
    throw new AppError("Unauthorized Access", 401);
  }
};

export default jwtPluggins;
