const selectSingle = document.querySelector('.shop-select');
const selectSingle_title = selectSingle.querySelector('.shop-select-title');
const selectSingle_labels = selectSingle.querySelectorAll('.shop-select-label');

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