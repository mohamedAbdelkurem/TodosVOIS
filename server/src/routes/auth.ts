import { Request, Response, Router } from "express";
import { isEmpty } from "class-validator";
// import { error } from "node:console";
import User from "../entity/User";
//var jwt = require('jwt-simple');
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt_decode from "jwt-decode";


const register = async (req: Request, res: Response) => {
  //GET VALUES
  const { username, password } = req.body;
  const email = req.body.email.toLowerCase();
  let errors: any = {};

  try {
    // Create the user
    //TODO
    //check if email or username are already taken
    //hash password using bcrypt



    // // Create the user

    //check if email or username are already taken

    const userEmail = User.findOne(email);

    if (userEmail) errors.email = "Sorry , this email used before !!";


    //hash password using bcrypt

    const password = await bcrypt.hash(req.body.password, 6)


    const user = await new User({ email, password, username }).save()
    console.log("values saved in db")




    // Return it ( u can return anything)
    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    switch (error.message) {
      //TODO
      //handle errors (email or username already taken)
      case "Sorry , this email used before !!":
        return res.status(401).json(errors);
      case "Sorry , this username  used before !!":
        return res.status(401).json(errors);
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
//todo 
//Login (good luck :)




const login = async (req: Request, res: Response) => {
  //GET VALUES
  let errors: any = {};
  const { password } = req.body;
  const email = req.body.email.toLowerCase();


  if (isEmpty(email)) errors.email = "this field is required";
  if (isEmpty(password)) errors.password = "this field is required";

  try {
    if (Object.keys(errors).length > 0) throw new Error("validation error");
    // check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "this email is not connected to any account";
      throw new Error("validation error");
    }
    console.log("user founded")

    // check if password match the username
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      errors.password = "password does not match";
      throw new Error("validation error");
    }
    console.log("password decrutped")
    console.log(req.body.email);
    console.log({ email })
    //
    // email & password are correct
    // create token
    //server -> token(id)
    const token = jwt.sign({ user: user.id, email: user.email, role: user.role }, 'rgtredkemddm');
    console.log(token)
    const decoded = jwt_decode(token);
    console.log(decoded)
    console.log({})
    //set token on the browser
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === "development", //connect from https after deployment
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res.json(user);

    // Return it ( u can return anything)

  } catch (error) {
    console.log(error)
    switch (error.message) {
      case "validation error":
        return res.status(401).json(errors);
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};


//Me 
const me = async (req: Request, res: Response) => {
  // console.log("hey");
  // console.log(req.cookies.token);
  // const getcookie =req.cookies.token;
  // console.log(getcookie);
  let errors: any = {};
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: "unauthenticated" });

    //if token true,  verification
    const { user }: any = jwt.verify(token, 'rgtredkemddm');

    const foundUser = await User.findOne({ id: user });
    return res.json(foundUser)
  } catch {
    console.log(errors)
    switch (errors) {
      //TODO
      //handle errors (email or username already taken)
      case "unauthenticated":
        return res.status(401).json(errors);

      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }



};
const admin = async (req: Request, res: Response) => {

  let errors: any = {};
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: "unauthenticated" });

    //if token true,  verification
    const { user }: any = jwt.verify(token, 'rgtredkemddm');

    const founduser = await User.findOne({ id: user });
    const role = founduser.role
    console.log(role)
    if (role === 'admin') {
      console.log("role checked and is admin")
      return res.json(founduser)
    }
    else {
      throw new Error("not admin")
    }


  } catch (error) {
    switch (error.message) {
      //TODO
      //handle errors (email or username already taken)
      case "unauthenticated User ":
        return res.status(401).json(errors);
      case "not admin":
        return res.status(401).json({ error: " you are not an admin" });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }


};

//logout

const logout = (_: Request, res: Response) => {
  try {
    res.set(
      "Set-Cookie",
      cookie.serialize("token", "", {
        secure: process.env.NODE_ENV === "development", //connect from https after deployment
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      })
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

/****  GET Tasks */
const getUsers = async (_: Request, res: Response) => {
  try {

    const users = await User.find();
   //console.log(articles)
    return res.status(200).json(users);

  } catch (error) {
    console.log("error");
    return res.status(500).json({ error: "something went wrong" });
  }
};

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", me);
router.get("/admin", admin);
router.get("/", getUsers);
router.delete("/logout", logout);
export default router;
