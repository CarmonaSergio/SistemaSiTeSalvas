// Médicos
const apiURLMedicos = 'http://localhost:3333/medicos';
const tablaMedicos = document.getElementById('tabla-medicos');
const modalMedico = document.getElementById('modal-medico');
const tituloModalMedico = document.getElementById('modal-titulo-medico');
let modoMedico = 'crear';
let medicoEditando = null;

async function cargarMedicos() {
  tablaMedicos.innerHTML = '';
  const res = await fetch(apiURLMedicos);
  const medicos = await res.json();

  medicos.forEach(medico => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${medico.idmedico}</td>
      <td>${medico.nombres}</td>
      <td>${medico.especialidad}</td>
      <td>${medico.telefono}</td>
      <td>${medico.correo}</td>
      <td>${medico.direccion}</td>
      <td>
        <button class="btn-editar" onclick="abrirModalEditarMedico(${medico.idmedico})">✏️</button>
        <button class="btn-eliminar" onclick="eliminarMedico(${medico.idmedico})">🗑️</button>
      </td>`;
    tablaMedicos.appendChild(fila);
  });
}

window.abrirModalCrearMedico = function() {
  modoMedico = 'crear';
  medicoEditando = null;
  tituloModalMedico.textContent = 'Crear Médico';
  limpiarFormularioMedico();
  modalMedico.style.display = 'flex';
}

window.abrirModalEditarMedico = async function(id) {
  modoMedico = 'editar';
  const res = await fetch(`${apiURLMedicos}/${id}`);
  const medico = await res.json();
  medicoEditando = id;
  tituloModalMedico.textContent = 'Editar Médico';
  document.getElementById('t1-medico').value = medico.nombres;
  document.getElementById('t2-medico').value = medico.especialidad;
  document.getElementById('t3-medico').value = medico.telefono;
  document.getElementById('t4-medico').value = medico.correo;
  document.getElementById('t5-medico').value = medico.direccion;
  modalMedico.style.display = 'flex';
}

window.cerrarModalMedico = function() {
  modalMedico.style.display = 'none';
}

function limpiarFormularioMedico() {
  document.getElementById('t1-medico').value = '';
  document.getElementById('t2-medico').value = '';
  document.getElementById('t3-medico').value = '';
  document.getElementById('t4-medico').value = '';
  document.getElementById('t5-medico').value = '';
}

window.guardarMedico = async function() {
  const t1 = document.getElementById('t1-medico').value;
  const t2 = document.getElementById('t2-medico').value;
  const t3 = document.getElementById('t3-medico').value;
  const t4 = document.getElementById('t4-medico').value;
  const t5 = document.getElementById('t5-medico').value;

  const datos = { t1, t2, t3, t4, t5 };

  if (modoMedico === 'crear') {
    await fetch(apiURLMedicos, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  } else if (modoMedico === 'editar') {
    await fetch(`${apiURLMedicos}/${medicoEditando}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  }
  cerrarModalMedico();
  cargarMedicos();
}

window.eliminarMedico = async function(id) {
  if (!confirm('¿Estás seguro de eliminar este médico?')) return;
  await fetch(`${apiURLMedicos}/${id}`, { method: 'DELETE' });
  cargarMedicos();
}

cargarMedicos();


// Pacientes
const apiURLPacientes = 'http://localhost:3333/pacientes';
const tablaPacientes = document.getElementById('tabla-pacientes');
const modalPaciente = document.getElementById('modal-paciente');
const tituloModalPaciente = document.getElementById('modal-titulo-paciente');
let modoPaciente = 'crear';
let pacienteEditando = null;

async function cargarPacientes() {
  tablaPacientes.innerHTML = '';
  const res = await fetch(apiURLPacientes);
  const pacientes = await res.json();

  pacientes.forEach(paciente => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${paciente.idpaciente}</td>
      <td>${paciente.documento}</td>
      <td>${paciente.nombres}</td>
      <td>${paciente.telefono}</td>
      <td>${paciente.correo}</td>
      <td>${paciente.direccion}</td>
      <td>
        <button class="btn-editar" onclick="abrirModalEditarPaciente(${paciente.idpaciente})">✏️</button>
        <button class="btn-eliminar" onclick="eliminarPaciente(${paciente.idpaciente})">🗑️</button>
      </td>`;
    tablaPacientes.appendChild(fila);
  });
}

window.abrirModalCrearPaciente = function() {
  modoPaciente = 'crear';
  pacienteEditando = null;
  tituloModalPaciente.textContent = 'Crear Paciente';
  limpiarFormularioPaciente();
  modalPaciente.style.display = 'flex';
}

window.abrirModalEditarPaciente = async function(id) {
  modoPaciente = 'editar';
  const res = await fetch(`${apiURLPacientes}/${id}`);
  const paciente = await res.json();
  pacienteEditando = id;
  tituloModalPaciente.textContent = 'Editar Paciente';
  document.getElementById('t1-paciente').value = paciente.documento;
  document.getElementById('t2-paciente').value = paciente.nombres;
  document.getElementById('t3-paciente').value = paciente.telefono;
  document.getElementById('t4-paciente').value = paciente.correo;
  document.getElementById('t5-paciente').value = paciente.direccion;
  modalPaciente.style.display = 'flex';
}

window.cerrarModalPaciente = function() {
  modalPaciente.style.display = 'none';
}

function limpiarFormularioPaciente() {
  document.getElementById('t1-paciente').value = '';
  document.getElementById('t2-paciente').value = '';
  document.getElementById('t3-paciente').value = '';
  document.getElementById('t4-paciente').value = '';
  document.getElementById('t5-paciente').value = '';
}

window.guardarPaciente = async function() {
  const t1 = document.getElementById('t1-paciente').value;
  const t2 = document.getElementById('t2-paciente').value;
  const t3 = document.getElementById('t3-paciente').value;
  const t4 = document.getElementById('t4-paciente').value;
  const t5 = document.getElementById('t5-paciente').value;

  const datos = { t1, t2, t3, t4, t5 };

  if (modoPaciente === 'crear') {
    await fetch(apiURLPacientes, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  } else if (modoPaciente === 'editar') {
    await fetch(`${apiURLPacientes}/editar/${pacienteEditando}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  }
  cerrarModalPaciente();
  cargarPacientes();
}

window.eliminarPaciente = async function(id) {
  if (!confirm('¿Seguro de eliminar este paciente?')) return;
  await fetch(`${apiURLPacientes}/${id}`, { method: 'DELETE' });
  cargarPacientes();
}

cargarPacientes();
