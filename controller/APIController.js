const { UserModel, DetailUserModel } = require('../model/User')

const getAllUser = async (req, res, next) => {
    try {
        let page = req.query.page
        const limit = req.query.limit || 10
        const docs = await UserModel.find({})
        const total_results = await UserModel.countDocuments()

        // get user by page
        if (page) {
            if (page < 1) {
                page = 1
            }

            const skip = (page - 1) * limit

            const docs = await UserModel.find({}).skip(skip).limit(limit)

            return res.json({
                page,
                result: docs,
                total_pages: Math.ceil(total_results / limit),
                total_results,
            })
        }

        // get all user

        res.json({
            result: docs,
            total_results,
        })
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = new UserModel(req.body)

        const docs = await user.save()

        createDetailUser(req.body.phone, docs._id)

        const output = {
            name: user.name,
            email: user.email,
            phone: req.body.phone,
        }

        res.json(output)
    } catch (error) {
        next(error)
    }
}

const createDetailUser = async (phone, ownerId) => {
    const detailUser = new DetailUserModel({
        phone,
        owner: ownerId,
    })

    return await detailUser.save()
}

const searchUser = async (req, res, next) => {
    try {
        const query = req.query.query
        let page = req.query.page
        const limit = req.query.limit || 10
        const docs = await UserModel.find({ name: { $regex: `^${query}`, $options: 'i' } }).exec()
        const total_results = await UserModel.countDocuments()

        if (!query) return

        // get user by query string
        if (page) {
            if (page < 1) {
                page = 1
            }

            const skip = (page - 1) * limit

            const docs = await UserModel.find({}).skip(skip).limit(limit)

            return res.json({
                page,
                result: docs,
                total_pages: Math.ceil(total_results / limit),
                total_results,
            })
        }

        res.json({
            result: docs,
            query_results: docs.length,
        })
    } catch (error) {
        next(error)
    }
}

const detailUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        const detailUser = await DetailUserModel.findOne({ owner: id }).populate('owner')

        const user = await UserModel.findById(detailUser.owner._id)

        const output = {
            _id: id,
            name: user.name,
            email: user.email,
            phone: detailUser.phone,
        }

        res.json(output)
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        const { name, email, phone } = req.body

        const user = await UserModel.findOneAndUpdate(
            {
                _id: id,
            },
            { $set: { name, email } }
        )

        const detailUser = await DetailUserModel.findOneAndUpdate({ phone })

        const output = {
            _id: id,
            name: user.name,
            email: user.email,
            phone: detailUser.phone,
        }

        res.json(output)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await UserModel.findOneAndDelete({ _id: id })
        const detailUser = await DetailUserModel.findOneAndDelete({ owner: id })

        const output = {
            _id: id,
            name: user.name,
            email: user.email,
            phone: detailUser.phone,
        }

        res.json(output)
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllUser, createUser, searchUser, detailUser, updateUser, deleteUser }
