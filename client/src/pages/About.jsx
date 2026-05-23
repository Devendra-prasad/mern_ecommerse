import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { FaHome, FaHandshake, FaTags, FaUserShield, FaSearch, FaCheckCircle } from 'react-icons/fa';

export default function About() {
  return (
    <div className="bg-beige-primary min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 px-6">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-gold-accent/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight leading-tight mb-6">
            Redefining <span className="gradient-text">Real Estate</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed">
            We are eliminating the middleman. Experience a transparent, hassle-free platform where buyers connect directly with property owners. No hidden fees, no brokerage, just perfect homes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {/* Trust Markers / Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {[
            { number: "10K+", label: "Happy Users" },
            { number: "5K+", label: "Verified Listings" },
            { number: "₹0", label: "Brokerage Fees" },
            { number: "24/7", label: "Direct Access" },
          ].map((stat, index) => (
            <GlassCard key={index} className="p-8 text-center" hover={false}>
              <h2 className="text-4xl md:text-5xl font-black text-purple-600 tracking-tighter mb-2">{stat.number}</h2>
              <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* How It Works */}
        <div className="space-y-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-center">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">How It Works</h2>
            <p className="text-slate-500 font-medium mt-2">A seamless process for both buyers and sellers.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8 space-y-4 text-center group" hover={true}>
              <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaSearch className="text-3xl text-blue-500" />
              </div>
              <h3 className="text-xl font-black text-slate-800">1. Discover</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Explore thousands of verified properties using our advanced search filters to find exactly what you need.
              </p>
            </GlassCard>
            
            <GlassCard className="p-8 space-y-4 text-center group" hover={true}>
              <div className="w-20 h-20 mx-auto bg-purple-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaHandshake className="text-4xl text-purple-600 ml-1" />
              </div>
              <h3 className="text-xl font-black text-slate-800">2. Connect Directly</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Say goodbye to middlemen. Use our platform to send inquiries directly to the verified property owner's inbox.
              </p>
            </GlassCard>
            
            <GlassCard className="p-8 space-y-4 text-center group" hover={true}>
              <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaHome className="text-4xl text-green-500 mb-1" />
              </div>
              <h3 className="text-xl font-black text-slate-800">3. Move In</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Finalize the deal offline with complete transparency and step into your new dream home.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">Why Choose Us?</h2>
            <div className="space-y-6">
              {[
                { icon: <FaUserShield />, title: "100% Verified Owners", desc: "Every property listed on our platform goes through checks to ensure authenticity." },
                { icon: <FaTags />, title: "Massive Discounts", desc: "Owners can offer exclusive discounts, helping you save big on the best properties." },
                { icon: <FaCheckCircle />, title: "Direct Transparency", desc: "We don't hide information. You get the exact asking price and direct contact details." }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="p-4 bg-white rounded-2xl shadow-lg border border-slate-100 text-gold-accent text-2xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-800 mb-1">{feature.title}</h4>
                    <p className="text-slate-500 font-medium text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <GlassCard className="p-2 border-white/60 shadow-2xl" hover={false}>
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern Home" 
                className="rounded-3xl w-full h-[500px] object-cover"
              />
            </GlassCard>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Success Rate</p>
              <p className="text-4xl font-black text-purple-600">98%</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <GlassCard className="p-12 md:p-20 text-center relative overflow-hidden" hover={false}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Ready to find your next home?</h2>
              <p className="text-purple-100 font-medium text-lg max-w-2xl mx-auto">
                Join thousands of users who have already found their perfect match. Whether you are looking to buy, rent, or list a property, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Link to="/search" className="w-full sm:w-auto px-10 py-5 bg-white text-purple-600 rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform uppercase tracking-widest">
                  Explore Now
                </Link>
                <Link to="/create-listing" className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-black text-lg hover:bg-white/10 transition-colors uppercase tracking-widest">
                  List Property
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
