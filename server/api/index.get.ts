export default defineEventHandler(async (event) => {
  try {
    return await Schema.find({})
  }
  catch (error) {
    return error
  }
})
