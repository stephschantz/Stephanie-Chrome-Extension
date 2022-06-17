let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

//retrieves data from the localStorage and stores it in a variable 
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//function - save tab on click
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

//renders leads as plain tet inside the unordered list item
function render(leads) {
    let listItems = ""
    //appends the array of leads into the ulEl & anchor tag makes the url clickable 
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

//function to delete all saved data
deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//function renders out what's pushed inside the textbox 
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    //converts stored lead arrays into strings and saves them in localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})