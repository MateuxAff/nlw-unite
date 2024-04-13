let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 1, 23, 19, 0),
    dataCheckIn: new Date(2024, 2, 11, 9, 45)
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 14, 30),
    dataCheckIn: new Date(2024, 2, 10, 12, 15)
  },
  {
    nome: "João Santos",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 10, 45),
    dataCheckIn: new Date(2024, 2, 5, 17, 30)
  },
  {
    nome: "Carla Oliveira",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 8, 0),
    dataCheckIn: new Date(2024, 2, 28, 10, 20)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 16, 10),
    dataCheckIn: new Date(2024, 2, 26, 14, 5)
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 21, 5),
    dataCheckIn: null
  },
  {
    nome: "Paulo Sousa",
    email: "paulo@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 11, 20),
    dataCheckIn: new Date(2024, 2, 18, 19, 45)
  },
  {
    nome: "Sandra Marques",
    email: "sandra@gmail.com",
    dataInscricao: new Date(2024, 1, 18, 13, 15),
    dataCheckIn: null
  },
  {
    nome: "Ricardo Pereira",
    email: "ricardo@gmail.com",
    dataInscricao: new Date(2024, 1, 25, 7, 50),
    dataCheckIn: new Date(2024, 2, 13, 11, 55)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
      >
      Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
      ${participante.nome}
      </strong>
      <br>
      <small>
      ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}
const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
      output = output + criarNovoParticipante(participante)
    }


  document
  .querySelector('tbody')
  .innerHTML = output
}
atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
 const mensagemConfimaçao = 'Tem certeza que deseja fazer o Check-In?'

  if(confirm(mensagemConfimaçao) == false) {
    return
  }

  const participante = participantes.find((p) => {
     return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}