
const myBtn = document.getElementById('btn')

myBtn.addEventListener('click', async()=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    console.log(tab.url)

    var myTab  = tab.url
   
    
    
})


// function showColor(){
//     chrome.storage.sync.get('color', ({ color })=>{
//         document.body.style.backgroundColor = color;
        
//         document.getElementById('hehe').textContent = color;
     
//     })

   
// }