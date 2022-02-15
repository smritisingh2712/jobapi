const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors/index')
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    //console.log(req.user)
    //console.log(req.params)
    const { user: { userId }, params: { id: jobId } } = req
    //console.log(userId, jobId)
    const job = await Job.findOne({ _id: jobId, createdBy: userId })

    res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, body: { company, position } } = req
    if (company === ' ' || position === ' ') {
        throw new BadRequestError("company and position can't be empaty")
    }
    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })

    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId })


    res.status(StatusCodes.OK).json({})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

module.exports = { getAllJobs, getJob, createJob, deleteJob, updateJob }