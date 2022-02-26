import { Request, Response, Router } from "express";
import TaskHistory from "../entity/TaskHistory";

import User from "../entity/User";
import auth from "../middlewears/auth";
import user from "../middlewears/user";



/****  GET Taskhistory */

const getTaskHistory = async (_: Request, res: Response) => {
  try {

    const taskshistory = await TaskHistory.find({ relations: ["taskstatus", "task", "user"] });

    return res.status(200).json(taskshistory);

  } catch (error) {
    console.log("error");
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

const getTaskHistorybytasklastOne = async (req: Request, res: Response) => {

  const { task } = req.body;
  try {
    const taskshistory = await TaskHistory.find({ where: { task: task }, relations: ["taskstatus", "task", "user"], order: { createdAt: "DESC" }, take: 1 });



    console.log(taskshistory)
    return res.status(200).json(taskshistory);

  } catch (error) {
    console.log("error");
    return res.status(500).json({ error: "something went wrong" });
  }
};

const getTaskHistoryyTaskId = async (req: Request, res: Response) => {

  const { task } = req.body;
  try {
    const taskshistory = await TaskHistory.find({ where: { task: task }, relations: ["taskstatus", "task", "user"], order: { createdAt: "DESC" } });


    console.log(taskshistory)
    return res.status(200).json(taskshistory);

  } catch (error) {
    console.log("error");
    return res.status(500).json({ error: "something went wrong" });
  }
};

const createHistory = async (req: Request, res: Response) => {
  const { comment, assignedto, task, taskstatus } = req.body;
  let errors: any = {};
  console.log(res.locals.user)
  try {
    const user = await User.findOne(res.locals.user.id)
 


    if (!comment) errors.comment = "cannot be empty !!";
    if (!assignedto) errors.assignedto = "cannot be empty !!";
    if (!task) errors.task = "cannot be empty !!";
    if (!taskstatus) errors.taskstatus = "cannot be empty !!";

    
    if (Object.keys(errors).length > 0) throw new Error("cannot be empty !!")

    const newTaskHistory = await new TaskHistory({ comment, assignedto, task, taskstatus, user }).save()

    return res.status(200).json(newTaskHistory);
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


const getTaskHistoryAssignetLoginUser = async (_: Request, res: Response) => {
  try {

    const user = await User.findOne(res.locals.user.id)

    const taskshistoryforuser = await TaskHistory.find({ where: { assignedto: user } });
  
    return res.status(200).json(taskshistoryforuser);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};


const router = Router();

router.get("/", user, auth, getTaskHistory)
router.get("/user", user, auth, getTaskHistoryAssignetLoginUser);
router.put("/task", user, auth, getTaskHistorybytasklastOne);
router.put("/taskid", user, auth, getTaskHistoryyTaskId);

router.post("/", user, auth, createHistory);
export default router;