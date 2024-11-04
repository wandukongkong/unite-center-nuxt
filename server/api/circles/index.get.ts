export default defineEventHandler(async (event) => {
  try {
    return await CircleSchema.find({})
  }
  catch (error) {
    return error
  }
})
