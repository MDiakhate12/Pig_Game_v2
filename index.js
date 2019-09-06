document.querySelector('.btn-new-index').addEventListener('click', function () {
    document.getElementById('score').focus();
    document.getElementById('score').classList.add('slide');
});

document.querySelector('.new-game').addEventListener('click', () => {
    document.querySelector('.win').classList.remove('hide');
    document.querySelector('.win').classList.add('show');
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.win').classList.remove('show');
    document.querySelector('.win').classList.add('hide');
});

