import { Router } from "express"
import userHandlers from "../controllers/user.controller"
import projectHandlers from "../controllers/project.controller"
import workpackageHandlers from "../controllers/workpackage.controller"

const router: Router = Router()

router.get("/users", userHandlers.loginRequired,userHandlers.getUsers)
//router.post("/add-user", addUser) deprecated
router.post("/signup", userHandlers.signUp)
router.post("/login", userHandlers.signIn)
//router.put("/edit-user/:id", updateTodo)
router.delete("/delete-user/:id", userHandlers.loginRequired,userHandlers.deleteUser)

router.get("/projects", userHandlers.loginRequired,projectHandlers.getProjects)
router.post("/create-project",userHandlers.loginRequired,projectHandlers.addProject)
router.delete("/delete-project/:id",userHandlers.loginRequired,projectHandlers.deleteProject)

router.get("/workpackages", userHandlers.loginRequired,workpackageHandlers.getWorkpackages)
router.post("/create-workpackage",userHandlers.loginRequired,workpackageHandlers.addWorkpackage)
router.delete("/delete-workpackage/:id",userHandlers.loginRequired,workpackageHandlers.deleteWorkpackage)

export default router