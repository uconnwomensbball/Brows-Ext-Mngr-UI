const extensionsContainer = document.getElementById("extensions-container")
let jsonData = ""

//BUTTONS
const allBtn = document.getElementById("all-btn");
const activeBtn = document.getElementById("active-btn")
const inactiveBtn = document.getElementById("inactive-btn")
const toggleModeBtn = document.getElementById("toggle-mode-btn")
const toggleModeImg = toggleModeBtn.querySelector("img")
toggleModeBtn.addEventListener("click", toggleMode)

//BACKGROUND MODE TOGGLE ELEMENTS
let darkMode = true
const bodyEl = document.getElementById("body-el")
const extensionListText = document.getElementById("extension-list-text")
const headerDiv = document.getElementById("header-div")
const logoDiv = document.getElementById("logo-div")

//FUNCTION - Retrieve JSON Extension Data 
try {
    const res = await fetch("./data.json")
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)}
    const data = await res.json()
        jsonData = data,  
        displayData(data)}
    catch (error) {
        console.error("Unable to fetch data:", error)}       

//Defaults "All" button to being highlighted 
allBtn.classList.add("bg-orange-600")
allBtn.classList.add("text-stone-950")
allBtn.classList.add("bg-slate-900")
 
//FUNCTION - Display Extensions in DOM
function displayData(data){
    
    const mappedData = data.map(function(extension){ 
      return `<div class = "flex-col justify-between items-center mx-2 my-2 px-4 rounded-3xl w-74 border p-3 ${darkMode? "bg-slate-900": "bg-stone-100 border-black"}">
              <div class = "flex mt-3 mb-9">
                <img src = "${extension.logo}" class = "mr-4 w-20 h-20"/>
                <div class = "flex-col">
                  <h1 class = "text-2xl font-semibold">${extension.name}</h1>
                  <p class = "text-xl">${extension.description}</p>
                </div>
              </div>
              
              <div class = "flex justify-between items-center">
                <button id = ${extension.id} class = "remove-btn text-xl ${darkMode? "bg-slate-900": "bg-stone-100 border-black"} px-4 py-2 rounded-3xl border hover:bg-orange-600 hover:text-stone-950">${extension.isActive? "Remove": "Add"}</button>
                <label class="inline-flex items-center cursor-default pointer-events-none">
                <input type="checkbox" value="" class="slide-btn sr-only peer" ${extension.isActive ? 'checked' : ''}>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-red-500 transition-colors duration-300 cursor-default pointer-events-none"></div>
                <div class="absolute w-5 h-5 bg-white rounded-full transform peer-checked:translate-x-full transition-transform duration-300 ml-1 mt-0.5 cursor-default pointer-events-none"></div>
                </label>
              </div>
            </div>`}).join("")
    extensionsContainer.innerHTML = mappedData}

//FUNCTION - Filter data from user clicks of "All", "Active" and "Inactive" buttons
document.addEventListener("click", function(e){
  
    if (e.target.id === "all-btn"){
         allBtn.classList.add("bg-orange-600");
         allBtn.classList.add("text-stone-950");
         allBtn.classList.add("bg-slate-900");
         
         activeBtn.classList.remove("bg-orange-600");
         activeBtn.classList.remove("text-stone-950");
         activeBtn.classList.remove("bg-slate-900");
         
         inactiveBtn.classList.remove("bg-orange-600");
         inactiveBtn.classList.remove("text-stone-950");
         inactiveBtn.classList.remove("bg-slate-900");   
         
         displayData(jsonData)}
         
    if (e.target.id === "active-btn"){
        let filteredActiveExt = jsonData.filter(function(extension){
            return extension.isActive === true})
            
            activeBtn.classList.add("bg-orange-600");
            activeBtn.classList.add("text-stone-950");
            activeBtn.classList.add("bg-slate-900");
            
            allBtn.classList.remove("bg-orange-600");
            allBtn.classList.remove("text-stone-950");
            allBtn.classList.remove("bg-slate-900");
            
            inactiveBtn.classList.remove("bg-orange-600");
            inactiveBtn.classList.remove("text-stone-950");
            inactiveBtn.classList.remove("bg-slate-900");
            
        displayData(filteredActiveExt)}
        
    if (e.target.id === "inactive-btn"){
        let filteredInactiveExt = jsonData.filter(function(extension){
            return extension.isActive === false})
            
         inactiveBtn.classList.add("bg-orange-600");
         inactiveBtn.classList.add("text-stone-950");
         inactiveBtn.classList.add("bg-slate-900");
            
         allBtn.classList.remove("bg-orange-600");
         allBtn.classList.remove("text-stone-950");
         allBtn.classList.remove("bg-slate-900");
         
         activeBtn.classList.remove("bg-orange-600");
         activeBtn.classList.remove("text-stone-950");
         activeBtn.classList.remove("bg-slate-900");  
            
         displayData(filteredInactiveExt)}
    
    if (e.target.classList.contains("remove-btn")){
        toggleisActive(e.target.id)}
})

