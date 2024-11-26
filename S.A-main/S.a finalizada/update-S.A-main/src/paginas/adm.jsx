import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Adm = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    quarto: '',
    dataEntrada: '',
    dataSaida: ''
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
      dataEntrada: cliente.dataEntrada,
      dataSaida: cliente.dataSaida
    });
    setIsEditing(true);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  // Função para formatar datas
  const formatarData = (data) => {
    if (!data) return 'N/A';
    const somenteData = new Date(data).toISOString().split('T')[0]; // Pega somente a parte da data
    const [ano, mes, dia] = somenteData.split('-'); // Separa em ano, mês e dia
    return `${dia}/${mes}/${ano}`; // Retorna no formato DD/MM/AAAA
  };

  // Função de filtro, agora verificando nome, dataEntrada, dataSaida e quarto
  const filteredClientes = clientes.filter(cliente => {
    const nomeMatch = cliente.nome.toLowerCase().includes(searchQuery.toLowerCase());
    const quartoMatch = cliente.quarto.toLowerCase().includes(searchQuery.toLowerCase());
    const dataEntradaMatch = formatarData(cliente.dataEntrada).includes(searchQuery);
    const dataSaidaMatch = formatarData(cliente.dataSaida).includes(searchQuery);

    return nomeMatch || quartoMatch || dataEntradaMatch || dataSaidaMatch;
  });

  console.log(filteredClientes);

  return (
    <div id='adm'>
      <main>
        <h1>Clientes</h1>
      </main>
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

      <div className="find">
        <input
          type="text"
          placeholder="Pesquisar pelo nome, quarto, ou datas..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <ul>
        {filteredClientes.map(cliente => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.email} - {cliente.telefone} - {cliente.quarto} - {formatarData(cliente.dataentrada)} - {formatarData(cliente.datasaida)}
            <div id='bnt'>
            <button onClick={() => handleEditCliente(cliente)}>Editar</button>
            <button onClick={() => handleDeleteCliente(cliente.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Adm;
