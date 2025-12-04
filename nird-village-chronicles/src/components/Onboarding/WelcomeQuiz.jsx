// src/components/Onboarding/WelcomeQuiz.jsx
import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';

const WelcomeQuiz = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const { updatePlayer } = useGameStore();

  const steps = [
    {
      title: 'Bienvenue dans NIRD Village Chronicles!',
      description: 'Un jeu sérieux sur la souveraineté numérique et les logiciels libres',
      content: (
        <div className="text-center">
          <div className="text-8xl mb-6">🏰</div>
          <p className="text-lg text-gray-700 mb-6">
            Incarnez le directeur ou la directrice d'un établissement scolaire et guidez-le
            vers l'indépendance numérique en découvrant les solutions libres et open-source.
          </p>
        </div>
      ),
    },
    {
      title: 'Quel est votre nom?',
      description: 'Comment souhaitez-vous être appelé·e?',
      content: (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre nom..."
            className="w-full px-6 py-4 text-xl border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 transition"
            autoFocus
          />
        </div>
      ),
    },
    {
      title: 'Votre profil',
      description: 'Quelle est votre relation avec le numérique éducatif?',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'admin', name: 'Administrateur·rice', emoji: '👔', desc: 'Direction, gestion' },
            { id: 'teacher', name: 'Enseignant·e', emoji: '👨‍🏫', desc: 'Pédagogie, usage' },
            { id: 'it', name: 'Informaticien·ne', emoji: '💻', desc: 'Technique, support' },
            { id: 'curious', name: 'Curieux·se', emoji: '🤔', desc: 'Découverte' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setRole(option.id)}
              className={`p-6 rounded-xl border-2 transition text-left hover:scale-105 active:scale-95 ${
                role === option.id
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-300'
              }`}
            >
              <div className="text-5xl mb-3">{option.emoji}</div>
              <div className="font-bold text-lg mb-1">{option.name}</div>
              <div className="text-sm text-gray-600">{option.desc}</div>
            </button>
          ))}
        </div>
      ),
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Save player data and complete onboarding
      updatePlayer({ name: name || 'Directeur·rice', role });
      onComplete();
    }
  };

  const canProceed = () => {
    if (step === 1) return name.trim().length > 0;
    if (step === 2) return role !== '';
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <div key={step}>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-purple-600" size={28} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {currentStep.title}
                </h2>
              </div>

              <p className="text-lg text-gray-600 mb-8">
                {currentStep.description}
              </p>

              <div className="mb-8">
                {currentStep.content}
              </div>
            </div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Étape {step + 1} sur {steps.length}
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                canProceed()
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === steps.length - 1 ? 'Commencer l\'aventure' : 'Suivant'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeQuiz;
