import fs from 'fs'
import path from 'path'

function deleteDirectory(directoryPath:string) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, i) => {
            const curPath = path.join(directoryPath, file)
            // Check if the current path is a dir, if so: go crazy with recursive!
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteDirectory(curPath)
            // if the curPath is a file, delete it.
            } else {
                fs.unlinkSync(curPath)
            }
        })
        // if have successfully looped through all of the shit inside of the dir,
        // at this point there isn't anything inside! then just delete the dir itself
        fs.rmdirSync(directoryPath)
        console.log(`Deleted =>\n"${directoryPath}"`)
    } else {
        console.log(`Directory "${directoryPath}" does not exist`)
    }
}

function main() {
    const ROOT_DIR = path.resolve(__dirname, '..')
    const DB_DIR_PATH = path.join(ROOT_DIR, 'prisma', 'db') 
    const MIGRATIONS_DIR_PATH = path.join(ROOT_DIR, 'prisma', 'migrations') 

    const pathsToBeDeleted =[DB_DIR_PATH, MIGRATIONS_DIR_PATH]
    pathsToBeDeleted.forEach(path => {
        deleteDirectory(path)
    })
}
main()