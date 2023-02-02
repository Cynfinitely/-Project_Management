const Task = require("../models/task.model.ts")
const Comments = require("../models/comment.model.ts")
const jwt = require("jsonwebtoken")
const Project = require("../models/project.model.ts")


module.exports.findAllTasks = (req, res) => {
    Task.find()
        .then(allTasks => res.json({ tasks: allTasks }))
        .catch(err => res.json({ message: "something went wrong", error: err }))
}

module.exports.findSingleTask = (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const secretKey = process.env.JWT_SECRET_KEY
        const decoded = jwt.verify(token, secretKey)
        const id = decoded.userId
        Task.findOne({ _id: req.params.id })
            .then(singleTask => res.json({ task: singleTask }))
            .catch(err => res.status(400).json(err))
    }
    catch (err) {
        console.log(err)
        res.status(400).json('invaild token')
    }
}

module.exports.createNewTask = (req, res) => {
    Task.create(req.body)
        .then(newTask => res.json({ task: newTask }))
        .catch(err => res.status(400).json(err))
}

module.exports.updateTask = (req, res) => {
    // const token = req.headers['x-access-token']
    // try {
    //     const secretKey = process.env.JWT_SECRET_KEY
    //     const decoded = jwt.verify(token, secretKey)
    //     const id = decoded.userId
    //     Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    //         .then(updatedTask => {
    //             if (req.body.assigned_id) {
    //                 Project.findByIdAndUpdate(
    //                     { _id: req.body.project_id },
    //                     { $push: { users: req.body.assigned_id } },
    //                     { new: true, runValidators: true },
    //                     function (error, success) {
    //                         if (error) {
    //                             console.log(error);
    //                         } else {
    //                             console.log(success);
    //                         }
    //                     })

    //             }
    //             res.json({ task: updatedTask })
    //         })
    //         .catch(err => res.status(400).json(err))
    // }
    // catch (err) {
    //     console.log(err)
    //     res.status(400).json({ err: 'invaild token' })
    // }


    Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedTask => {
            Project.findOne({ _id: req.body.project_id, users: req.body.assigned_id }, (err, project) => {
                // user is a single document which may be null for no results
                if (err) {
                    // handle error
                    return;
                }
                if (project) {
                    // there is user)
                    return;
                }
                else{
                    if (req.body.assigned_id && project == null) {
                        Project.findByIdAndUpdate(
                            { _id: req.body.project_id },
                            { $push: { users: req.body.assigned_id } },
                            { new: true, runValidators: true },
                            function (error, success) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log(success);
                                }
                            })
                    }
                }
            })


            res.json({ task: updatedTask })
        })
        .catch(err => res.status(400).json(err))

}

module.exports.deleteTask = (req, res) => {
    Task.deleteOne({ _id: req.params.id })
        .then(deletedTask => res.json({ task: deletedTask }))
        .catch(err => res.json({ message: "something went wrong", error: err }))
}

module.exports.findAllCommentsOfTask = (req, res) => {
    Comments.find({ task_id: req.params.id })
        .then(Comments => res.json({ comments: Comments }))
        .catch(err => res.status(400).json(err))
}