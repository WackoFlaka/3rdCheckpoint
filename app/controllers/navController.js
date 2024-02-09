export class navController {
    constructor() {
        console.log("Navigation Side Bar has been set!")
    }
    
    openNav() {
        document.getElementById('sideBar').style.width = "350px"
    }
    
    closeNav() {
        document.getElementById('sideBar').style.width = "0"
    }
}