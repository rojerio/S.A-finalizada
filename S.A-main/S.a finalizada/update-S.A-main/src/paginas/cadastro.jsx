import React, { useState, useEffect } from 'react'; // Importa React e hooks useState e useEffect
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import '../css/cadastro.css'; // Importa o arquivo de estilos CSS

function Cadastro() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    quarto: '',
    dataEntrada: '',  // Ajustado para refletir o nome correto
    dataSaida: ''    // Ajustado para refletir o nome correto
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'email') {
      validateEmail(e.target.value);
    }
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('E-mail inválido');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleCreateCliente = async e => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      return;
    }

    try {
      await axios.post('http://localhost:3000/clientes', formData);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        quarto: '',
        dataEntrada: '',
        dataSaida: ''
      });
      fetchClientes();
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  };

  const handleUpdateCliente = async e => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/clientes/${formData.id}`, formData);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        quarto: '',
        dataEntrada: '',
        dataSaida: ''
      });
      setIsEditing(false);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const handleDeleteCliente = async id => {
    try {
      await axios.delete(`http://localhost:3000/clientes/${id}`);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  const handleEditCliente = cliente => {
    setFormData({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      quarto: cliente.quarto,
      dataEntrada: cliente.dataEntrada,  // Ajustado para refletir o nome correto
      dataSaida: cliente.dataSaida      // Ajustado para refletir o nome correto
    });
    setIsEditing(true);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredClientes)

  return (
    <div id='cadastro'>
      <form onSubmit={isEditing ? handleUpdateCliente : handleCreateCliente}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            disabled={isEditing}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {emailError && <span className="error-message">{emailError}</span>}
        </label>
        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Quarto:
          <input
            type="text"
            name="quarto"
            value={formData.quarto}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Data de Entrada:
          <input
            type="date"
            name="dataEntrada"
            value={formData.dataEntrada}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Data de Saída:
          <input
            type="date"
            name="dataSaida"
            value={formData.dataSaida}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" disabled={emailError !== ''}>
          {isEditing ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}


export default Cadastro