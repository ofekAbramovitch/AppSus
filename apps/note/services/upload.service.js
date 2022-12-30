export function loadImageFromInput(ev, onImage) {
    const reader = new FileReader()
    reader.onload = event => {
        let img = new Image() 
        img.src = event.target.result 
        img.onload = () => {
            onImage(img)
        }
    }
    reader.readAsDataURL(ev.target.files[0]) 
}