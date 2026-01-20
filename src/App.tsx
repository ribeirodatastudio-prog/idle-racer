
import { GameProvider, useGame } from './context/GameContext';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';

const GameContainer = () => {
  const { gameState } = useGame();

  if (gameState === 'START') {
    return <WelcomeScreen />;
  }

  return <Dashboard />;
};

function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}

export default App;
