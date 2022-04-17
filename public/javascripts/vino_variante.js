const root = document.getElementById('js-input-variedad');
const inputSend = root.querySelector('#variedad');
const addInput = root.querySelector('#addVariedad');
const nameVariedad = root.querySelector('#nameVariedad');
const container = root.querySelector('#containerVariedad');

const nameInputs = container.getElementsByTagName('th');
const percentageInputs = container.getElementsByTagName('input');

function createVariedad(nombre, value = 0) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <th class="align-middle text-capitalize">${nombre}</th>
    <td><input type="number" min="0" max="100" step="0.01" value=${value} class="form-control"></td>
    <td class="h5 text-left align-middle">%</td>
    <td><button type="button" class="btn btn-warning"><i class="bi bi-x-circle-fill"></i></button></td>
  `;

  const repetead = Array.from(nameInputs, ({ textContent }) => textContent.toLowerCase())
    .includes(nombre);
  if (!repetead && nombre.length > 0 && container.childElementCount < 10) {
    tr.querySelector('button').onclick = () => tr.remove();
    tr.querySelector('input').onchange = (e) => {
      if (!Number.isNaN(e.target.valueAsNumber) && e.target.valueAsNumber > 0) {
        e.target.setAttribute('value', e.target.valueAsNumber);
        e.target.value = e.target.valueAsNumber;
      } else {
        e.target.setAttribute('value', 0);
        e.target.value = 0;
      }
    };
    nameVariedad.value = '';
    container.appendChild(tr);
  }
  nameVariedad.click();
  nameVariedad.focus();
}

function loadValue() {
  const variedad = JSON.parse(inputSend.value);
  if (Object.keys(variedad).length === 0) {
    nameVariedad.setCustomValidity('Debe haber al menos una variedad');
  } else {
    Object.keys(variedad).forEach((key) => {
      createVariedad(key.trim(), variedad[key]);
    });
  }
}

new MutationObserver(() => {
  const sum = Array.from(percentageInputs, ({ valueAsNumber }) => valueAsNumber)
    .reduce((a, b) => parseFloat(a).toFixed(2) + parseFloat(b).toFixed(2), 0);
  const countEmpt = [...percentageInputs].filter(({ valueAsNumber }) => valueAsNumber === 0).length;
  if (sum !== 100 && countEmpt === 0) {
    nameVariedad.setCustomValidity('La suma de los porcentajes es distinta del 100%');
  }
  if (sum === 100 && countEmpt > 0) {
    nameVariedad.setCustomValidity('Para que haya variedades sin porcentaje la suma de los porcentajes debe ser inferior al 100%');
  }
  if ((sum === 100 && countEmpt === 0) || (sum < 100 && countEmpt > 0)) {
    nameVariedad.setCustomValidity('');
  }

  const start = percentageInputs.length > 0 ? percentageInputs[0] : {};
  const red = [...percentageInputs].reduce((obj, item, index) => ({
    ...obj,
    [nameInputs[index].textContent.toLowerCase()]: item.value,
  }), start);
  inputSend.value = JSON.stringify(red);
}).observe(container, {
  childList: true, attributes: true, subtree: true, characterData: true,
});

loadValue();
addInput.addEventListener('click', () => createVariedad(nameVariedad.value.trim().toLowerCase(), 0));
