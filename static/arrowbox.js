console.log('sds')

export function NewArrowBox(json) {
    var linker = '_' + Math.random().toString(36).substr(2, 9)
    json.for.setAttribute('arrowBoxbtnFor', linker)
    var arrowBox = document.createElement('div');
    arrowBox.setAttribute('arrowBoxFor', linker)
    arrowBox.setAttribute('arrowposition', 'up')
    var arrowboxdatacontainer = document.createElement('div');
    if (json.dataHtml != undefined) {
        arrowboxdatacontainer.innerHTML = json.dataHtml
    }
    if (json.data != undefined) {
        arrowboxdatacontainer.append(json.data)
    }
    arrowBox.append(arrowboxdatacontainer)
    arrowboxdatacontainer.style.maxHeight = "45vh";
    arrowboxdatacontainer.style.overflow = "auto";
    arrowboxdatacontainer.style.textAlign = "center";

    arrowBox.style.position = 'fixed'
    arrowBox.style.display = 'none'
    arrowBox.style.top = '0px'
    arrowBox.style.left = '0px'
    document.body.append(arrowBox)
    function arrowBoxShowfunc(){
        if(json.for.getAttribute('arrowboxbtnfor') != null)
        {if (arrowBox.style.display == "none") {
            arrowBox.style.display = "block"
    
        } else {
            arrowBox.style.display = "none"
        }
    
        arrowBox.style.top = json.for.getBoundingClientRect().bottom + 15 + "px"
        arrowBox.style.left = (json.for.getBoundingClientRect().left + (json.for.getBoundingClientRect().width / 2)) - (arrowBox.getBoundingClientRect().width / 2) + "px"
        arrowBox.setAttribute('arrowposition', 'up')
    
        if (json.for.getBoundingClientRect().bottom + 15 + arrowBox.getBoundingClientRect().height > window.innerHeight) {
            arrowBox.style.top = (json.for.getBoundingClientRect().top - arrowBox.getBoundingClientRect().height) - 15 + "px"
            arrowBox.setAttribute('arrowposition', 'down')
    
        }
        if (json.for.getBoundingClientRect().left + arrowBox.getBoundingClientRect().width > window.innerWidth) {
            arrowBox.style.left = json.for.getBoundingClientRect().left - ((json.for.getBoundingClientRect().left + arrowBox.getBoundingClientRect().width) - window.innerWidth) + "px"
        }}}
    json.for.addEventListener(json.event || 'click', arrowBoxShowfunc)
    if (json.functions != undefined) {
        json.functions()
    }

}

export function RemoveArrowBox(elem){
    elem.removeAttribute('arrowboxbtnfor')
    // elem.removeEventListener('click', arrowBoxShowfunc)

}


// document.body.addEventListener('click',function(e){
// if()
// })