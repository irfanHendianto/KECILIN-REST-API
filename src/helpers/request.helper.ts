import { FastifyReply } from 'fastify';

const sendSuccessResponse = (reply: FastifyReply, data: any, statusCode: number) => {
  return reply.code(statusCode).send({ success: true, data });
};

const sendErrorResponse = (reply: FastifyReply, message: string, statusCode: number) => {
  return reply.code(statusCode).send({ success: false, error: { message } });
};

export { sendSuccessResponse, sendErrorResponse };
