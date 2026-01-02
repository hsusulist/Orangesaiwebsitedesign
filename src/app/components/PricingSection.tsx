import { motion } from 'motion/react';
import { Check, Zap, Brain, Gamepad2, Sparkles } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: any;
  color: string;
  popular?: boolean;
}

interface PricingSectionProps {
  onGetStarted: () => void;
}

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  const pricingTiers: PricingTier[] = [
    {
      name: 'Fast Juice Pro',
      price: '$9',
      description: 'Perfect for individuals and small projects',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      features: [
        '1,000 requests per month',
        'Lightning fast responses',
        'Basic support',
        'API access',
        'Community forum access',
      ],
    },
    {
      name: 'Pure Juice Pro',
      price: '$29',
      description: 'Ideal for professionals and growing teams',
      icon: Brain,
      color: 'from-amber-500 to-amber-600',
      popular: true,
      features: [
        '10,000 requests per month',
        'Advanced reasoning capabilities',
        'Priority support',
        'Advanced API access',
        'Custom integrations',
        'Team collaboration tools',
      ],
    },
    {
      name: 'Juices Pro',
      price: '$99',
      description: 'For enterprises and game studios',
      icon: Gamepad2,
      color: 'from-red-500 to-red-600',
      features: [
        'Unlimited requests',
        'All AI models included',
        'Dedicated support',
        'Custom model training',
        'Advanced analytics',
        'SLA guarantee',
        'White-label options',
      ],
    },
  ];

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`relative bg-white rounded-2xl shadow-lg p-8 border-2 ${
              tier.popular ? 'border-orange-500' : 'border-gray-200'
            }`}
          >
            {tier.popular && (
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm"
              >
                Most Popular
              </motion.div>
            )}

            <div className="text-center mb-8">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl items-center justify-center mb-4`}
              >
                <tier.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl mb-2">{tier.name}</h3>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl">{tier.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 text-sm">{tier.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className={`w-full py-3 rounded-lg transition-colors ${
                tier.popular
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90'
                  : 'border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              Get Started
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12 p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl"
      >
        <h3 className="text-2xl mb-4">Need a custom plan?</h3>
        <p className="text-gray-600 mb-6">
          Contact our sales team for enterprise solutions tailored to your specific needs
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Contact Sales
        </motion.button>
      </motion.div>
    </section>
  );
}