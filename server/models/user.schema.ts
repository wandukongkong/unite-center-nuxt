import { defineMongooseModel } from '#nuxt/mongoose'

export const UserSchema = defineMongooseModel({
  name: 'User',
  schema: {
  user_name: {
    type: 'string',
    required: true
  },
  user_code: {
    type: 'string',
    required: true,
    unique: true
  },
  circle_code: {
    type: 'string'
  },
  role: {
    type: 'string',
    required: true
  },
  token: {
    type: 'string'
  }
},
})
