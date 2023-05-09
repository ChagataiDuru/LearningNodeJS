import { Document } from "mongoose";  

export interface IUser extends Document {
    name: string
    age: number
    email: String
    password: String
}