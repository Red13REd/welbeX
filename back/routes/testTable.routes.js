const Router = require('express')
const router = new Router()
const TestTableController = require('../controller/testTable.controller')


router.get('/table/:page', TestTableController.getAllTable)
router.get('/table/:column/:condition/:value/:page', TestTableController.getFiltered)
router.get('/table/name/:value/:page', TestTableController.getFilteredByName)
router.get('/table/contain/:value/:page', TestTableController.getFilteredByContains)


module.exports = router