import { generateId } from "../utils/GenerateId.js";

export class Jot {
    constructor (data) {
        this.id = generateId()
        this.title = data.title
        this.color = data.color
        this.body = data.body || ''
        this.totalCharacters = data.totalCharacters
        this.totalWords = data.totalWords
        this.createdAt = new Date()
        this.lastAccessed = data.lastAccessed ? new Date(data.lastAccessed) : new Date()
    }
    
   get getListJots() {
        return `
        <div class="d-flex align-items-baseline text-white py-1 ms-3" onclick="app.jotController.setActiveJot('${this.id}'); app.navController.closeNav()" style="cursor: pointer">
      <h3 class="me-3">${this.title}</h3> <span style="width: 20px; height: 20px; border: 2px solid white; background-color: ${this.color};"></span>
    </div>
        `
    }
    
    
    get JotCardTemplate() {
        return /*html*/`
        <div class="d-flex justify-content-center align-items-center">
      <div class="jot-card">
        <div class="row h-100">
          <div class="col-4 text-start text-white p-5">
          <span class="mdi mdi-window-close text-white closeJot" onclick="app.jotController.closeActiveJot()"></span>
            <div class="d-flex align-items-center">
              <h1 class="me-3">${this.title}</h1> <span style="width: 20px; height: 20px; border: 2px solid white; background-color: ${this.color};"></span>
            </div>
            <p>Created at: ${this.CreatedDate} at ${this.CreatedTime}</p>
            <p>Updated at: ${this.LastAccessedDate} at ${this.LastAccessedTime}</p>
            
            <p>Characters: ${this.totalCharacters}</p>
            <p>Words: ${this.totalWords2}</p>
            <button class="btn btn-warning" onclick="app.jotController.removeJot('${this.id}'); ">Delete Jot</button>
          </div>
          <div class="col-7 p-5">
            ${this.ReportBody}
          </div>
        </div>
      </div>
    </div>
        `
    }
    
    get CreatedDate() {
        return this.createdAt.toLocaleDateString()
    }
    
    get CreatedTime() {
        return this.createdAt.toLocaleTimeString()
    }
    
    get LastAccessedDate() {
        return this.lastAccessed.toLocaleDateString()
    }
    
    get LastAccessedTime() {
        return this.lastAccessed.toLocaleTimeString()
    }
    
    get totalWords2() {
        const words = this.body.split(' ')
        return words.length
    }
    
    get ReportBody() {
        return `
        <textarea onblur="app.jotController.updateJot()" name="body" id="jotTextArea" placeholder="Jot something down...">${this.body}</textarea>
        `
    }
}