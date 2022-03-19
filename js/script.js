let image = new Image();
let reader = new FileReader;
let viewImage = getId('image');
let loader = getId('loader-image');
let cropper;

getId('start').onclick = () => loader.click();
getId('undo').onclick = () => historic('undo');
getId('salvar-edit').onclick = () => save();

loader.addEventListener('change', () => {
    let file = loader.files.item(0);
    reader.readAsDataURL(file);

    reader.onload = function (event) {
        image.src = event.target.result;
        viewImage.src = image.src;
        image.onload = init;
    }
})

function init() {
    $('#modalEditor').modal('show');
    getId('edit').onclick = () => editar(viewImage);

}

function editar(image) {
    nav_edit();

    cropper = new Cropper(image, {
        initialAspectRatio: 16 / 9,
        background: false,
        viewMode: 2,
        crop: true,
    });

    getId('cut').onclick = () => cut();
    getId('rotate').onclick = () => rotate();
}

function cut() {
    historic('save', viewImage.src);
    viewImage.src = cropper.getCroppedCanvas().toDataURL();
    image.src = viewImage.src;
    cropper.destroy();

    cropper = new Cropper(viewImage, {
        initialAspectRatio: 16 / 9,
        background: false,
        viewMode: 3,
        crop: true,
    });
}

function rotate() {
    historic('save', cropper.getCroppedCanvas().toDataURL());
    cropper.clear();
    cropper.rotate(90);
}

function save() {
    viewImage.src = cropper.getCroppedCanvas().toDataURL();
    image.src = viewImage.src;
    cropper.destroy();
    nav_menu();
}