const photoFile = document.getElementById('photo-file');
const photoPreview = document.getElementById('photo-preview');
let image;
let photoName;

// Input de imagem
document.getElementById('select-image').addEventListener('click', () => {
    photoFile.click();
});

photoFile.addEventListener('change', () => {
    const file = photoFile.files.item(0);
    photoName = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (event) => {
        image = new Image();
        image.src = event.target.result;
        image.addEventListener('load', onLoadImage)
    })
})

window.addEventListener('DOMContentLoaded', () => {

});

// Selection tool
const selection = document.getElementById('selection-tool');

let startX, startY, relativeStartX, relativeStartY,
    endX, endY, relativeEndX, relativeEndY;
let isSelecting = false;

const events = {
    mouseover() {
        this.style.cursor = 'crosshair'
    },
    mousedown(event) {
        const { clientX, clientY, offsetX, offsetY } = event;
        startX = clientX
        startY = clientY
        relativeStartX = offsetX
        relativeStartY = offsetY

        isSelecting = true

    },
    mousemove(event) {
        endX = event.clientX
        endY = event.clientY

        if (isSelecting) {
            selection.style.display = 'initial';
            selection.style.top = startY + 'px';
            selection.style.left = startX + 'px';

            selection.style.width = (endX - startX) + 'px';
            selection.style.height = (endY - startY) + 'px';
        }

    },
    mouseup(event) {
        isSelecting = false;

        relativeEndX = event.layerX;
        relativeEndY = event.layerY;

        // mostrar o botão de corte
        cropButton.style.display = 'initial'
    }
}

Object.keys(events)
    .forEach(eventName => {
        photoPreview.addEventListener(eventName, events[eventName])
    })

//Canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

function onLoadImage() {
    const { width, height } = image;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    ctx.drawImage(image, 0, 0)

    photoPreview.src = canvas.toDataURL();
}


//Cortar imagem
const cropButton = document.getElementById('crop-button');

cropButton.addEventListener('click', () => {
    const { width: imgW, height: imgH } = image
    const { width: previewW, height: previewH } = photoPreview;

    const widthFactor = +(imgW / previewW)
    const heightFactor = +(imgH / previewH)

    const selectionWidth = +selection.style.width.replace('px', '')
    const selectionHeight = +selection.style.height.replace('px', '')

    const croppedWidth = +(selectionWidth * widthFactor)
    const croppedHeight = +(selectionHeight * heightFactor)

    const actualX = +(relativeStartX * widthFactor)
    const actualY = +(relativeStartY * heightFactor)

    // pegar do ctx a imagem cortada
    const croppedImage = ctx.getImageData(actualX, actualY, croppedWidth, croppedHeight)

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ajuste de proporções
    canvas.width = image.width = croppedWidth;
    canvas.height = image.height = croppedHeight;

    // adicionar a imagem cortada ao ctx
    ctx.putImageData(croppedImage, 0, 0)

    // esconder a ferramenta de seleção
    selection.style.display = 'none'

    // atualizar o preview da imagem
    photoPreview.src = canvas.toDataURL()

    // mostrar o botão de download
    downloadButton.style.display = 'initial'
})

// Download
let downloadButton = document.getElementById('download')
downloadButton.onclick = function () {
    const a = document.createElement('a')
    a.download = photoName + '-cropped.png';
    a.href = canvas.toDataURL();
    a.click()
    console.log(canvas.toDataURL())
}