const clrArr = document.querySelectorAll('.colour-scheme-item')
const clrCodeArr = document.querySelectorAll('.colour-code-item')

const colorSelectorEl = document.getElementById('selector-clr')
let hexColor = colorSelectorEl.value.slice(1, colorSelectorEl.length)

const schemeSelectorEl = document.getElementById('selector-scheme')
let scheme = schemeSelectorEl.value

const submitBtn = document.getElementById('submit-btn')
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target.form)
    // get data from form 
    hexColor = formData.get('color').slice(1, formData.get('color').length)
    scheme = formData.get('scheme')

    getColorScheme()
})

// fetching color scheme from the color api
function getColorScheme() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${scheme}&count=5`)
        .then(response => response.json())
        .then(data => {
            data.colors.map((clr, index) => {
                clrArr[index].style.backgroundColor = clr.hex.value
                clrCodeArr[index].innerHTML = clr.hex.value
            })
        })
}

getColorScheme()

// for each clrCodeArr item, add event listener to copy to clipboard
clrCodeArr.forEach(clrCode => {
    clrCode.addEventListener('click', (e) => {
        // if target doesn't have a span then copy the text
        if (!e.target.querySelector('span')) {
            e.preventDefault()
            const clrCode = e.target.innerHTML
            document.execCommand('copy')
            e.target.innerHTML += `<span class="popup">${clrCode} copied to clipboard<span>`
            setTimeout(() => {
                e.target.innerHTML = clrCode
            }, 2000)
        }
    })
})

