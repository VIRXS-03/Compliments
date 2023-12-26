import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://playground-53ce5-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input-field")
const inputFrom = document.getElementById("input-from")
const inputTo = document.getElementById("input-to")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementEl = document.getElementById("endorsement-el")
publishBtnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    let inputValueFrom = inputFrom.value
    let inputValueTo = inputTo.value
    
    if(inputFrom.value && inputTo.value  &&inputValue){
    push(endorsementListInDB, `From:${inputFrom.value}\n ${inputValue}\n To:${inputTo.value}`)
    
    clearInputFieldEl()
    clearInputFrom()
    clearInputTo()
}
else{}
})
onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearendorsementEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToendorsementEl(currentItem)
        }    
    } else {
        endorsementEl.innerHTML = "No items here... yet"
    }
})

function clearendorsementEl() {
    endorsementEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function clearInputFrom() {
    inputFrom.value = ""
}
function clearInputTo() {
    inputTo.value = ""
}

function appendItemToendorsementEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = `${itemValue}`
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorsementEl.append(newEl)
}
