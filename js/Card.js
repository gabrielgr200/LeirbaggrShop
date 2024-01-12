function img(anything) {
    document.querySelector('.slide').src = anything;
}

function chance(chance) {
    const line = document.querySelector('.home');
    line.style.background = chance;
}