// src/components/Adventure/StoryMode.jsx
import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { ArrowLeft, Book } from 'lucide-react';

const StoryMode = ({ onBack }) => {
  const { adventure } = useGameStore();
  const [_currentScene, _setCurrentScene] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      {/* Header */}
      <div className="bg-black bg-opacity-30 p-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition"
        >
          <ArrowLeft size={20} />
          Retour au village
        </button>

        <div className="flex items-center gap-4">
          <Book size={20} />
          <span>Chapitre {adventure.currentChapter}</span>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold mb-6">Le Réveil du Village</h2>

          <div className="mb-8 text-lg leading-relaxed">
            <p className="mb-4">
              C'est la catastrophe ! Microsoft vient d'annoncer la fin du support de Windows 10.
              Tous nos ordinateurs sont concernés...
            </p>
            <p>
              En tant que directeur·rice de l'établissement, vous devez prendre une décision importante
              pour l'avenir numérique de votre école.
            </p>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-left transition"
              onClick={() => console.log('Choice 1')}
            >
              <div className="font-semibold mb-1">Acheter des nouvelles licences Windows 11</div>
              <div className="text-sm opacity-80">Coût: -5000€ | Dépendance: +10%</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-green-600 hover:bg-green-700 rounded-lg text-left transition"
              onClick={() => console.log('Choice 2')}
            >
              <div className="font-semibold mb-1">Explorer des alternatives libres</div>
              <div className="text-sm opacity-80">Dépendance: -5% | XP: +50</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-left transition"
              onClick={() => console.log('Choice 3')}
            >
              <div className="font-semibold mb-1">Demander conseil à la communauté NIRD</div>
              <div className="text-sm opacity-80">XP: +100 | Débloque: Bibliothèque</div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryMode;
