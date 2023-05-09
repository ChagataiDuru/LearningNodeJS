import { Router } from "express"
import { getUsers, addUser, deleteUser, signUp, signIn } from "../controllers/user/user.controller"

const router: Router = Router()

router.get("/users", getUsers)

//router.post("/add-user", addUser) deprecated

router.post("/signup", signUp)

router.post("/login", signIn)

//router.put("/edit-user/:id", updateTodo)

router.delete("/delete-user/:id", deleteUser)

export default router