import { Document,Types } from "mongoose";  

export interface IWorkPackage extends Document {
    name: string
    description: string 
    workpackage_leader: {
        type: Types.ObjectId
        ref: "User"
    }
}