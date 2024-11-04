export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await new CircleSchema(body).save()
  }
  catch (error) {
    return error
  }
})
