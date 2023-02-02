const Project = require("../models/project.model.ts")
const Task = require("../models/task.model.ts")
const jwt = require("jsonwebtoken")

module.exports.findAllProjects = (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const secretKey = process.env.JWT_SECRET_KEY
        const decoded = jwt.verify(token, secretKey)
        const id = decoded.userId
        Project.find({ users: id })
            .then(allProjects => res.json({ projects: allProjects }))
            .catch(err => res.json({ message: "something went wrong", error: err }))
    }
    catch (err) {
        console.log(err)
        res.json({ status: '400', error: 'invaild token' })
    }
}

module.exports.findSingleProject = (req, res) => {
    // const token = req.headers['x-access-token']
    // try {
    //     const secretKey = process.env.JWT_SECRET_KEY
    //     const decoded = jwt.verify(token, secretKey)
    //     const id = decoded.userId
    //     Project.findOne({ _id: req.params.id })
    //         .then(singleProject => res.json({ project: singleProject }))
    //         .catch(err => res.status(400).json(err))
    // }
    // catch (err) {
    //     console.log(err)
    //     res.status(400).json({err:'invaild token' })
    // }

    Project.findOne({ _id: req.params.id })
            .then(singleProject => res.json({ project: singleProject }))
            .catch(err => res.status(400).json(err))
}

module.exports.createNewProject = (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const secretKey = process.env.JWT_SECRET_KEY
        const decoded = jwt.verify(token, secretKey)
        const id = decoded.userId
        req.body.users = [id]
        Project.create(req.body)
            .then(newProject => res.json({ project: newProject }))
            .catch(err => res.status(400).json(err))
    }
    catch (err) {
        console.log(err)
        res.status(400).json('invaild token' )
    }
}

module.exports.updateProject = (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const secretKey = process.env.JWT_SECRET_KEY
        const decoded = jwt.verify(token, secretKey)
        const id = decoded.userId
        Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(updatedProject => res.json({ project: updatedProject }))
            .catch(err => res.status(400).json(err))
    }
    catch (err) {
        console.log(err)
        res.status(400).json('invaild token' )
    }
}

module.exports.deleteProject = (req, res) => {
    Project.deleteOne({ _id: req.params.id })
        .then(deletedProject => res.json({ project: deletedProject }))
        .catch(err => res.json({ message: "something went wrong", error: err }))
}

module.exports.findAllTasksOfProject = (req, res) => {
    // const token = req.headers['x-access-token']
    // try {
    //     const secretKey = process.env.JWT_SECRET_KEY
    //     const decoded = jwt.verify(token, secretKey)
    //     Task.find({ project_id: req.params.id })
    //         .then(Tasks => res.json({ tasks: Tasks }))
    //         .catch(err => res.status(400).json(err))
    // }
    // catch (err) {
    //     console.log(err)
    //     res.status(400).json({err:'invaild token' })
    // }
    Task.find({ project_id: req.params.id }).sort('updatedAt')
            .then(Tasks => res.json({ tasks: Tasks }))
            .catch(err => res.status(400).json(err))
}