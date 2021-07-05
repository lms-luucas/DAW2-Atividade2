function getAllClients() {
  const body = $("#table-body");
  body.empty();
  axios.get("http://localhost:3333/clients").then((clients) => {
    clients.data.forEach((client) => {
      const linha = `
      <tr>
        <td>${client.id}</td>
        <td>${client.name}</td>
        <td>
          <button type="button" class="btn btn-success" onclick="openModal(${client.id})">
            <ion-icon name="call-outline"></ion-icon>
          </button>
        </td>
        <td><button class="btn btn-primary" onclick="fillData(${client.id})">Editar</button></td>
        <td><button class="btn btn-danger" onclick="deleteClient(${client.id})">Deletar</button></td>
      </tr>`;
      body.append(linha);
    });
  });
}



function deleteClient(id) {
  axios.delete(`http://localhost:3333/clients/${id}`).then(() => {
    getAllClients();
  });
}

function fillData(id) {
  axios.get(`http://localhost:3333/clients/${id}`).then((response) => {
    const client = response.data;
    $("#id").val(client.id);
    $("#name").val(client.name);
  });
}

function updateClient(id, data) {
  axios.put(`http://localhost:3333/clients/${id}`, data).then(() => {
    getAllClients();
  });
}

function storeClient(event) {
  event.preventDefault();

  const client = {};

  $("#form-client")
    .serializeArray()
    .forEach(({ name, value }) => {
      client[name] = value;
    });

  const { id, ...data } = client;

  if (id) {
    updateClient(id, data);
  } else {
    axios
      .post("http://localhost:3333/clients", data)
      .then(() => {
        getAllClients();
      })
      .catch(() => {
        console.log();
      });
  }
}

$(document).ready(() => {
  getAllClients();
});
