import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

const App = () => {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Lista de emojis
  const emojis = [
    '👽', '🤠', '👹', '🐔', '🧟‍♀️', '💑', '🎁', '☠️', '🛸'
  ];

  const rolarDado = () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setSelectedEmojis([...selectedEmojis, randomEmoji]);
  };

  const criarHistoria = () => {
    setIsGameOver(true);
  };

  const encerrarJogo = () => {
    setSelectedEmojis([]);
    setIsGameOver(false);
  };

  const iniciarNovamente = () => {
    setSelectedEmojis([]);
    setIsGameOver(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="home">
            <h1>Jogo de Dados com Emojis</h1>
            <Link to="/jogo">
              <button>Começar</button>
            </Link>
          </div>
        } />

        <Route path="/jogo" element={
          <div className="jogo">
            <h2>Route in Cube</h2>
            <h5>Objetivo: jogue os dados e crie um cenário com seus amigos!</h5>
            <div className="emoji-display">
              {selectedEmojis.map((emoji, index) => (
                <motion.div
                  key={index}
                  className="rolled-emoji"
                  whileHover={{ scale: 1.2 }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
            {!isGameOver && (
              <div>
                <button onClick={rolarDado}>Rolar o Dado</button>
                <button onClick={criarHistoria} disabled={selectedEmojis.length === 0}>
                  Criar História
                </button>
              </div>
            )}
            {/* Botão de Encerrar */}
            <Link to="/historia">
                <button className="encerrar-button">Ver História</button>
              </Link>
          </div>
        } />

        <Route path="/historia" element={
          <div className="historia">
            <h2>Sua História com os Emojis</h2>
            <p>Baseada nos emojis rolados, crie sua narrativa aqui...</p>
            <div>
              {selectedEmojis.map((emoji, index) => (
                <motion.div
                  key={index}
                  className="rolled-emoji"
                  whileHover={{ scale: 1.2 }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
            {/* Botão para reiniciar o jogo */}
            <Link to="/jogo">
              <button onClick={iniciarNovamente} className="iniciar-novamente-button">
                Iniciar Novamente
              </button>
            </Link>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
