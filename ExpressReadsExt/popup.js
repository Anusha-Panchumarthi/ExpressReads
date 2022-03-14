
const myBtn = document.getElementById('myBtn')

myBtn.addEventListener('click', async()=>{
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let myText;
  try {
    [{myText}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => getSelection().toString(),
    });
  } catch (e) {
    return;}
    document.getElementById('para').innerHTML = myText
    document.getElementById('main').style.visibility = "visible"
    
})

  