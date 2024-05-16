

import * as handler from './handler'

import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { validateRoles } from '../../middlewares/authRoles'


const pluginAsync: FastifyPluginAsync = async (fastify, _option) => {
  fastify.route({
    url: '/users',
    method: 'GET',
    onRequest: fastify.authenticate,
    handler: handler.getUsers,
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer' },
          pageSize: { type: 'integer' },
          sortBy: { type: 'string' },
          sortDirection: { type: 'string', enum: ['asc', 'desc'] },
          q: { type: 'string' },
        },
        additionalProperties: false,
      },
    } 
  })

  fastify.route({
    url: '/users',
    method: 'POST',
    onRequest: fastify.authenticate,
    handler: handler.addUsers,
    preHandler: validateRoles('ADMIN'),
    schema:{
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' , format : 'email' },
          age: { type: 'string' },
          gender: { type: 'string' },
          password: { type: 'string' },
        },
      },
    }
  })

  fastify.route({
    url: '/remove-users',
    method: 'DELETE',
    onRequest: fastify.authenticate,
    handler: handler.deleteUsers,
    preHandler: validateRoles('ADMIN'),
    schema:{
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' , format : 'email' },
        },
      },
    }
  })

  fastify.route({
    url: '/permission-users',
    method: 'PUT',
    onRequest: fastify.authenticate,
    handler: handler.changeRoleUser,
    preHandler: validateRoles('ADMIN'),
    schema:{
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' , format : 'email' },
          role: { type: 'string', enum: ['Admin', 'User']}
        },
      },
    }
  })
}

export default fp(pluginAsync, {
  fastify: '4.x',
  name: 'users-module',
})
