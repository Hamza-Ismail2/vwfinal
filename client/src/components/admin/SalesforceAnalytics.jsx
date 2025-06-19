import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const SalesforceAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalLeads: 0,
    closedDeals: 0,
    revenue: 0,
    pipeline: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // Simulate analytics data - replace with real API call
        setTimeout(() => {
          setAnalytics({
            totalLeads: 156,
            closedDeals: 45,
            revenue: 125000,
            pipeline: 32000,
            conversionRate: 28.8
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const analyticsCards = [
    { title: 'Total Leads', value: analytics.totalLeads, icon: EnvelopeIcon, color: 'from-blue-500 to-blue-600', suffix: '' },
    { title: 'Closed Deals', value: analytics.closedDeals, icon: CheckCircleIcon, color: 'from-green-500 to-green-600', suffix: '' },
    { title: 'Revenue', value: analytics.revenue, icon: CurrencyDollarIcon, color: 'from-purple-500 to-purple-600', prefix: '$' },
    { title: 'Pipeline', value: analytics.pipeline, icon: ClockIcon, color: 'from-orange-500 to-orange-600', prefix: '$' },
    { title: 'Conversion Rate', value: analytics.conversionRate, icon: ChartBarIcon, color: 'from-pink-500 to-pink-600', suffix: '%' }
  ];

  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30">
        <h1 className="text-4xl font-bold text-white mb-2">Salesforce Analytics</h1>
        <p className="text-slate-300 text-lg">Track your sales performance and customer engagement metrics.</p>
      </div>

      {loading ? (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/30 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading analytics...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {analyticsCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-slate-300 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-white">
                  <AnimatedNumber value={card.value} prefix={card.prefix} suffix={card.suffix} />
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-white text-sm">New lead from VIP charter inquiry</p>
                <p className="text-slate-400 text-xs">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-white text-sm">Deal closed: Emergency medical transport</p>
                <p className="text-slate-400 text-xs">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-white text-sm">Follow-up scheduled: Corporate contract</p>
                <p className="text-slate-400 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30">
          <h3 className="text-xl font-bold text-white mb-4">Top Services</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">VIP Charter</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
                <span className="text-white text-sm">85%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Emergency Medical</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '72%'}}></div>
                </div>
                <span className="text-white text-sm">72%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Corporate Transport</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>
                <span className="text-white text-sm">68%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Tourism & Sightseeing</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                <span className="text-white text-sm">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SalesforceAnalytics; 