import {IProject} from ".././types/project.type"
import mongoose, { model, Schema } from "mongoose"


const projectSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        project_leader: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true} 
)

export default model<IProject>("Project",projectSchema);