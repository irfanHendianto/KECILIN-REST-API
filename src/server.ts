import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import connectDB from './constant/mongoDb';
import autoLoad from '@fastify/autoload';
import Ajv from 'ajv'
import ajvFormats from 'ajv-formats'

import { join } from 'path';
import fastifyJwt from '@fastify/jwt';
import config from './constant/config';
import jwtPluggins from './plugins/jwt';

const server = fastify({ logger: true });

connectDB();

const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    strict: false,
    allErrors: true,
})
  
ajvFormats(ajv)

server.register(autoLoad, {
    dir: join(__dirname, 'modules'),
    maxDepth: 2,
})
server.register(fastifyJwt, {
    secret: config.SECRET_KEY,
})

server.decorate('authenticate', jwtPluggins)

server.setErrorHandler((error, request, reply) => {
    // Customize the error response
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
  
    reply.status(statusCode).send({ status: statusCode, message });
  });
  

declare module 'fastify' {
export interface FastifyInstance {
        authenticate?: any 
    }
}

server.get('/', async (request, reply) => {
    return { hello: 'world' };
});

export const app: FastifyInstance = server
  