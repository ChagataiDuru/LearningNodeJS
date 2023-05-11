import { Router } from "express"
import userHandlers from "../controllers/user/user.controller"

const router: Router = Router()

router.get("/users", userHandlers.loginRequired,userHandlers.getUsers)

//router.post("/add-user", addUser) deprecated

router.post("/signup", userHandlers.signUp)

router.post("/login", userHandlers.signIn)

//router.put("/edit-user/:id", updateTodo)

router.delete("/delete-user/:id", userHandlers.loginRequired,userHandlers.deleteUser)

export default router