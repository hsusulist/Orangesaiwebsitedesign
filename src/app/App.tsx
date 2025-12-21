import { Zap, Brain, Gamepad2, Sparkles, Clock, Code } from 'lucide-react';
import { useState } from 'react';
import { ModelCard } from './components/ModelCard';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl">Oranges AI</h1>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#models" className="text-gray-600 hover:text-orange-500 transition-colors">Models</a>
            <a href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors">Pricing</a>
            <a href="#docs" className="text-gray-600 hover:text-orange-500 transition-colors">Docs</a>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm mb-6">
              🍊 Fresh AI Technology
            </div>
            <h2 className="text-5xl mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Squeeze the Power of Advanced AI
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Three specialized AI models designed to meet every need - from lightning-fast responses to deep reasoning and creative game development.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started
              </button>
              <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg hover:bg-orange-50 transition-colors">
                View Demo
              </button>
            </div>
            <div className="flex items-center gap-8 mt-12">
              <div>
                <p className="text-3xl">1M+</p>
                <p className="text-sm text-gray-500">Active Users</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-3xl">99.9%</p>
                <p className="text-sm text-gray-500">Uptime</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-3xl">50ms</p>
                <p className="text-sm text-gray-500">Avg Response</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-3xl opacity-20"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1679193559799-4bdc724dfc45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG9yYW5nZSUyMGdyYWRpZW50fGVufDF8fHx8MTc2NjIwMDc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Oranges AI Technology"
              className="relative rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Choose Your Juice</h2>
          <p className="text-xl text-gray-600">Three powerful AI models, each optimized for different use cases</p>
        </div>

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

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1592187270831-4196d903d031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBjaXRydXMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NjI4NjU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Orange technology"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl mb-6">Why Choose Oranges AI?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Blazing Fast Performance</h3>
                    <p className="text-gray-600">Our infrastructure ensures the fastest response times in the industry with 99.9% uptime guaranteed.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Advanced Intelligence</h3>
                    <p className="text-gray-600">State-of-the-art AI models trained on diverse datasets for superior understanding and reasoning.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Specialized Solutions</h3>
                    <p className="text-gray-600">Purpose-built models for specific tasks like game development, scripting, and creative work.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1648294358557-80d5aeb2e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwb3JhbmdlJTIwZGlnaXRhbHxlbnwxfHx8fDE3NjYyODY1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of developers using Oranges AI to build amazing applications</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white text-orange-500 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
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
                <li><a href="#" className="hover:text-orange-400">Fast Juices</a></li>
                <li><a href="#" className="hover:text-orange-400">Pure Juice</a></li>
                <li><a href="#" className="hover:text-orange-400">Juices</a></li>
                <li><a href="#" className="hover:text-orange-400">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-400">Documentation</a></li>
                <li><a href="#" className="hover:text-orange-400">API Reference</a></li>
                <li><a href="#" className="hover:text-orange-400">Tutorials</a></li>
                <li><a href="#" className="hover:text-orange-400">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-400">About</a></li>
                <li><a href="#" className="hover:text-orange-400">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400">Contact</a></li>
                <li><a href="#" className="hover:text-orange-400">Privacy</a></li>
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