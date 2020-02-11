const fs = require('fs')
const child_process = require('child_process')
const path = require('path')

// Service for compiling
const compileLateX = (body, callback) => {
    fs.writeFile('input.tex', body, (error) => {
        if (error) {
            console.log("writeFile error!")
            return callback(error)
        }
        console.log("writeFile executed!")
        return callback(null)
    })

    runScript('pdflatex', ['input.tex'], (error, exit_code) => {
        if (error) {
            console.log(error)
            return callback(error)
        }
        console.log("Process finished.")
        console.log("Closing code: " + exit_code)
    })

    let files = ['input.aux', 'input.log', 'input.tex', 'input.pdf']

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