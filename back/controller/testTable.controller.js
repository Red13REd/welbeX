const db = require('../db');

class TestTableController {
    async getAllTable(req, res) {
        try {
            const {page} = req.params;
            const table = await db.query(`SELECT * FROM test LIMIT $2 OFFSET (($1 - 1) * $1)`, [page, 10])
            const tableLength = await db.query(`SELECT * FROM test`)
            res.json({table: table.rows, totalLength: tableLength.rows.length})
        } catch {
            res.json('Some error')
        }
    }

    async getFiltered(req, res) {
        try {
            const {column, condition, value, page} = req.params;
            const table = await db.query(`SELECT * FROM test WHERE ${column} ${condition} $1 LIMIT $3 OFFSET (($2 - 1) * $3)`, [value, page, 10])
            const tableLength = await db.query(`SELECT * FROM test WHERE ${column} ${condition} $1 `, [value])
            res.json({table: table.rows, totalLength: tableLength.rows.length})
        } catch {
            res.json('Some error')
        }
    }

    async getFilteredByName(req, res) {
        try {
            const {value, page} = req.params;
            const table = await db.query(`SELECT * FROM test WHERE name ILIKE '${value}%' LIMIT $2 OFFSET (($1 - 1) * $1)`, [page, 10])
            const tableLength = await db.query(`SELECT * FROM test WHERE name ILIKE '${value}%' `)
            res.json({table: table.rows, totalLength: tableLength.rows.length})
        } catch {
            res.json('Some error')
        }
    }

    async getFilteredByContains(req, res) {
        try {
            const {value, page} = req.params;
            const table = await db.query(`SELECT * FROM test WHERE name ILIKE '%${value}%' LIMIT $2 OFFSET (($1 - 1) * $1)`, [page, 10])
            const tableLength = await db.query(`SELECT * FROM test WHERE name ILIKE '%${value}%'`)
            res.json({table: table.rows, totalLength: tableLength.rows.length})
        } catch {
            res.json('Some error')

        }
    }
}

module.exports = new TestTableController()