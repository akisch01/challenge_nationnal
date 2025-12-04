// src/App.jsx
import { useState } from 'react';
import { useGameStore } from './stores/gameStore';
import VillageHub from './components/Hub/VillageHub';
import StoryMode from './components/Adventure/StoryMode';
import TowerDefense from './components/Defense/TowerDefense';
import CostCalculator from './components/Simulator/CostCalculator';
import ResourceLibrary from './components/Library/ResourceLibrary';
import WelcomeQuiz from './components/Onboarding/WelcomeQuiz';

function App() {
  const [currentScreen, setCurrentScreen] = useState('hub');
  const { player } = useGameStore();

  // Première visite = onboarding
  if (!player.name) {
    return <WelcomeQuiz onComplete={() => setCurrentScreen('hub')} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'adventure':
        return <StoryMode onBack={() => setCurrentScreen('hub')} />;
      case 'defense':
        return <TowerDefense onBack={() => setCurrentScreen('hub')} />;
      case 'simulator':
        return <CostCalculator onBack={() => setCurrentScreen('hub')} />;
      case 'library':
        return <ResourceLibrary onBack={() => setCurrentScreen('hub')} />;
      default:
        return <VillageHub onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App;