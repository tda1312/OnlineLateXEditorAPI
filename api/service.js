const fs = require('fs')
const child_process = require('child_process')
const path = require('path')

// Service for compiling
const compileLateX = (body, res) => {
    fs.writeFile('input.tex', body, (error) => {
        if (error) {
            console.log("writeFile error!")
            return callback(error)
        }
        console.log("writeFile executed!")
        compileProcess()
    })

// Compile latex to pdf
const compileProcess = () => {    
    runScript('pdflatex', ['input.tex'], (error) => {
        if (error) {
            console.log(error)
            return callback(error)
        }
        console.log("Process finished.")
        console.log("Closing")
        // displayLateX()
    })
}

// Return pdf file
const displayLateX = () => {
    fs.readFile('input.pdf', (error, data) => {
        if (error) {
            console.log("readFile error!")
            return callback(error)
        }
        console.log("readFile executed!")
        res.set({
            'content-type': 'application/pdf; charset=utf-8' 
        })
        res.send(data)
    })
}

    // let files = ['input.aux', 'input.log', 'input.tex', 'input.pdf']

    // deleteFiles(files, (error) => {
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log("Cleaning complete.")
    //     }
    // })
}

const runScript = (command, args, callback) => {
    console.log("Starting process.")
    
    const child = child_process.spawn(command, args)

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        callback(code)
    })
}

const deleteFiles = (files, callback) => {
    console.log("Cleaning files.")
    
    files.forEach(element => {
        fs.unlink(path.join('../', element), (error) => {
            if (error) {
                console.log(error)
                callback(error)
                return
            }
            callback(null)
        })
    })
}

// Service for downloading
const downloadLateX = (res, callback) => {
    let file = path.join('./', 'input.pdf')
    let check = checkFile(file, (error) => {
        if (error) {
            console.log("Error checking file")
            return callback(error)
        }
        console.log("Checked file")
        return callback(null)
    })

    if (check == false) {
        res.send('No file to download')
    } else {
        res.download(file)
    }
}

// Check if pdf is available
const checkFile = (file, callback) => {
    fs.access(file, fs.F_OK, (error) => {
        if (error) {
            console.log(error)
            callback(error)
            return false
        } else {
            callback(null)
            return true
        }
    })
}

module.exports = {
    compileLateX,
    downloadLateX
}