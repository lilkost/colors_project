const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event)=> {
    event.preventDefault()
    if(event.code.toLocaleLowerCase() === 'space') {
        setRandomColors()
    }
});

document.addEventListener('click', (event)=> {
    const type = event.target.dataset.type;

    if(type === 'lock') {
       const node = event.target.tagName.toLocaleLowerCase() === 'i' ? event.target : event.target.children[0]
        
       node.classList.toggle('fa-lock-open')
       node.classList.toggle('fa-lock')
    }
    else if(type === 'copy') {
        copyToClickBoard(event.target.textContent)
    }
});

function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF'

    let color = ''
    for(let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return '#' + color;
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorFromHash() : [];
    cols.forEach((col, index)=> {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        
        
        const color = isInitial 
        ? colors[index] 
            ? colors[index] 
            : chroma.random()
        : chroma.random();
        

        if(isLocked) {
            colors.push(col.querySelector('h2').textContent)
            return;
        }
        if(!isInitial) {
            colors.push(color);
        }
        col.querySelector('h2').innerHTML = color
        col.style.background = color
        setTextColor(col.querySelector('h2'), color);
        setTextColor(col.querySelector('button'), color);
    })

    updateColorsHas(colors)
}

function setTextColor(text, color) {
   const luminance = chroma(color).luminance();
   text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHas(colors = []) {
    document.location.hash = colors.map(col => {
        return col.toString().substring(1);
    }).join('-')
}

function getColorFromHash() {
    if(document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color=>'#'+color)
    }
    return [];
}

setRandomColors(true)