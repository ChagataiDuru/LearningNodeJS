import { IUser } from "./../types/user.type"
import { model, Schema } from "mongoose"
import isEmail from "validator"

const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type:  Number,
            required: true,
        },
        email: {
            type: String,
            required: [true, 'Email is  required'],
            validate: {
                validator: isEmail
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            validate: {
                validator: function (value: String) {
                    return value.length >= 6
                },
                message: () => 'Password must be at least six characters long'
            }
        }
    },
    {timestamps: true} 
)

export default model<IUser>("User",userSchema);