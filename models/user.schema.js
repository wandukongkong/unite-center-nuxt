import { defineMongooseModel } from "#nuxt/mongoose";

export const UserSchema = defineMongooseModel({
  name: "User",
  schema: {
    name: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
      unique: true,
    },
  },
});
