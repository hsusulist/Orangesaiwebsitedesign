import { useState } from 'react';
import { X, Sparkles, Zap, Brain, Gamepad2, MessageSquare, BookOpen, Code, TrendingUp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (name: string, model: string, type: string) => void;
}

export function NewProjectModal({ isOpen, onClose, onCreateProject }: NewProjectModalProps) {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const models = [
    { id: 'juices', name: 'Juices', icon: Gamepad2, color: 'from-red-500 to-red-600', available: true },
    { id: 'pure-juice', name: 'Pure Juice', icon: Brain, color: 'from-amber-500 to-amber-600', available: true },
    { id: 'fast-juice', name: 'Fast Juice', icon: Zap, color: 'from-orange-500 to-orange-600', available: false },
  ];

  const projectTypes = [
    { id: 'homework', name: 'Homework Helper', icon: BookOpen, popular: false },
    { id: 'chatbot', name: 'Chatbot', icon: MessageSquare, popular: true },
    { id: 'roblox', name: 'Roblox Game', icon: Gamepad2, popular: true },
    { id: 'code', name: 'Code Assistant', icon: Code, popular: false },
  ];

  const handleCreate = () => {
    if (projectName && selectedModel && selectedType) {
      onCreateProject(projectName, selectedModel, selectedType);
      // Reset form
      setStep(1);
      setProjectName('');
      setSelectedModel('');
      setSelectedType('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl">Create New Project</h3>
                    <p className="text-sm text-gray-500">Step {step} of 3</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Progress Bar */}
              <div className="flex gap-2 mt-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      s <= step ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Step 1: Name Project */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h4 className="text-xl mb-4">What's your project name?</h4>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="My Awesome Project"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6"
                    autoFocus
                  />
                  <div className="flex justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => projectName && setStep(2)}
                      disabled={!projectName}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Choose AI Model */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h4 className="text-xl mb-4">Choose AI Model</h4>
                  <div className="grid gap-4 mb-6">
                    {models.map((model) => (
                      <motion.div
                        key={model.id}
                        whileHover={{ scale: model.available ? 1.02 : 1 }}
                        whileTap={{ scale: model.available ? 0.98 : 1 }}
                        onClick={() => model.available && setSelectedModel(model.id)}
                        className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedModel === model.id
                            ? 'border-orange-500 bg-orange-50'
                            : model.available
                            ? 'border-gray-200 hover:border-orange-300'
                            : 'border-gray-200 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${model.color} rounded-xl flex items-center justify-center`}>
                            <model.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg">{model.name}</h5>
                            {!model.available && (
                              <span className="text-sm text-gray-500">Coming Soon</span>
                            )}
                          </div>
                          {selectedModel === model.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(1)}
                      className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => selectedModel && setStep(3)}
                      disabled={!selectedModel}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Choose Project Type */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h4 className="text-xl mb-4">What type of project?</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {projectTypes.map((type) => (
                      <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedType(type.id)}
                        className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedType === type.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        {type.popular && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Most Popular
                          </div>
                        )}
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <type.icon className="w-6 h-6 text-orange-500" />
                          </div>
                          <h5>{type.name}</h5>
                          {selectedType === type.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(2)}
                      className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreate}
                      disabled={!selectedType}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Project
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
