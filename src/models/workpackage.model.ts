import {IWorkPackage} from ".././types/workpackage.type"
import mongoose, { model, Schema } from "mongoose"


const workpackageSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        workpackage_leader: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        },
        workpackage_employees: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        }]
    },
    {timestamps: true} 
)

export default model<IWorkPackage>("Workpackage",workpackageSchema);