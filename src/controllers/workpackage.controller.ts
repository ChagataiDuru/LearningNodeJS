import { Response, Request, NextFunction } from "express"
import { IWorkPackage } from "../types/workpackage.type"
import Workpackage from "../models/workpackage.model"

const getWorkpackages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const workpackages: IWorkPackage[] = await Workpackage.find().populate("workpackage_leader")
      res
      .status(200)
      .json({ workpackages })
    } catch (error) {
      next(error)
    }
  }
  
  const addWorkpackage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

        const body = req.body as Pick<IWorkPackage, "name" | "description" >

        const workpackage: IWorkPackage = new Workpackage({
          name: body.name,
          description: body.description,
        })
    
        const newWorkpackage: IWorkPackage = await workpackage.save()
        const allWorkpackages: IWorkPackage[] = await Workpackage.find()
    
        res
          .status(201)
          .json({ message: "Workpackage added", Workpackage: newWorkpackage, Workpackages: allWorkpackages })
      } catch (error) {
        next(error)
      }
    }
  
  const deleteWorkpackage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const deletedWorkpackage: IWorkPackage | null = await Workpackage.findByIdAndRemove(
          req.params.id
        )
        const allWorkpackages: IWorkPackage[] = await Workpackage.find()
        res
        .status(200)
        .json({
          message: "Workpackage deleted",
          Workpackage: deletedWorkpackage,
          Workpackages: allWorkpackages,
        })
      } catch (error) {
        next(error)
      }
  }

export default {getWorkpackages,addWorkpackage,deleteWorkpackage}