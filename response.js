'use strict'

exports.status = (values, res) => {

    const data = {
        "status": 200,
        "values": values
    }

    res.status(data.status)
    res.json(data)
    res.end()

}