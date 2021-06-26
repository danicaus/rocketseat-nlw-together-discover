const Database = require("../db/config")

module.exports = {
    async create(req,res) {
        const db = await Database()
        const pass = req.body.password
        let roomId
        let checkRoomIds = true
        
        
        while(checkRoomIds){
            // Gera o número da sala
            for( var i = 0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString() 
            }
            //Checa se a sala já existe
            const createdRooms = await db.all(`SELECT id from rooms`) || []
            checkRoomIds = createdRooms.some(createdRoom => createdRoom === roomId)

            //Se não existir, vai salvar o id da sala no db
            if(!checkRoomIds){
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req,res) {
        const db = await Database()
        const roomId =  req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let checkQuestions

        if(questions.length == 0){
            if(questionsRead.length == 0){
                checkQuestions = true
            }
        }
        
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, checkQuestions: checkQuestions})
    },

    enter(req,res) {
        const roomId =  req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}