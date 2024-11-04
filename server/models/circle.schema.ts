import { defineMongooseModel } from '#nuxt/mongoose'

export const CircleSchema = defineMongooseModel({
  name: 'Circle',
  schema: {
  circle_name: {
    type: 'string'
  },
  create_date: {
    type: "date"
  },
  close_date: {
    type: "date"
  },
  circle_master_user_code: {
    type: 'string',
    required: true
  },
  circle_description: {
    type: 'string'
  },
  circle_oepn_url: {
    type: 'string',
    required: true
  }
},
})
