//chrome.tabs.query({active: true, currentWindow: true}, function(arrTabs) {
var uri = location.href//arrTabs[0].url.split('/')[2];
if(uri.includes("imx")  &&  !uri.includes("i.imx"))
{
    var list = document.getElementsByTagName('img')

    for (var i = 0; i < list.length; i++) {
        console.log(list[i].src)
        //console.log(list[i].class)
        //console.log(list[i].src.includes("https://imx.to/"))
        //if(list[i].class == "centred")
        //{console.log("class\n")}
        if(list[i].src.includes("https://imx.to/"))
        {console.log("src\n")}
        if( list[i].src.includes("https://imx.to/") && list[i].src.includes(".jpg")){
            console.log("bingo")
            window.location.assign(list[i].src)
            break
        }
    }
}

if(uri.includes("www.imagebam.com"))
{
    var list = document.getElementsByTagName('div')

    for (var i = 0; i < list.length; i++)
    {
        
        var elements = list[i].children

        for(var j = 0; j < elements.length; j++)
        {
            console.log(elements[j])
                if(elements[j].id.includes("i") && elements[j].src.includes("imagebam"))
                {
                    window.location.assign(elements[j].src)
                    break
                }
        }
    }
}


if(uri.includes("pixhost"))
{
    var list = document.getElementsByTagName('img')

    for (var j = 0; j < list.length; j++)
    {
        //console.log(list[j])
        if(list[j].id == "image" && list[j].src.includes("pixhost.to"))
        {
            window.location.assign(list[j].src)
            break
        }
    }
}

if(uri.includes("acidimg.cc"))
{
    var list = document.getElementsByTagName('img')

    for (var j = 0; j < list.length; j++)
    {
        //console.log(list[j])
        if(list[j].src.includes("acidimg.cc/upload"))
        {
            window.location.assign(list[j].src)
            break
        }
    }
}

if(uri.includes("imagetwist.com"))
{
    var list = document.getElementsByTagName('img')

    for (var j = 0; j < list.length; j++)
    {
        //console.log(list[j])
        if(list[j].src.includes("imagetwist.com")  && list[j].src != uri )
        {
            window.location.assign(list[j].src)
            break
        }
    }
}

if(uri.includes("imagezilla.net"))
{
    var list = document.getElementsByTagName('img')

    for (var j = 0; j < list.length; j++)
    {
        //console.log(list[j])
        if(list[j].src.includes("imagezilla.net")  && list[j].src != uri && list[j].id == "photo" )
        {
            window.location.assign(list[j].src)
            break
        }
    }
}

if(uri.includes("urlcash.net"))
{
    var list = document.getElementsByTagName('input')

    for (var j = 0; j < list.length; j++)
    {
        console.log(list[j])
        if(list[j].type == "imagetwist.com" )
        {
            console.log(list[j].onclick)
            var arr = list[j].onclick.toString().split('=')
            window.location.assign(arr[arr.length -1])
            break
        }
    }
}

if(uri.includes("imagevenue.com") || uri.includes("urlcash.net"))
{
    var list = document.getElementsByTagName('img')

    for (var j = 0; j < list.length; j++)
    {
        console.log(list[j])
        if(list[j].id == "thepic" )
        {
            window.location.assign(list[j].src)
            break
        }
    }
}
