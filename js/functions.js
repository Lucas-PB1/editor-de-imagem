let data_historic = [];
let getId = (data) => document.getElementById(data);
let getClass = (data) => document.getElementsByClassName(data);

let nav_menu = () => {
    [...getClass('edit')].map(e => e.style.display = 'none');
    [...getClass('menu')].map(e => e.style.display = 'initial');
}

let nav_edit = () => {
    [...getClass('menu')].map(e => e.style.display = 'none');
    [...getClass('edit')].map(e => e.style.display = 'initial');
}

let historic = (option, data) => {
    if (option == 'save') data_historic.push(data);

    if (option == 'undo') {
        if (data_historic[1]) {
            getId('image').src = data_historic[data_historic.length - 1];
            image.src = data_historic[data_historic.length - 1]
            data_historic.pop();
        }
    }

    if (option == 'clear') data_historic = [];
}
