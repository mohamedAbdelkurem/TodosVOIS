import { Request, Response, Router } from "express";
import Task from "../entity/Task";

import User from "../entity/User";
import auth from "../middlewears/auth";
import user from "../middlewears/user";



/****  GET Tasks */
const getTasks = async (_: Request, res: Response) => {
  try {

    const tasks = await Task.find();

    return res.status(200).json(tasks);

  } catch (error) {
    console.log("error");
    return res.status(500).json({ error: "something went wrong" });
  }
};


/**** Create Tasks */


const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  let errors: any = {};
  console.log(res.locals.user)
  try {
    const user = await User.findOne(res.locals.user.id)
    console.log("create Projct")
    console.log(title);
    console.log(description);

    if (!title) errors.title = "cannot be empty !!";
    if (!description) errors.description = "cannot be empty !!";

    if (Object.keys(errors).length > 0) throw new Error("cannot be empty !!")

    const newTask = await new Task({ title, description, user }).save()

    return res.status(200).json(newTask);
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

router.get("/", user, auth, getTasks)
router.post("/", user, auth, createTask);
export default router;