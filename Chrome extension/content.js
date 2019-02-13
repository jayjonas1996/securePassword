

    //console.log(list[i].type); 


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.pass.length >0){

        var list = document.getElementsByTagName('input')
        console.log(list)
        
        
        for (var i = 0; i < list.length; i++) {
        
            if(list[i].type == "password")
            {
                console.log(list[i])
                list[i].setAttribute('value',request.pass)
            }
            if(list[i].placeholder.includes("email") || list[i].placeholder.includes("username"))
            {
                list[i].setAttribute('value',request.username)
            }
        }
    }
       
    });