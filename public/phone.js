function openModal(clientId) {
  $("#phoneModal").modal("show");
  $("#phone_client_id").val(clientId);
  getAllPhones(clientId);
}

function getAllPhones(clientId) {
  const body = $("#table-body-phone");
  body.empty();
  axios
    .get(`http://localhost:3333/phonenumbers?client_id=${clientId}`)
    .then((phones) => {
      phones.data.forEach((phone) => {
        console.log(phones.data)
        const linha = `
        <tr>
          <td>${phone.id}</td>
          <td>${phone.phone}</td>
          <td>
            <button type="button" class="btn btn-success">
              <ion-icon name="call-outline"></ion-icon>
            </button>
          </td>
          <td><button class="btn btn-primary" onclick="fillData(${phone.id})">Editar</button></td>
          <td><button class="btn btn-danger" onclick="deletePhone(${phone.id})">Deletar</button></td>
        </tr>`;
        body.append(linha);
      });
    });
}

function deletePhone(id) {
  axios.delete(`http://localhost:3333/phonenumbers/${id}`).then(() => {});
}

// function updatePhone(id, data) {
//   axios.put(`http://localhost:3333/phonenumbers/${id}`, data).then(() => {
    
//   });
// }

// function fillData(id) {
//   axios.get(`http://localhost:3333/phonenumbers/${id}`).then((response) => {
//     const phone = response.data;
//     $("#id").val(phone.id);
//     $("#phonenumber").val(phone.name);
//     $("#preferencial").val(phone.prefrencial);
//   });
// }

// function storeClient(event) {
//   event.preventDefault();

//   const phone = {};

//   $("#form-phone")
//     .serializeArray()
//     .forEach(({ name, value }) => {
//       phone[name] = value;
//     });

//   const { id, ...data } = phone;

//   if (id) {
//     updatePhone(id, data);
//   } else {
//     axios
//       .post("http://localhost:3333/phonenumbers", data)
//       .then(() => {})
//       .catch(() => {
//         console.log();
//       });
//   }
// }
