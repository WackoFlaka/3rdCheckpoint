import { AppState } from "../AppState.js"
import { Jot } from "../models/Jot.js"
import { loadState, saveState } from "../utils/Store.js"

function _saveJotFile() {
    saveState('jots', AppState.jots)
}

function _loadJotFiles() {
    const jotFilesFromLocalStorage = loadState('jots', [Jot])
    AppState.jots = jotFilesFromLocalStorage
}

class serviceJot {
    constructor() {
        console.log("Service is now being set")
        _loadJotFiles()
    }
    
    setActiveJot(id) {
        const foundJot = AppState.jots.find(jot => jot.id == id)
        AppState.activeJot = foundJot
    }
    
    closeActiveJot() {
        AppState.activeJot = ''
    }
    
    createJot(form) {
        const newJot = new Jot(form)
        AppState.jots.push(newJot)
        _saveJotFile()
    }
    
    removeJot(id) {
        const JotIndex = AppState.jots.findIndex(jot => jot.id == id)
        if(JotIndex == -1) {
            throw new error('Jot index was -1. Error has occured')
        }
        AppState.activeJot = ''
        AppState.jots.splice(JotIndex, 1)
        _saveJotFile()
    }
    
    updateJot(update) {
        const activeJot = AppState.activeJot
        activeJot.body = update
        activeJot.totalCharacters = update.length
        
        for(let i = 0; i < update.length; i++) {
            let currentCharacter = update[i]
            console.log(currentCharacter)
            if(currentCharacter == " ") {
                activeJot.totalWords += 1
            }
        }
        
        activeJot.lastAccessed = new Date()
        _saveJotFile()
        AppState.emit('activeJot')
    }
}

export const ServiceJot = new serviceJot()