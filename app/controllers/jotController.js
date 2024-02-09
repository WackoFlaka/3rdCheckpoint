import { AppState } from "../AppState.js";
import { ServiceJot } from "../services/serviceJot.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawJotList() {
    const jots = AppState.jots
    console.log(jots)
    let html = ''
    jots.forEach(jot => html += jot.getListJots)
    setHTML('jotList', html)
}

function _drawTotalJots() {
    const totalJots = AppState.jots.length
    setHTML('totalJots', totalJots)
}

function _drawActiveJot() {
    const jot = AppState.activeJot
    console.log(jot);
    setHTML('JotCard', jot.JotCardTemplate)
    
}

export class jotController {
    constructor() {
        console.log("Controller is set")
        _drawJotList()
        _drawTotalJots()
        
        AppState.on('jots', _drawJotList)
        AppState.on('activeJot', _drawActiveJot)

    }
    
    setActiveJot(id) {
        ServiceJot.setActiveJot(id)
    }
    
    closeActiveJot() {
        ServiceJot.closeActiveJot()

    }
    
    createJot() {
        try {
        event.preventDefault()
        const form = event.target
        const jotFormData = getFormData(form)
        ServiceJot.createJot(jotFormData)
        _drawTotalJots()
        } catch(error) {
            console.error(error)
            Pop.error(error)
        }
    }
    
    async removeJot(id) {
        console.log("removing in controller..")
        const wantsToRemove = await Pop.confirm("Are you sure you want to delete this Jot?")
        if(!wantsToRemove) {
            return
        }
        ServiceJot.removeJot(id)
        _drawTotalJots()
    }
    
    updateJot() {
        const textAreaElement = document.getElementById('jotTextArea')
        const updatedJot = textAreaElement.value
        ServiceJot.updateJot(updatedJot)
    }
}