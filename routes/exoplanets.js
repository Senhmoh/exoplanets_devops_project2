const express = require('express')
const router = express.Router()

const Exoplanet = require('../models/Exoplanet.js')

/* GET exoplanets index. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
    res.render('exoplanets/index', { exoplanetsTable: Exoplanet.list() })
})

/* POST add exoplanet. */
// eslint-disable-next-line no-unused-vars
router.post('/add', (req, res, next) => {
    console.log('POST ADD EXOPLANET')

    if (checkWrittenRules(req.body.uniqueNameExoplanet)) {
        Exoplanet.save({
            uniqueName: req.body.uniqueNameExoplanet,
            hClass: req.body.hClassExoplanet,
            discoveryYear: req.body.discoveryYearExoplanet,
        })
    } else {
        throw 'Erreur dencodage'
    }
    res.redirect('/exoplanets')
})

/*Function to respect written rules */

function checkWrittenRules(exoplanet) {
    const validateur = /[^A-Z0-9.-]/
    if (validateur.test(exoplanet)) {
        return false
    } else {
        if (exoplanet === 'Trappiste$****01****-00') {
            return false
        } else {
            return true
        }
    }
}

/* GET search exoplanet. */
// eslint-disable-next-line no-unused-vars
router.get('/search', (req, res, next) => {
    let exoplanetsTable = null
    let min3Char = false
    console.log('GET SEARCH EXOPLANET')
    if (req.query.uniqueNameExoplanet.length >= 3) {
        min3Char = true
        exoplanetsTable = Exoplanet.search(req.query.uniqueNameExoplanet)
    }
    res.render('exoplanets/index', {
        exoplanetsTable,
        min3Char,
    })
})

module.exports = { router, checkWrittenRules }
