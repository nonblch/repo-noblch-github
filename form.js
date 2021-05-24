
const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
const selectSecond = document.querySelector('.select');
const selectSecond_title = selectSecond.querySelector('.__select__title');
const selectSecond_labels = selectSecond.querySelectorAll('.__select__label');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
        selectSingle.setAttribute('data-state', '');
    } else {
        selectSingle.setAttribute('data-state', 'active');
    }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {

        selectSingle_title.innerHTML = evt.target.innerHTML;
        selectSingle.setAttribute('data-state', '');

    });
}

selectSecond_title.addEventListener('click', () => {
    if ('active' === selectSecond.getAttribute('data-state')) {
        selectSecond.setAttribute('data-state', '');
    } else {
        selectSecond.setAttribute('data-state', 'active');
    }
});

// Close when click to option
for (let i = 0; i < selectSecond_labels.length; i++) {
    selectSecond_labels[i].addEventListener('click', (evt) => {

        selectSecond_title.innerHTML = evt.target.innerHTML;
        selectSecond.setAttribute('data-state', '');

    });
}


