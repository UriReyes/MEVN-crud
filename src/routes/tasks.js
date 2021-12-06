const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get('/', async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const tasks = await Task.findById(id)
    res.json(tasks)
})

router.post('/', async (req, res) => {
    // await new Task(req.body)
    const task = new Task(req.body)
    await task.save()
    res.json({
        status: 'Tarea Guardada',
        data: task
    })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    await Task.findByIdAndUpdate(id, req.body)
    res.json({
        status: 'Tarea actualizada',
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await Task.findByIdAndRemove(id)
    res.json({
        status: 'Tarea eliminada',
    })
})

module.exports = router;