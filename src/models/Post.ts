import { Schema, model } from "mongoose";

const PostSchema: Schema = new Schema(
  {
    originId: {
      type: String,
      required: true,
    },
    ownerUserName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    noteImage: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Post", PostSchema);
