import { Document,Model } from "mongoose";  

export interface IUser extends Document {
    name: string
    age: number
    email: String
    password: string
}

export interface IUserMethods extends Model<IUser> {
    comparePassword(password: string): boolean;
}