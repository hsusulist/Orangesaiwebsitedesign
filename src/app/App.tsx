import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/DashboardAnimated';
import { PricingSection } from './components/PricingSection';
import { DocsSection } from './components/DocsSection';
import { useAnimatedCounter } from './hooks/useAnimatedCounter';
import { DemoModal } from './components/DemoModal';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUsersStarted, setActiveUsersStarted] = useState(false);

  // Animated counter for active users
  const activeUsers = useAnimatedCounter(1250000, 2500, '');

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Start counting after a short delay
    const timer = setTimeout(() => setActiveUsersStarted(true), 500);
    
    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    }
    return num.toLocaleString();
  };

  // Show dashboard if logged in
  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-2xl">Oranges AI</h1>
          </motion.div>
          <nav className="flex items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#models"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Models
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#pricing"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Pricing
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#docs"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Docs
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md"
            >
              Get Started
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm mb-6"
            >
              🍊 Fresh AI Technology
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
            >
              Squeeze the Power of Advanced AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8"
            >
              Three specialized AI models designed to meet every need - from lightning-fast responses to deep reasoning and creative game development.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setIsAuthModalOpen(true); setActiveUsersStarted(true); }}
                className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-white/10 text-white px-8 py-4 rounded-xl backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 transition-colors"
              >
                View Demo
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 mt-12"
            >
              <div>
                <motion.p
                  key={activeUsers}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-3xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
                >
                  {activeUsersStarted ? formatNumber(parseInt(activeUsers)) : '0'}
                </motion.p>
                <p className="text-sm text-gray-500">Active Users</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-3xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">99.9%</p>
                <p className="text-sm text-gray-500">Uptime</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-3xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">50ms</p>
                <p className="text-sm text-gray-500">Avg Response</p>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-3xl"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1679193559799-4bdc724dfc45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG9yYW5nZSUyMGdyYWRpZW50fGVufDF8fHx8MTc2NjIwMDc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Oranges AI Technology"
              className="relative rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl mb-4">Choose Your Juice</h2>
          <p className="text-xl text-gray-600">Three powerful AI models, each optimized for different use cases</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Fast Juices */}
          <ModelCard
            title="Fast Juices"
            subtitle="Lightning Speed"
            description="Get instant AI responses with our optimized model. Perfect for quick queries, real-time applications, and rapid prototyping."
            color="bg-orange-500"
            icon={Zap}
            features={[
              { icon: Clock, text: "Response time under 50ms" },
              { icon: Sparkles, text: "Optimized for speed and efficiency" },
              { icon: Brain, text: "Smart caching for common queries" },
            ]}
          />

          {/* Pure Juice */}
          <ModelCard
            title="Pure Juice"
            subtitle="Better Thinking"
            description="Enhanced reasoning capabilities for complex problems. Ideal for analysis, decision-making, and nuanced conversations."
            color="bg-amber-500"
            icon={Brain}
            features={[
              { icon: Brain, text: "Advanced reasoning algorithms" },
              { icon: Sparkles, text: "Better context understanding" },
              { icon: Clock, text: "Balanced speed and accuracy" },
            ]}
          />

          {/* Juices */}
          <ModelCard
            title="Juices"
            subtitle="Creative Powerhouse"
            description="Specialized for game development and scripting with extended thinking time. Perfect for complex creative projects and detailed code generation."
            color="bg-red-500"
            icon={Gamepad2}
            features={[
              { icon: Gamepad2, text: "Optimized for game logic and design" },
              { icon: Code, text: "Advanced scripting capabilities" },
              { icon: Brain, text: "Extended thinking for complex tasks" },
            ]}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection onGetStarted={() => setIsAuthModalOpen(true)} />

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1592187270831-4196d903d031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBjaXRydXMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NjI4NjU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Orange technology"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl mb-6">Why Choose Oranges AI?</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: 'Blazing Fast Performance',
                    description: 'Our infrastructure ensures the fastest response times in the industry with 99.9% uptime guaranteed.',
                    color: 'bg-orange-100',
                    iconColor: 'text-orange-500',
                  },
                  {
                    icon: Brain,
                    title: 'Advanced Intelligence',
                    description: 'State-of-the-art AI models trained on diverse datasets for superior understanding and reasoning.',
                    color: 'bg-amber-100',
                    iconColor: 'text-amber-500',
                  },
                  {
                    icon: Gamepad2,
                    title: 'Specialized Solutions',
                    description: 'Purpose-built models for specific tasks like game development, scripting, and creative work.',
                    color: 'bg-red-100',
                    iconColor: 'text-red-500',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ x: 10 }}
                    className="flex gap-4"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`flex-shrink-0 w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}
                    >
                      <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Docs Section */}
      <DocsSection onGetStarted={() => setIsAuthModalOpen(true)} />

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1648294358557-80d5aeb2e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwb3JhbmdlJTIwZGlnaXRhbHxlbnwxfHx8fDE3NjYyODY1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl mb-4"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl mb-8 opacity-90"
            >
              Join thousands of developers using Oranges AI to build amazing applications
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white text-orange-500 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl">Oranges AI</span>
              </div>
              <p className="text-gray-400 text-sm">Fresh AI technology for modern applications</p>
            </div>
            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#models" className="hover:text-orange-400 transition-colors">Fast Juices</a></li>
                <li><a href="#models" className="hover:text-orange-400 transition-colors">Pure Juice</a></li>
                <li><a href="#models" className="hover:text-orange-400 transition-colors">Juices</a></li>
                <li><a href="#pricing" className="hover:text-orange-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#docs" className="hover:text-orange-400 transition-colors">Documentation</a></li>
                <li><a href="#docs" className="hover:text-orange-400 transition-colors">API Reference</a></li>
                <li><a href="#docs" className="hover:text-orange-400 transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Oranges AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}