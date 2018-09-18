const CanvasApi = require('kth-canvas-api')
const canvasApi = new CanvasApi(process.env.CANVAS_API_URL, process.env.CANVAS_API_KEY)
const log = require('./logger')

async function getUserCourses(req,res) {
    try {    
        const url = `${process.env.CANVAS_API_URL}/users/sis_user_id:${req.params.userKthId}/courses?per_page=100`
        const courses = await canvasApi.recursePages(url)
        const c_sis = await courses.filter(c => c.sis_course_id !== null)
        res.json(c_sis)
    }
    catch(err) {
        log.error("Something went wrong ", e)
        res.status(500).send('Internal server error!')
    }
}

module.exports = {getUserCourses}