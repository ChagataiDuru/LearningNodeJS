import { Response, Request, NextFunction } from "express"
import { IProject,userPayload } from "../types/project.type"
import Project from "../models/project.model"

const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projects: IProject[] = await Project.find().populate("project_leader")
      res
      .status(200)
      .json({ projects })
    } catch (error) {
      next(error)
    }
  }
  
  const addProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

        const body = req.body as Pick<IProject, "name" | "description" >
        const _user: userPayload = <userPayload> req.user;
        const id = _user["_id"]

        const project: IProject = new Project({
          name: body.name,
          description: body.description,
          project_leader: id,
        })
    
        const newProject: IProject = await project.save()
        const allProjects: IProject[] = await Project.find()
    
        res
          .status(201)
          .json({ message: "Project added", Project: newProject, Projects: allProjects })
      } catch (error) {
        next(error)
      }
    }
  
  const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const deletedProject: IProject | null = await Project.findByIdAndRemove(
          req.params.id
        )
        const allProjects: IProject[] = await Project.find()
        res
        .status(200)
        .json({
          message: "Project deleted",
          Project: deletedProject,
          Projects: allProjects,
        })
      } catch (error) {
        next(error)
      }
  }

export default {getProjects,addProject,deleteProject}