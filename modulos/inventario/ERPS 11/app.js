// Datos en memoria
let bodegas = [];

function crearBodega() {
  const id = document.getElementById('bodegaId').value.trim();
  const nombre = document.getElementById('bodegaNombre').value.trim();
  const ubicacion = document.getElementById('bodegaUbicacion').value.trim();

  if (!id || !nombre || !ubicacion) {
    mostrarError('alertError', 'ID, nombre y ubicación son obligatorios.');
    return;
  }
  if (bodegas.find(b => b.id === id)) {
    mostrarError('alertError', `Ya existe una bodega con el ID ${id}.`);
    return;
  }

  bodegas.push({ id, nombre, ubicacion, stock: {}, movimientos: [] });
  mostrarExito('alertSuccess', `✅ Bodega "${nombre}" creada correctamente.`);
  document.getElementById('bodegaId').value = '';
  document.getElementById('bodegaNombre').value = '';
  document.getElementById('bodegaUbicacion').value = '';
  actualizarSelectores();
  renderBodegas();
}

function registrarMovimiento(tipo) {
  const idBodega = document.getElementById('movBodega').value;
  const codigoProducto = document.getElementById('movProducto').value.trim();
  const cantidad = parseInt(document.getElementById('movCantidad').value);

  if (!idBodega || !codigoProducto || !cantidad || cantidad <= 0) {
    mostrarError('alertMovError', 'Completa todos los campos correctamente.');
    return;
  }

  const bodega = bodegas.find(b => b.id === idBodega);

  if (tipo === 'SALIDA') {
    const stockActual = bodega.stock[codigoProducto] || 0;
    if (cantidad > stockActual) {
      mostrarError('alertMovError', `Stock insuficiente. Disponible: ${stockActual} unidades.`);
      return;
    }
    bodega.stock[codigoProducto] = stockActual - cantidad;
  } else {
    bodega.stock[codigoProducto] = (bodega.stock[codigoProducto] || 0) + cantidad;
  }

  bodega.movimientos.push({
    tipo,
    codigoProducto,
    cantidad,
    fecha: new Date().toLocaleString('es-CL')
  });

  const elMov = document.getElementById('alertMov');
  elMov.className = 'alert alert-success';
  elMov.style.display = 'block';
  elMov.textContent = `✅ ${tipo} registrada: ${cantidad} unidad(es) de "${codigoProducto}" en bodega ${idBodega}. Stock actual: ${bodega.stock[codigoProducto]}`;
  document.getElementById('alertMovError').style.display = 'none';
  document.getElementById('movProducto').value = '';
  document.getElementById('movCantidad').value = '';
  renderBodegas();
  setTimeout(() => elMov.style.display = 'none', 4000);
}

function verReporte() {
  const id = document.getElementById('reporteBodega').value;
  if (!id) return;
  const bodega = bodegas.find(b => b.id === id);
  const contenido = document.getElementById('reporteContenido');
  const productos = Object.entries(bodega.stock);

  if (productos.length === 0) {
    contenido.innerHTML = '<div class="reporte-box"><p style="color:#999">No hay stock registrado en esta bodega.</p></div>';
    return;
  }

  contenido.innerHTML = `
    <div class="reporte-box">
      <h4>📊 Reporte de Stock — ${bodega.nombre} (${bodega.ubicacion})</h4>
      ${productos.map(([codigo, cantidad]) => `
        <div class="stock-item">
          <span><strong>${codigo}</strong></span>
          <span>${cantidad} unidades</span>
        </div>
      `).join('')}
    </div>
  `;
}

function verHistorial() {
  const id = document.getElementById('historialBodega').value;
  if (!id) return;
  const bodega = bodegas.find(b => b.id === id);
  const tbody = document.getElementById('tablaHistorial');

  if (bodega.movimientos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#999;padding:20px">No hay movimientos registrados</td></tr>';
    return;
  }

  tbody.innerHTML = [...bodega.movimientos].reverse().map(m => `
    <tr>
      <td><span class="badge ${m.tipo === 'ENTRADA' ? 'badge-entrada' : 'badge-salida'}">${m.tipo === 'ENTRADA' ? '📥' : '📤'} ${m.tipo}</span></td>
      <td>${m.codigoProducto}</td>
      <td>${m.cantidad}</td>
      <td>${m.fecha}</td>
    </tr>
  `).join('');
}

function renderBodegas() {
  const tbody = document.getElementById('tablaBodegas');
  if (bodegas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#999;padding:20px">No hay bodegas registradas aún</td></tr>';
    return;
  }
  tbody.innerHTML = bodegas.map(b => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>${b.nombre}</td>
      <td>${b.ubicacion}</td>
      <td>${Object.keys(b.stock).length} producto(s)</td>
      <td>${b.movimientos.length} movimiento(s)</td>
    </tr>
  `).join('');
}

function actualizarSelectores() {
  const opciones = bodegas.map(b => `<option value="${b.id}">${b.nombre} (${b.id})</option>`).join('');
  ['movBodega', 'reporteBodega', 'historialBodega'].forEach(id => {
    const sel = document.getElementById(id);
    sel.innerHTML = '<option value="">— Seleccionar bodega —</option>' + opciones;
  });
}

function cambiarTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

function mostrarExito(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}

function mostrarError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = 'block';
}