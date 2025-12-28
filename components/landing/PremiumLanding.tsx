'use client'

import React, { useEffect, useState } from 'react';

const PremiumLanding: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-up');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-fade-in-up');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="/hero-studio.jpg" 
            alt="Modern print studio interior"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.style.background = 'linear-gradient(to bottom right, rgb(51, 65, 85), rgb(15, 23, 42))';
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl font-bold text-teal-400 mr-2">Z</div>
              <div className="text-3xl font-bold tracking-wider">ZAPRINT</div>
            </div>
            <div className="text-lg text-slate-300 tracking-widest">Print & Create</div>
          </div>

          {/* Hero Headlines */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Printing Made Easy.
              <br />
              <span className="text-teal-400">Create Without Limits.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into stunning prints with our modern studio-quality equipment and creative expertise. From concept to creation, we make printing effortless.
            </p>

            <button className="bg-teal-500 hover:bg-teal-400 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg">
              Start Printing
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About / Value Section */}
      <section className="py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">
                Where Creativity Meets 
                <span className="text-teal-400"> Craftsmanship</span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                ZAPRINT bridges the gap between digital creativity and tangible results. Our modern studio combines cutting-edge printing technology with the warmth of traditional craftsmanship.
              </p>
              
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Whether you're a designer, artist, or business owner, we provide the tools and expertise to bring your vision to life with exceptional quality and attention to detail.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-teal-400">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  <span className="text-lg">Studio-Quality Equipment</span>
                </div>
                <div className="flex items-center text-teal-400">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  <span className="text-lg">Expert Guidance</span>
                </div>
                <div className="flex items-center text-teal-400">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  <span className="text-lg">Premium Materials</span>
                </div>
              </div>
            </div>

            <div className="fade-in-up">
              <div className="relative">
                <img 
                  src="/studio-workspace.jpg" 
                  alt="Creative print studio workspace"
                  className="w-full h-96 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 object-cover"
                  onError={(e) => {
                    // Fallback to gradient placeholder if image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-96 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 flex items-center justify-center';
                    fallback.innerHTML = '<div class="text-center text-white/60"><div class="text-6xl mb-4">🏭</div><p class="text-lg">Creative Print Studio Workspace</p></div>';
                    e.currentTarget.parentElement!.appendChild(fallback);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Everything You Need to 
              <span className="text-teal-400"> Create</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From high-resolution printing to custom finishing, our comprehensive suite of services ensures your projects exceed expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "High-Quality Prints",
                description: "Professional-grade printing with vibrant colors and sharp details on premium materials.",
                icon: "🖨️"
              },
              {
                title: "Creative Customization",
                description: "Unlimited design possibilities with custom sizes, finishes, and specialty materials.",
                icon: "🎨"
              },
              {
                title: "Fast & Reliable",
                description: "Quick turnaround times without compromising on quality or attention to detail.",
                icon: "⚡"
              },
              {
                title: "Modern Tools",
                description: "State-of-the-art equipment and technology for precision and consistency.",
                icon: "🔧"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="fade-in-up bg-slate-800 p-8 rounded-2xl hover:bg-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-teal-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Crafted with 
              <span className="text-teal-400"> Precision</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Step inside our modern studio where creativity comes to life through meticulous attention to detail and cutting-edge technology.
            </p>
          </div>

          <div className="fade-in-up">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/print-studio-wide.jpg" 
                alt="ZAPRINT modern printing studio interior"
                className="w-full h-96 lg:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  // Fallback to gradient placeholder if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-96 lg:h-[600px] bg-gradient-to-br from-slate-700 via-slate-800 to-teal-800 hover:scale-105 transition-transform duration-700 flex items-center justify-center';
                  fallback.innerHTML = '<div class="text-center text-white/60"><div class="text-8xl mb-6">🏢</div><p class="text-2xl font-semibold">ZAPRINT Modern Studio Interior</p><p class="text-lg mt-2">Premium Printing Environment</p></div>';
                  e.currentTarget.parentElement!.appendChild(fallback);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    Where Ideas Take Shape
                  </h3>
                  <p className="text-lg text-slate-200 leading-relaxed">
                    Our studio combines the warmth of traditional craftsmanship with modern precision, creating an environment where every project receives the attention it deserves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-teal-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
              Ready to Create Something Amazing?
            </h2>
            
            <p className="text-xl lg:text-2xl text-teal-100 mb-12 leading-relaxed">
              Join thousands of creators who trust ZAPRINT to bring their visions to life. Start your printing journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-white text-teal-600 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                Start Printing Now
              </button>
              
              <button className="border-2 border-white text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 hover:scale-105">
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="text-2xl font-bold text-teal-400 mr-2">Z</div>
              <div className="text-xl font-bold tracking-wider text-white">ZAPRINT</div>
              <div className="text-slate-400 ml-2">Print & Create</div>
            </div>
            
            <div className="text-slate-400">
              © 2024 ZAPRINT. Crafted with precision.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumLanding;