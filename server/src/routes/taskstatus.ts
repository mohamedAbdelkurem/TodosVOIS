import { Request, Response, Router } from "express";

import TaskStatus from "../entity/TaskStatus";

import User from "../entity/User";
import auth from "../middlewears/auth";
import user from "../middlewears/user";



/****  GET Taskstatus */
const getTaskStatus = async (_: Request, res: Response) => {
  try {

    const taskssttaus = await TaskStatus.find();

    return res.status(200).json(taskssttaus);

  } catch (error) {
    console.log("error");
    return res.status(500).json({ error: "something went wrong" });
  }
};


/**** Create Taskstatus */


const createTaskStatus = async (req: Request, res: Response) => {
  const { name } = req.body;
  let errors: any = {};
  console.log(res.locals.user)
  try {


    if (Object.keys(errors).length > 0) throw new Error("cannot be empty !!")

    const newTaskstatus = await new TaskStatus({ name }).save()

    return res.status(200).json(newTaskstatus);
  } catch (error) {
    console.log(error)
    switch (error.message) {
      case "cannot be empty !!":
        return res.status(401).json(errors);

      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
}





const router = Router();

router.get("/", user, auth, getTaskStatus)
router.post("/", user, auth, createTaskStatus);
export default router;