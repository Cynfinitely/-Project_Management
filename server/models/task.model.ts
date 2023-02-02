const mongoose = require("mongoose")

const taskScheme = mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [3, "Name must be at least 3 chars"]
        },

        description: String,

        status: {
            type: String,
            default: 'Idea',
        },

        due_date: Date,

        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project'
        },

        assigned_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
    },
    {
        timestamps: true
    })


const Task = mongoose.model('Task', taskScheme)

module.exports = Task