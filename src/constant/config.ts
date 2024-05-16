import 'dotenv/config'

const config = {
  APP_PORT: process.env.PORT || 8000,
  MONGGO_URI: process.env.MONGGO_URI || 'mongodb://localhost:27017/test',
  SECRET_KEY: 'secret-key',
  SECRET_KEY_REFRESH: 'secret'
}

export default config
