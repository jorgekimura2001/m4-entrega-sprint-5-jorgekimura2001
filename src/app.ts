import "reflect-metadata"
import "express-async-errors"
import express from "express"
import handleErrorMiddleware from "./middlewares/handleError.middleware"
import userRouters from "./routes/users.route"
import sessionRouters from "./routes/sessions.route"
import categoryRouters from "./routes/categories.route"
import propertyRouters from "./routes/properties.route"


const app = express()
app.use(express.json())
app.use('/users', userRouters)
app.use('/login', sessionRouters)
app.use('/categories', categoryRouters)
app.use('/properties', propertyRouters)

app.use(handleErrorMiddleware)

export default app