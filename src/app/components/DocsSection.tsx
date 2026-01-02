import { motion } from 'motion/react';
import { Book, Code, Zap, Brain, Terminal, FileCode, Rocket, Shield } from 'lucide-react';

interface DocsSectionProps {
  onGetStarted: () => void;
}

export function DocsSection({ onGetStarted }: DocsSectionProps) {
  const docCategories = [
    {
      title: 'Getting Started',
      icon: Rocket,
      color: 'from-orange-500 to-orange-600',
      links: [
        { name: 'Quick Start Guide', description: 'Get up and running in 5 minutes' },
        { name: 'Installation', description: 'Install the Oranges AI SDK' },
        { name: 'Authentication', description: 'Secure your API requests' },
        { name: 'First Request', description: 'Make your first AI request' },
      ],
    },
    {
      title: 'API Reference',
      icon: Code,
      color: 'from-amber-500 to-amber-600',
      links: [
        { name: 'Fast Juices API', description: 'Endpoint documentation for fast responses' },
        { name: 'Pure Juice API', description: 'Advanced reasoning endpoints' },
        { name: 'Juices API', description: 'Game & script development endpoints' },
        { name: 'Rate Limits', description: 'Understanding API rate limits' },
      ],
    },
    {
      title: 'Code Examples',
      icon: FileCode,
      color: 'from-red-500 to-red-600',
      links: [
        { name: 'JavaScript/TypeScript', description: 'Node.js and browser examples' },
        { name: 'Python', description: 'Python SDK and examples' },
        { name: 'React Integration', description: 'Build React apps with Oranges AI' },
        { name: 'Game Development', description: 'Unity and Unreal Engine examples' },
      ],
    },
    {
      title: 'Advanced Topics',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      links: [
        { name: 'Fine-tuning', description: 'Customize models for your use case' },
        { name: 'Streaming Responses', description: 'Real-time AI responses' },
        { name: 'Embeddings', description: 'Vector representations and search' },
        { name: 'Best Practices', description: 'Optimize your AI applications' },
      ],
    },
  ];

  const quickLinks = [
    { icon: Terminal, title: 'CLI Tool', description: 'Command-line interface for Oranges AI' },
    { icon: Shield, title: 'Security', description: 'Best practices for secure integration' },
    { icon: Zap, title: 'Performance', description: 'Optimize response times and costs' },
    { icon: Book, title: 'Tutorials', description: 'Step-by-step guides and tutorials' },
  ];

  return (
    <section id="docs" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl mb-4">Documentation</h2>
          <p className="text-xl text-gray-600">Everything you need to integrate Oranges AI</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {docCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl items-center justify-center mb-4`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-xl mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.links.map((link, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="group cursor-pointer"
                  >
                    <p className="text-sm group-hover:text-orange-500 transition-colors">
                      {link.name}
                    </p>
                    <p className="text-xs text-gray-500">{link.description}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl mb-2">Start Building Today</h3>
              <p className="opacity-90">Get your API key and start integrating in minutes</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-white text-orange-500 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Get API Key
            </motion.button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-flex w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mb-3"
              >
                <link.icon className="w-6 h-6 text-orange-500" />
              </motion.div>
              <h4 className="mb-2">{link.title}</h4>
              <p className="text-sm text-gray-600">{link.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Need help? Our community is here for you</p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Join Discord
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
            >
              GitHub
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Stack Overflow
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
