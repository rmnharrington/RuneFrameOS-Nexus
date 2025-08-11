'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Database, Cpu, HardDrive } from 'lucide-react';

interface Metric {
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

export default function SystemMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      name: 'CPU Usage',
      value: '23%',
      change: 2.1,
      trend: 'up',
      icon: Cpu,
      color: 'text-blue-600'
    },
    {
      name: 'Memory Usage',
      value: '67%',
      change: -1.5,
      trend: 'down',
      icon: HardDrive,
      color: 'text-green-600'
    },
    {
      name: 'Network I/O',
      value: '2.4 GB/s',
      change: 8.7,
      trend: 'up',
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      name: 'Database Connections',
      value: '156',
      change: 0,
      trend: 'stable',
      icon: Database,
      color: 'text-orange-600'
    }
  ]);

  const [performanceData, setPerformanceData] = useState({
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    cpu: [15, 18, 25, 30, 28, 23],
    memory: [60, 62, 65, 68, 67, 67],
    network: [1.2, 1.8, 2.1, 2.4, 2.3, 2.4]
  });

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Performance</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-gray-100 ${metric.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              
              <div className="mt-4 flex items-center space-x-2">
                {getTrendIcon(metric.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span className="text-sm text-gray-500">from last hour</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU Usage Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">CPU Usage (24h)</h3>
          <div className="h-48 flex items-end space-x-1">
            {performanceData.cpu.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                style={{ height: `${(value / 100) * 100}%` }}
                title={`${performanceData.labels[index]}: ${value}%`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {performanceData.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>

        {/* Memory Usage Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Memory Usage (24h)</h3>
          <div className="h-48 flex items-end space-x-1">
            {performanceData.memory.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t"
                style={{ height: `${(value / 100) * 100}%` }}
                title={`${performanceData.labels[index]}: ${value}%`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {performanceData.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* System Health Indicators */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
            <h4 className="font-medium text-gray-900">Overall Health</h4>
            <p className="text-sm text-gray-600">Excellent</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
            <h4 className="font-medium text-gray-900">Performance</h4>
            <p className="text-sm text-gray-600">Optimal</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
            </div>
            <h4 className="font-medium text-gray-900">Security</h4>
            <p className="text-sm text-gray-600">Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
