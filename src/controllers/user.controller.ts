import { Response, Request, NextFunction } from "express"
import { IUser } from "../types/user.type"
import User from "../models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users: IUser[] = await User.find()
    res
    .status(200)
    .json({ users })
  } catch (error) {
    next(error)
  }
}

const addUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log(req.body)
      const body = req.body as Pick<IUser, "name" | "age" >
  
      const user: IUser = new User({
        name: body.name,
        age: body.age,
      })
  
      const newUser: IUser = await user.save()
      const allUsers: IUser[] = await User.find()
  
      res
        .status(201)
        .json({ message: "User added", user: newUser, users: allUsers })
    } catch (error) {
      next(error)
    }
  }

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deletedUser: IUser | null = await User.findByIdAndRemove(
        req.params.id
      )
      const allUsers: IUser[] = await User.find()
      res
      .status(200)
      .json({
        message: "User deleted",
        User: deletedUser,
        Users: allUsers,
      })
    } catch (error) {
      next(error)
    }
}

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, "name" | "age" | "email" | "password" >
    const email = req.body.email
    const password = req.body.password

    let isUserExist = await User.findOne({ email })

    if(isUserExist){
      throw "Email already in use"
    }

    bcrypt.hash(password, 10,(err, hash) => {
      if (err) throw new Error("Internal Server Error");
      const user: IUser = new User({
        name: body.name,
        age: body.age,
        email: body.email,
        password: hash,
      })

      user.save()
      .then(() => {
        res.status(201)
        .json({ message: "User created", user: user})
      })

    });

  }catch (error){
    next(error)
  }
}

const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  var mail: string = req.body.email;
  User.findOne({
    email: mail
  })
  .then(user => {
    
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user._id }, 'RESTFULAPIs') });
  })
  .catch(error => {
    next(error)
  })

  }

const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  if(req.user){
    console.log(req.user)
    next()
  }
  else{
    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
}

export default { getUsers, addUser, deleteUser, signUp, signIn, loginRequired }