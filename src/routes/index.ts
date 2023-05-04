import { Router } from "express"
import { getUsers, addUser, deleteUser } from "../controllers/user/user.controller"

const router: Router = Router()

router.get("/users", getUsers)

router.post("/add-user", addUser)

//router.put("/edit-todo/:id", updateTodo)

router.delete("/delete-user/:id", deleteUser)

export default router