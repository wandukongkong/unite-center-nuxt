import { defineMongooseModel } from '#nuxt/mongoose'

export const Schema = defineMongooseModel({
  name: '',
  schema: {
  user_name: {
    type: 'string'
  },
  user_code: {
    type: 'string',
    unique: true
  },
  circle_code: {
    type: 'string'
  },
  role: {
    type: 'string',
    required: true
  }
},
})
