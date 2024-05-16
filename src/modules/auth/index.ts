

import * as handler from './handler'

import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'


const pluginAsync: FastifyPluginAsync = async (fastify, _option) => {
  fastify.route({
    url: '/login',
    method: 'POST',
    handler: handler.login,
    schema:{
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' , format : 'email' },
          password: { type: 'string' },
        },
      },
    }
  })

  fastify.route({
    url: '/logout',
    method: 'POST',
    onRequest: fastify.authenticate,
    handler: handler.logout,
  })

  fastify.route({
    url: '/refresh-token',
    method: 'POST',
    onRequest: fastify.authenticate,
    handler: handler.genereateNewToken,
    schema:{
      body: {
        type: 'object',
        properties: {
          refresToken: { type: 'string' },
        },
      },
    }
  })
}

export default fp(pluginAsync, {
  fastify: '4.x',
  name: 'auth-module',
})
