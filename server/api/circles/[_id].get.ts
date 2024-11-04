export default defineEventHandler(async (event) => {
  try {
    return await CircleSchema.findOne({ _id: event.context.params?._id })
  }
  catch (error) {
    return error
  }
})
