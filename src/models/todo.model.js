import mongoose,{ Schema } from "mongoose";

const todoSchema = new Schema(
    {
        id:{
            type: String,
            unique: true,
            required: [true, "can't be blank"]
        },
        todoName : {
            type:String,
            required: [true, "can't be blank"]
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: String,
            required: [true, "can't be blank"]
        }

    },
    {
        timestamps: true,
    }
)

export const Todo = mongoose.model("Todo", todoSchema);