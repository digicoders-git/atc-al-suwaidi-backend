import express from 'express'
import { create, getDemo, update, remove } from "../controllers/demo.controller.js"

const demoRoute = express.Router()

demoRoute.post("/create", create)
demoRoute.get("/get", getDemo)
demoRoute.put("/update/:id", update)
demoRoute.delete("/delete/:id", remove)

export default demoRoute