import { Document } from "mongodb";
import { model, Schema, Model } from "mongoose"
import { NextFunction } from "express";
import  bcrypt from "bcrypt"

import { IUser,IUserMethods } from "./../types/user.type"
import { IProject } from "../types/project.type"
import Project from "./project.model"

import isEmail from "validator/lib/isEmail"



type UserModel = Model<IUser, {}, IUserMethods>;

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
                validator: isEmail,
                message: (props: { value: String }) => `${props.value} is not a valid email`
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

userSchema.methods.comparePassword = function(password: string){
    return bcrypt.compareSync(password, this.password)
};

export default model<IUser,UserModel>("User",userSchema);