import { IUser } from "./../types/user.type"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        }
    }
)

export default model<IUser>("User",userSchema);