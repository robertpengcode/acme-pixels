const safeColors = [
  '0', '3', '6', '9', 'c', 'f'
]

const getColors = (colors) => {
  const colorsArr = [];

  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < colors.length; j++) {
      for (let k = 0; k < colors.length; k++) {
        colorsArr.push(colors[i] + colors[j] + colors[k]);
      }
    }
  }
  return colorsArr;
}

const palletEl = document.querySelector('#pallet');
const tableEl = document.getElementById('grid');

const renderPallete = () => {
  const colorVariants =  getColors(safeColors);

  colorVariants.forEach( (colorVariant, ind) => {
    palletEl.innerHTML += `<li style="background-color: #${colorVariant}" ${(ind === 0) ? 'class="selected"' : ''}></li>`;
  });
  

  console.log(colorVariants);
}

renderPallete();

const renderGrid = (width = 10, height = 7) => {
  tableEl.innerHTML = "";

  const table = document.createElement('tbody');
  const tds = [];

  for (let h = 0; h < height; h++) {
    const tr = document.createElement('tr');
    for (let w = 0; w < width; w++) {
      const td = document.createElement('td');
  
      td.dataset.row = h;
      td.dataset.col = w;
      tds.push(td);
      tr.append(td);
    }
    table.append(tr);
  }
  tableEl.append(table);
}

renderGrid();

const generateGridButton = document.querySelector('#submit-grid');

generateGridButton.addEventListener('click', (e) => {
  const rows = document.querySelector('input[name="height"]').value;
  const colls = document.querySelector('input[name="width"]').value;

  renderGrid(colls, rows);
  e.preventDefault();
});

palletEl.addEventListener('click', (e) => {  
  if (e.target.tagName === "LI") {
    const current = palletEl.querySelector('.selected');
    current.classList.remove('selected');

    const swatch = e.target;
    swatch.classList.add('selected');
  }  
});

tableEl.addEventListener('click', (e) => {
  if (e.target.tagName === "TD") {
    
    const color = getColor();
    const td = e.target;
    const currentColor = td.style.backgroundColor;

    console.log(currentColor, 'currentColor');
    console.log(color, 'color to set');

    if (currentColor === color) {
      setColor(td, '#fff');
    } else {
      setColor(td, color);
    }
  }
})

const getColor = () => {
  const color = palletEl.querySelector('.selected').style.backgroundColor;

  return color;
}

const setColor = (td, color) => {
  td.style.backgroundColor = color;
}
