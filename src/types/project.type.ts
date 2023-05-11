import { Document,Types } from "mongoose";  

export interface IProject extends Document {
    name: string
    description: string 
    project_leader: {
        type: Types.ObjectId
        ref: "User"
    }
}