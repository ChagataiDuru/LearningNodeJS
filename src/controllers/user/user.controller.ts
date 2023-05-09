import { Response, Request, NextFunction } from "express"
import { IUser } from "./../../types/user.type"
import  User from "../../models/user.model"

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
  
export { getUsers, addUser, deleteUser }