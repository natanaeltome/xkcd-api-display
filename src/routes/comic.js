const express = require('express')
const comicsRouter = express.Router()
const axios = require('axios')


comicsRouter.get('', async (req, res) => {
    try {
        const xkcdCurrentAPI = await axios.get(`https://xkcd.com/info.0.json`)
        const xkcdCurrentData = xkcdCurrentAPI.data
        res.render('comic', {
            data: xkcdCurrentData,
            num: xkcdCurrentData.num,
            currentNum: xkcdCurrentData.num,
            random: randomComicNumber(1, xkcdCurrentData.num),
            userCount: req.session.views['/']
        })
    }
    catch (err) {
        if (err.response) {
            res.render('comic', { data: null })
            console.log(err.response.data)
            console.log(err.response.status)
        } else if (err.request) {
            res.render('comic', { data: null })
            console.log(err.request)
        } else {
            res.render('comic', { data: null })
            console.error('Error', err.message)
        }
    }
})

comicsRouter.get('/:num', async (req, res) => {
    let comicNum = req.params.num
    try {
        const xkcdCurrentAPI = await axios.get(`https://xkcd.com/info.0.json`)
        const xkcdCurrentData = xkcdCurrentAPI.data

        const xkcdAPI = await axios.get(`https://xkcd.com/${comicNum}/info.0.json`)
        const xkcdData = xkcdAPI.data


        if (xkcdCurrentData.num !== xkcdData.num) {
            res.render('comic', {
                data: xkcdData,
                num: xkcdData.num,
                currentNum: xkcdCurrentData.num,
                random: randomComicNumber(1, xkcdCurrentData.num),
                userCount: req.session.views[`/${xkcdData.num}`]
            })
        } else {
            res.redirect('/')
        }
    }
    catch (err) {
        if (err.response) {
            res.render('comic', { data: null })
            console.log(err.response.data)
            console.log(err.response.status)
        } else if (err.request) {
            res.render('comic', { data: null })
            console.log(err.request)
        } else {
            res.render('comic', { data: null })
            console.error('Error', err.message)
        }
    }
})

function randomComicNumber(first, current) {
    return Math.floor(Math.random() * (current - first + 1) + first);
}

module.exports = comicsRouter