//FUNCTION - Toggle isActive extension property
function toggleisActive(id){
   jsonData.filter(function(extension){  
        if (extension.id == id){
            extension.isActive = !extension.isActive
            return extension}})
    
         allBtn.classList.add("bg-orange-600")
         allBtn.classList.add("text-stone-950")
         allBtn.classList.add("bg-slate-900")
         
         activeBtn.classList.remove("bg-orange-600")
         activeBtn.classList.remove("text-stone-950")
         activeBtn.classList.remove("bg-slate-900")
         
         inactiveBtn.classList.remove("bg-orange-600")
         inactiveBtn.classList.remove("text-stone-950")
         inactiveBtn.classList.remove("bg-slate-900") 
    
    displayData(jsonData)
    }

//FUNCTION - Toggle Dark/Light Mode 
function toggleMode(){
   
    darkMode = !darkMode
    
    logoDiv.innerHTML = `<img src="${!darkMode? "logo-black.svg": "logo-white.svg"}"/>`
    if (!darkMode){
        //HEADER
        headerDiv.classList.add("bg-stone-100", "border-black")
        headerDiv.classList.remove("bg-slate-900")
        
        //BODY
        bodyEl.classList.add("bg-indigo-100", "text-black")
        bodyEl.classList.remove("bg-gradient-to-b")
        
        //EXTENSION LIST TEXT 
        extensionListText.classList.add("text-black")
        
        //BUTTONS
        toggleModeBtn.classList.add("bg-stone-100")
        toggleModeBtn.classList.add("hover:bg-indigo-100", "border-black")
        allBtn.classList.remove("bg-slate-900", "text-white")
        activeBtn.classList.remove("bg-slate-900", "text-white")
        inactiveBtn.classList.remove("bg-slate-900", "text-white")
        allBtn.classList.add("bg-stone-100", "border-black", "text-black")
        activeBtn.classList.add("bg-stone-100", "border-black", "text-black")
        inactiveBtn.classList.add("bg-stone-100", "border-black", "text-black")
        
        toggleModeImg.src = "icon-moon.svg"}
        
    else if (darkMode){
        //HEADER 
        headerDiv.classList.add("bg-slate-900")
        headerDiv.classList.remove("bg-stone-100", "border-black")
         
        //BODY
        bodyEl.classList.remove("bg-indigo-100", "text-black")
        bodyEl.classList.add("bg-gradient-to-b")
        
        //EXTENSION LIST TEXT
        extensionListText.classList.remove("text-black") 
        
        //BUTTONS
        toggleModeBtn.classList.add("hover:bg-orange-600")
        toggleModeBtn.classList.remove("hover:bg-indigo-100", "border-black")
        toggleModeBtn.classList.remove("bg-stone-100")
    
        allBtn.classList.add("bg-slate-900", "text-white")
        activeBtn.classList.add("bg-slate-900", "text-white")
        inactiveBtn.classList.add("bg-slate-900", "text-white")
        allBtn.classList.remove("bg-stone-100", "border-black")
        activeBtn.classList.remove("bg-stone-100", "border-black")
        inactiveBtn.classList.remove("bg-stone-100", "border-black")
        
        toggleModeImg.src = "icon-sun.svg"}
}