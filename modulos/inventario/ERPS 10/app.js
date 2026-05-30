// Catálogo en memoria
let catalogo = [];
let productoSeleccionado = null;

function registrarProducto() {
  const codigo = document.getElementById('codigo').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const grupo = document.getElementById('grupo').value.trim();
  const subgrupo = document.getElementById('subgrupo').value.trim();
  const fotografia = document.getElementById('fotografia').value.trim();
  const stockActual = parseInt(document.getElementById('stockActual').value) || 0;
  const stockMinimo = parseInt(document.getElementById('stockMinimo').value) || 0;
  const stockMaximo = parseInt(document.getElementById('stockMaximo').value) || 0;

  if (!codigo || !nombre || !grupo) {
    mostrarError('Código, nombre y grupo son obligatorios.');
    return;
  }
  if (catalogo.find(p => p.codigo === codigo)) {
    mostrarError(`Ya existe un producto con el código ${codigo}.`);
    return;
  }

  catalogo.push({ codigo, nombre, grupo, subgrupo, fotografia, stockActual, stockMinimo, stockMaximo });
  mostrarExito(`✅ Producto "${nombre}" registrado correctamente en el catálogo.`);
  limpiarFormulario();
  renderTabla();
}

function renderTabla() {
  const tbody = document.getElementById('tablaCatalogo');
  if (catalogo.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;padding:20px">No hay productos registrados aún</td></tr>';
    return;
  }
  tbody.innerHTML = catalogo.map(p => `
    <tr>
      <td><strong>${p.codigo}</strong></td>
      <td>${p.nombre}</td>
      <td>${p.grupo}</td>
      <td>${p.subgrupo || '—'}</td>
      <td><strong>${p.stockActual}</strong> / mín ${p.stockMinimo}</td>
      <td>
        <span class="badge ${p.stockActual <= p.stockMinimo ? 'badge-warn' : 'badge-ok'}">
          ${p.stockActual <= p.stockMinimo ? '⚠️ Stock bajo' : '✅ Normal'}
        </span>
      </td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="abrirVenta('${p.codigo}')">🛒 Venta</button>
        <button class="btn btn-success btn-sm" onclick="abrirCompra('${p.codigo}')">📥 Compra</button>
      </td>
    </tr>
  `).join('');
}

function abrirVenta(codigo) {
  productoSeleccionado = catalogo.find(p => p.codigo === codigo);
  document.getElementById('ventaNombre').textContent = productoSeleccionado.nombre;
  document.getElementById('ventaStock').textContent = productoSeleccionado.stockActual;
  document.getElementById('ventaCantidad').value = '';
  document.getElementById('alertVenta').style.display = 'none';
  document.getElementById('modalVenta').classList.add('active');
}

function confirmarVenta() {
  const cantidad = parseInt(document.getElementById('ventaCantidad').value);
  const alerta = document.getElementById('alertVenta');

  if (!cantidad || cantidad <= 0) {
    alerta.style.display = 'block';
    alerta.textContent = 'Ingresa una cantidad válida.';
    return;
  }
  if (cantidad > productoSeleccionado.stockActual) {
    alerta.style.display = 'block';
    alerta.textContent = `Stock insuficiente. Disponible: ${productoSeleccionado.stockActual} unidades.`;
    return;
  }

  productoSeleccionado.stockActual -= cantidad;
  cerrarModal('modalVenta');
  renderTabla();
  mostrarExito(`✅ Venta registrada: ${cantidad} unidad(es) de "${productoSeleccionado.nombre}". Stock actual: ${productoSeleccionado.stockActual}`);
}

function abrirCompra(codigo) {
  productoSeleccionado = catalogo.find(p => p.codigo === codigo);
  document.getElementById('compraNombre').textContent = productoSeleccionado.nombre;
  document.getElementById('compraStock').textContent = productoSeleccionado.stockActual;
  document.getElementById('compraCantidad').value = '';
  document.getElementById('alertCompra').style.display = 'none';
  document.getElementById('modalCompra').classList.add('active');
}

function confirmarCompra() {
  const cantidad = parseInt(document.getElementById('compraCantidad').value);
  const alerta = document.getElementById('alertCompra');

  if (!cantidad || cantidad <= 0) {
    alerta.className = 'alert alert-error';
    alerta.style.display = 'block';
    alerta.textContent = 'Ingresa una cantidad válida.';
    return;
  }

  productoSeleccionado.stockActual += cantidad;
  cerrarModal('modalCompra');
  renderTabla();
  mostrarExito(`✅ Compra registrada: ${cantidad} unidad(es) ingresadas a "${productoSeleccionado.nombre}". Stock actual: ${productoSeleccionado.stockActual}`);
}

function consultarStock() {
  const codigo = document.getElementById('codigoConsulta').value.trim();
  if (!codigo) return;
  const producto = catalogo.find(p => p.codigo === codigo);
  const alerta = document.getElementById('alertStock');
  alerta.style.display = 'block';

  if (producto) {
    alerta.className = 'alert alert-success';
    alerta.innerHTML = `
      <strong>${producto.nombre}</strong> (${producto.codigo}) —
      Stock actual: <strong>${producto.stockActual}</strong> |
      Mínimo: ${producto.stockMinimo} | Máximo: ${producto.stockMaximo} |
      ${producto.stockActual <= producto.stockMinimo ? '⚠️ Stock bajo mínimo' : '✅ Stock normal'}
    `;
  } else {
    alerta.className = 'alert alert-error';
    alerta.textContent = `❌ No se encontró ningún producto con el código "${codigo}".`;
  }
}

function cerrarModal(id) {
  document.getElementById(id).classList.remove('active');
}

function mostrarExito(msg) {
  const el = document.getElementById('alertSuccess');
  el.textContent = msg;
  el.style.display = 'block';
  document.getElementById('alertError').style.display = 'none';
  setTimeout(() => el.style.display = 'none', 4000);
}

function mostrarError(msg) {
  const el = document.getElementById('alertError');
  el.textContent = msg;
  el.style.display = 'block';
  document.getElementById('alertSuccess').style.display = 'none';
}

function limpiarFormulario() {
  ['codigo','nombre','grupo','subgrupo','fotografia','stockActual','stockMinimo','stockMaximo']
    .forEach(id => document.getElementById(id).value = '');
}