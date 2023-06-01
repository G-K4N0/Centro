import dotenv from 'dotenv'

dotenv.config({ path: './env' })
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080',
   'http://192.168.3.117:3000',
   'http://192.168.3.117:8080',
   'http://192.168.2.41:3000',
   'http://192.168.2.41:8080',
  'http://192.168.13.48:3000',
   'http://192.168.13.48:8080',
  process.env.URL_ORIGIN
]

export default allowedOrigins
