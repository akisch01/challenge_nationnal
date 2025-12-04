// src/components/Library/ResourceLibrary.jsx
import { useState } from 'react';
import { ArrowLeft, Search, Book, Download, ExternalLink } from 'lucide-react';

const ResourceLibrary = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tout', icon: '📚' },
    { id: 'os', name: 'Systèmes d\'exploitation', icon: '🖥️' },
    { id: 'office', name: 'Bureautique', icon: '📄' },
    { id: 'communication', name: 'Communication', icon: '💬' },
    { id: 'cloud', name: 'Cloud & Stockage', icon: '☁️' },
    { id: 'education', name: 'Éducation', icon: '🎓' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Linux pour l\'éducation',
      category: 'os',
      description: 'Guide complet pour migrer votre établissement vers Linux',
      type: 'Guide PDF',
      url: '#',
      difficulty: 'Intermédiaire',
      duration: '2h de lecture',
    },
    {
      id: 2,
      title: 'LibreOffice - Formation complète',
      category: 'office',
      description: 'Tutoriels vidéo pour maîtriser la suite bureautique libre',
      type: 'Vidéo',
      url: '#',
      difficulty: 'Débutant',
      duration: '5h de formation',
    },
    {
      id: 3,
      title: 'Nextcloud dans les écoles',
      category: 'cloud',
      description: 'Déployer votre propre solution cloud éducative',
      type: 'Documentation',
      url: '#',
      difficulty: 'Avancé',
      duration: '3h de lecture',
    },
    {
      id: 4,
      title: 'Mattermost - Communication d\'équipe',
      category: 'communication',
      description: 'Alternative open-source à Slack et Teams',
      type: 'Guide',
      url: '#',
      difficulty: 'Intermédiaire',
      duration: '1h de lecture',
    },
    {
      id: 5,
      title: 'Outils éducatifs libres',
      category: 'education',
      description: 'Catalogue des meilleurs logiciels pour l\'enseignement',
      type: 'Liste',
      url: '#',
      difficulty: 'Débutant',
      duration: '30min',
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-purple-800 text-white p-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition"
        >
          <ArrowLeft size={20} />
          Retour au village
        </button>

        <div className="flex items-center gap-2">
          <Book size={24} />
          <h1 className="text-xl font-bold">Bibliothèque NIRD</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher une ressource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">{resource.type}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{resource.duration}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
                    <Download size={16} />
                    Télécharger
                  </button>
                  <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg transition">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <Book size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Aucune ressource trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;
