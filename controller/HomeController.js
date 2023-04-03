const HomeController = (req, res, next) => {
    res.render('index', { title: 'Express' })
}

module.exports = { HomeController }
