// Historial de liquidaciones en memoria
let historial = [];
let haberesExtra = [];
let descuentosExtra = [];

// Agregar haber
function agregarHaber() {
  const id = Date.now();
  haberesExtra.push(id);
  const div = document.createElement('div');
  div.className = 'haber-row';
  div.id = `haber-${id}`;
  div.innerHTML = `
    <div class="form-group">
      <label>Nombre del haber</label>
      <input type="text" id="haberNombre-${id}" placeholder="Ej: Bono asistencia">
    </div>
    <div class="form-group">
      <label>Monto ($)</label>
      <input type="number" id="haberMonto-${id}" placeholder="0" min="0">
    </div>
    <button class="btn-remove" onclick="eliminarFila('haber-${id}', ${id}, 'haber')">✕</button>
  `;
  document.getElementById('haberesContainer').appendChild(div);
}

// Agregar descuento
function agregarDescuento() {
  const id = Date.now();
  descuentosExtra.push(id);
  const div = document.createElement('div');
  div.className = 'descuento-row';
  div.id = `descuento-${id}`;
  div.innerHTML = `
    <div class="form-group">
      <label>Nombre del descuento</label>
      <input type="text" id="descuentoNombre-${id}" placeholder="Ej: AFP">
    </div>
    <div class="form-group">
      <label>Porcentaje (%)</label>
      <input type="number" id="descuentoPorcentaje-${id}" placeholder="0" min="0" max="100">
    </div>
    <button class="btn-remove" onclick="eliminarFila('descuento-${id}', ${id}, 'descuento')">✕</button>
  `;
  document.getElementById('descuentosContainer').appendChild(div);
}

// Eliminar fila
function eliminarFila(divId, id, tipo) {
  document.getElementById(divId).remove();
  if (tipo === 'haber') haberesExtra = haberesExtra.filter(h => h !== id);
  else descuentosExtra = descuentosExtra.filter(d => d !== id);
}

// Calcular liquidación
function calcularLiquidacion() {
  const empleadoId = document.getElementById('empleadoId').value.trim();
  const nombreEmpleado = document.getElementById('nombreEmpleado').value.trim();
  const sueldoBase = parseInt(document.getElementById('sueldoBase').value) || 0;

  if (!empleadoId || !nombreEmpleado || !sueldoBase) {
    mostrarError('Completa ID, nombre y sueldo base.');
    return;
  }

  // Recolectar haberes
  const haberes = haberesExtra.map(id => ({
    nombre: document.getElementById(`haberNombre-${id}`).value || 'Sin nombre',
    monto: parseInt(document.getElementById(`haberMonto-${id}`).value) || 0
  }));

  // Recolectar descuentos
  const descuentos = descuentosExtra.map(id => ({
    nombre: document.getElementById(`descuentoNombre-${id}`).value || 'Sin nombre',
    porcentaje: parseFloat(document.getElementById(`descuentoPorcentaje-${id}`).value) || 0
  }));

  // Cálculo
  const totalHaberes = haberes.reduce((acc, h) => acc + h.monto, 0);
  const baseImponible = sueldoBase + totalHaberes;
  const totalDescuentos = Math.round(descuentos.reduce((acc, d) => acc + (baseImponible * d.porcentaje / 100), 0));
  const sueldoLiquido = baseImponible - totalDescuentos;

  // Mostrar resultado
  const box = document.getElementById('resultadoBox');
  box.style.display = 'block';
  document.getElementById('resSueldoBase').textContent = formatCLP(sueldoBase);
  document.getElementById('resTotalHaberes').textContent = formatCLP(totalHaberes);
  document.getElementById('resBaseImponible').textContent = formatCLP(baseImponible);
  document.getElementById('resTotalDescuentos').textContent = formatCLP(totalDescuentos);
  document.getElementById('resSueldoLiquido').textContent = formatCLP(sueldoLiquido);

  // Guardar en historial
  const liquidacion = {
    empleadoId,
    nombreEmpleado,
    mes: new Date().toLocaleString('es-CL', { month: 'long', year: 'numeric' }),
    sueldoBase,
    totalHaberes,
    baseImponible,
    totalDescuentos,
    sueldoLiquido
  };
  historial.unshift(liquidacion);
  renderHistorial();
  document.getElementById('alertError').style.display = 'none';
}

// Render historial
function renderHistorial() {
  const tbody = document.getElementById('tablaHistorial');
  if (historial.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="historial-vacio">No hay liquidaciones generadas aún</td></tr>';
    return;
  }
  tbody.innerHTML = historial.map(l => `
    <tr>
      <td><strong>${l.empleadoId}</strong></td>
      <td>${l.nombreEmpleado}</td>
      <td>${l.mes}</td>
      <td>${formatCLP(l.baseImponible)}</td>
      <td>${formatCLP(l.totalDescuentos)}</td>
      <td><strong>${formatCLP(l.sueldoLiquido)}</strong></td>
    </tr>
  `).join('');
}

// Limpiar formulario
function limpiarFormulario() {
  document.getElementById('empleadoId').value = '';
  document.getElementById('nombreEmpleado').value = '';
  document.getElementById('sueldoBase').value = '';
  document.getElementById('haberesContainer').innerHTML = '';
  document.getElementById('descuentosContainer').innerHTML = '';
  document.getElementById('resultadoBox').style.display = 'none';
  document.getElementById('alertError').style.display = 'none';
  haberesExtra = [];
  descuentosExtra = [];
}

function formatCLP(valor) {
  return '$' + valor.toLocaleString('es-CL');
}

function mostrarError(msg) {
  const el = document.getElementById('alertError');
  el.textContent = msg;
  el.style.display = 'block';
}