import sequelize from './config/database.js'
import app from './src/app.js'

const PORT = 3000
const startServer = async() => {
    try{
        await sequelize.sync()
        console.log('Database Synced');
        app.listen(PORT, () => {
            console.log("API is running")   
        })
    }catch(e){
        console.error("Error syncing Database:", e);
    }
}

startServer()
