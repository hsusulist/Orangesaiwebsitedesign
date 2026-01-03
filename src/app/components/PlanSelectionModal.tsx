import { motion, AnimatePresence } from 'motion/react';
import { Zap, Sparkles, Rocket, Check, Brain, Gamepad2 } from 'lucide-react';

interface PlanSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: (plan: 'free' | 'pro' | 'core') => void;
}

export function PlanSelectionModal({ isOpen, onClose, onPlanSelect }: PlanSelectionModalProps) {
  const plans = [
    {
      id: 'free' as const,
      name: 'Free Plan',
      icon: Zap,
      color: 'from-gray-500 to-gray-600',
      price: '$0',
      features: [
        'Pure Juice & Fast Juice access',
        '500 credits daily',
        'Up to 3 projects',
        'Community support',
      ],
    },
    {
      id: 'pro' as const,
      name: 'Pro Plan',
      icon: Sparkles,
      color: 'from-orange-500 to-amber-500',
      price: '$29/mo',
      popular: true,
      features: [
        'All models including Juices',
        '5,000 credits monthly',
        'Up to 10 projects',
        'Deep Thinking unlocked',
        'Priority support',
      ],
    },
    {
      id: 'core' as const,
      name: 'Core Plan',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500',
      price: '$99/mo',
      features: [
        'Access to newest models',
        'Unlimited credits',
        'Unlimited projects',
        'Advanced features',
        'Dedicated support',
        'API access',
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-8"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-12"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-4xl mb-2">Choose Your Plan</h2>
              <p className="text-gray-600">Start your journey with Oranges AI</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                    plan.popular ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => onPlanSelect(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mb-4`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-2xl mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl">{plan.price}</span>
                    {plan.price !== '$0' && <span className="text-gray-500">/month</span>}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-xl transition-colors ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              You can upgrade or downgrade your plan at any time
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}