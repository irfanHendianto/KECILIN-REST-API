import { FastifyRequest } from "fastify";
import { AppError } from "../helpers/onError";

export function validateRoles(role: string) {
  return async function (request: FastifyRequest) {
    if (!request.user) {
        throw new AppError("Unauthorized Access", 401);
      }
      const { role: userRoles } = request.user as any
      const hasRequiredRole = role.toUpperCase() === userRoles.toUpperCase();
      if (!hasRequiredRole) {
        throw new AppError("Unauthorized Access", 401);
      }
  };
}