import React, { useState } from 'react';
import '../css/home.css'; // Importando o CSS da pasta src
import imgroda from '../img/roda.jpg'; // Importando imagens
import imgdog from '../img/dog.jpg';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Abre/fecha o modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setErrorMessage('');
  };

  // Valida login do administrador
  const handleLogin = (event) => {
    event.preventDefault();
    if (adminUsername === 'adm' && adminPassword === 'adm123') {
      console.log('Login bem-sucedido:', adminUsername);
      window.location.href = '/Adm'; // Redireciona para a página do admin
    } else {
      setErrorMessage('Usuário ou senha inválidos!');
    }
  };

  // Verifica se o formulário está válido
  const isFormValid = adminUsername && adminPassword;

  return (
    <>
      <div className="content home-page">
        {/* Seção Esquerda */}
        <div className="left-section" id="left-section">
          <h2>Estamos ansiosos para te ter aqui.</h2>
          <div className="image-container" id="image-container">
            <img src={imgdog} alt="Dog" className="image-horizontal" id="img-dog" />
            <img src={imgroda} alt="Roda" className="image-vertical" id="img-roda" />
          </div>
        </div>

        {/* Seção Direita */}
        <div className="right-section" id="right-section">
          <p>
            A pousada Quinta do Ypuã oferece aos seus clientes um recanto de aconchego e lazer, em ambiente rústico e
            agradável. Ideal para quem gosta de fugir da rotina e procura um local de paz para descansar e curtir a
            natureza.
          </p>
          <blockquote id="blockquote">
            "O Ypuã tem tudo a ver com a natureza, dá para sentir a energia do lugar. Eu me preocupo se você vai comer
            bem, dormir bem e se vai se sentir em casa. Vou te mostrar onde encontrar os melhores frutos do mar, onde
            curtir a melhor praia e as melhores ondas. Mas se você não quiser fazer nada, eu também conheço o melhor
            lugar."
            <br />— HEITOR, Anfitrião da pousada.
          </blockquote>
          <div className="buttons-container" id="buttons-container">
            <a href="/busca" className="btn-h" id="btn-reserva">
              Fazer reserva
            </a>
            <button className="btn-h" onClick={toggleModal} id="btn-administrador">
              Administrador
            </button>
          </div>
        </div>
      </div>

      {/* Modal para login de administrador */}
      {isModalOpen && (
        <div id="modal">
          <div id="modal-content">
            <span onClick={toggleModal} id="close-modal">
              &times;
            </span>
            <h2 id="modal-title">Login de Administrador</h2>
            <form onSubmit={handleLogin} id="admin-login-form">
              <div id="input-username">
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  required
                />
              </div>
              <div id="input-password">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p id="error-message">{errorMessage}</p>}
              <button type="submit" id="btn-entrar" disabled={!isFormValid}>
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
