'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface SystemStatus {
  auth: string;
  users: string;
  core: string;
  gateway: string;
}

interface ServiceStatusProps {
  systemStatus: SystemStatus;
}

interface Service {
  id: string;
  name: string;
  description: string;
  port: number;
  status: string;
  uptime: string;
  requests: number;
  errors: number;
}

export default function ServiceStatus({ systemStatus }: ServiceStatusProps) {
  const [services, setServices] = useState<Service[]>([
    {
      id: 'auth',
      name: 'Authentication Service',
      description: 'Handles user authentication, authorization, and session management',
      port: 3001,
      status: 'running',
      uptime: '2d 14h 32m',
      requests: 1247,
      errors: 3
    },
    {
      id: 'users',
      name: 'User Management Service',
      description: 'Manages user profiles, preferences, and account operations',
      port: 3002,
      status: 'running',
      uptime: '2d 14h 28m',
      requests: 892,
      errors: 1
    },
    {
      id: 'core',
      name: 'Core Business Logic Service',
      description: 'Handles core business operations and data processing',
      port: 3003,
      status: 'running',
      uptime: '2d 14h 25m',
      requests: 2156,
      errors: 7
    },
    {
      id: 'gateway',
      name: 'API Gateway',
      description: 'Routes requests, handles load balancing and rate limiting',
      port: 3000,
      status: 'ready',
      uptime: '2d 14h 30m',
      requests: 4295,
      errors: 11
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'stopped':
        return <Pause className="h-5 w-5 text-red-500" />;
      case 'starting':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'starting':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleServiceAction = (serviceId: string, action: 'start' | 'stop' | 'restart') => {
    setServices(prev => prev.map(service => {
      if (service.id === serviceId) {
        switch (action) {
          case 'start':
            return { ...service, status: 'starting' };
          case 'stop':
            return { ...service, status: 'stopped' };
          case 'restart':
            return { ...service, status: 'starting' };
          default:
            return service;
        }
      }
      return service;
    }));

    // Simulate service action completion
    setTimeout(() => {
      setServices(prev => prev.map(service => {
        if (service.id === serviceId && action === 'start') {
          return { ...service, status: 'running' };
        }
        return service;
      }));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Service Status</h2>
        <div className="flex space-x-2">
          <button className="btn-primary">
            <Play className="h-4 w-4 mr-2" />
            Start All
          </button>
          <button className="btn-secondary">
            <Pause className="h-4 w-4 mr-2" />
            Stop All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(service.status)}
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Port:</span>
                    <span className="ml-2 font-mono text-gray-900">{service.port}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Uptime:</span>
                    <span className="ml-2 text-gray-900">{service.uptime}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Requests:</span>
                    <span className="ml-2 text-gray-900">{service.requests.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Errors:</span>
                    <span className="ml-2 text-gray-900">{service.errors}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handleServiceAction(service.id, 'start')}
                  disabled={service.status === 'running' || service.status === 'starting'}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Start Service"
                >
                  <Play className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => handleServiceAction(service.id, 'stop')}
                  disabled={service.status === 'stopped'}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Stop Service"
                >
                  <Pause className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => handleServiceAction(service.id, 'restart')}
                  disabled={service.status === 'starting'}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Restart Service"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
