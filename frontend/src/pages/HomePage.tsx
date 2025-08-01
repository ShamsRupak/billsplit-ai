import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Camera, 
  Users, 
  Calculator, 
  Smartphone, 
  CreditCard, 
  Zap,
  ArrowRight,
  Star
} from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'AI Receipt Scanning',
    description: 'Upload receipts and let AI parse items automatically with 99% accuracy',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Smart Group Management',
    description: 'Create groups for trips, housemates, events with intelligent categorization',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Calculator,
    title: 'Flexible Splitting',
    description: 'Equal, percentage, or custom splits with debt optimization algorithms',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform',
    description: 'Web, iOS, and Android apps with real-time synchronization',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: CreditCard,
    title: 'Payment Integration',
    description: 'Direct integration with Venmo, PayPal, CashApp, and more',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Zap,
    title: 'Natural Language',
    description: 'Just say "Split the pizza between me and John" and we\'ll handle it',
    color: 'from-yellow-500 to-orange-500'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Digital Nomad',
    content: 'BillSplit.ai has revolutionized how our travel group handles expenses. The AI scanning is incredibly accurate!',
    rating: 5
  },
  {
    name: 'Mike Rodriguez',
    role: 'College Student',
    content: 'Perfect for splitting dorm expenses. The natural language feature is mind-blowing - just tell it what to do!',
    rating: 5
  },
  {
    name: 'Emma Thompson',
    role: 'Event Organizer',
    content: 'Managing group events is so much easier now. The payment integration saves hours of manual work.',
    rating: 5
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Powered by Advanced AI Technology</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Split Bills<br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Smarter
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            The most intelligent expense sharing platform. Scan receipts with AI, 
            split bills naturally, and settle up instantly across all your devices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="xl" variant="default" className="bg-white text-indigo-600 hover:bg-gray-100" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <span>10,000+ Happy Users</span>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <span>Free to Start</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose BillSplit.ai?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of expense sharing with cutting-edge AI and seamless integrations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass-card hover:scale-105 transition-all duration-300 group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:shadow-lg transition-shadow`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Loved by Thousands</h2>
            <p className="text-xl text-gray-400">See what our users are saying about BillSplit.ai</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-300 leading-relaxed italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="gradient-card max-w-4xl mx-auto text-center">
            <CardHeader className="pb-8">
              <CardTitle className="text-4xl font-bold text-white mb-4">
                Ready to Split Smarter?
              </CardTitle>
              <CardDescription className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of users who have simplified their expense sharing with AI-powered intelligence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" variant="gradient" asChild>
                  <Link to="/register">
                    Start Free Today
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-gray-900" asChild>
                  <Link to="/login">I Have an Account</Link>
                </Button>
              </div>
              <p className="text-gray-400 text-sm mt-6">
                No credit card required • Free forever plan available
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
