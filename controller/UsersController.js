const multer = require('multer')
const ProfileModel = require('../model/Profile')
const fs = require('fs')

// Create disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

// validation image
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!'
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
}

// handle upload image
const handleUpload = (req, res, next) => {
    // use storage on upload
    const upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar')

    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError)
        }

        // check err
        if (err instanceof multer.MulterError) {
            res.status(500).json('You can only upload up to 1 files')
        } else if (err) {
            next(err)
        }

        const img = fs.readFileSync(req.file.path)
        const encode_image = img.toString('base64')

        // save file to the database
        const image = new ProfileModel({
            name: req.body.name,
            avatar: {
                data: Buffer.from(encode_image, 'base64'),
                contentType: 'image/png',
            },
        })
        image.save()

        return res.json('success')
    })
}

const getUpload = async (req, res, next) => {
    const profile = await ProfileModel.findOne()

    const b64 = Buffer.from(profile.avatar.data).toString('base64')

    res.send(`<img src="data:${profile.avatar.contentType};base64,${b64}" />`)
}

// handle multiple upload image
const handleMultipleUpload = (req, res, next) => {
    const maxCount = 2
    // use storage on upload
    const uploadMultiple = multer({ storage: storage, fileFilter: imageFilter }).array('avatar', maxCount)
    uploadMultiple(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError)
        }

        // check err
        if (err instanceof multer.MulterError) {
            res.status(500).json(`You can only upload up to ${maxCount} files at a time`)
        } else if (err) {
            next(err)
        }

        // save each file to the database

        req.files.forEach((file) => {
            const img = fs.readFileSync(file.path)
            const encode_image = img.toString('base64')

            const image = new ProfileModel({
                name: req.body.name,
                avatar: {
                    data: Buffer.from(encode_image, 'base64'),
                    contentType: 'image/png',
                },
            })
            image.save()
        })

        return res.json('success')
    })
}

const getMultipleUpload = async (req, res, next) => {
    const photos = await ProfileModel.find()

    const imagesHtml = photos.map((photo) => {
        const b64 = Buffer.from(photo.avatar.data).toString('base64')
        return `<img src="data:${photo.avatar.contentType};base64,${b64}" />`
    })

    res.send(imagesHtml.join(''))
}

module.exports = {
    handleUpload,
    getUpload,
    handleMultipleUpload,
    getMultipleUpload,
}
