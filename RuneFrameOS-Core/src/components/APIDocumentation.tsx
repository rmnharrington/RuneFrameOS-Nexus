'use client';

import { useState } from 'react';
import { Code, Play, Copy, Check, BookOpen, Zap, Shield, Database } from 'lucide-react';

interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  service: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  requestBody?: {
    type: string;
    schema: string;
  };
  responses: Array<{
    code: number;
    description: string;
    example: string;
  }>;
  tags: string[];
}

export default function APIDocumentation() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>('all');

  const apiEndpoints: APIEndpoint[] = [
    {
      id: 'auth-login',
      method: 'POST',
      path: '/api/auth/login',
      description: 'Authenticate user and return JWT token',
      service: 'auth',
      requestBody: {
        type: 'application/json',
        schema: 'LoginRequest'
      },
      responses: [
        {
          code: 200,
          description: 'Authentication successful',
          example: '{"token": "jwt_token_here", "user": {...}}'
        },
        {
          code: 401,
          description: 'Invalid credentials',
          example: '{"error": "Invalid username or password"}'
        }
      ],
      tags: ['authentication', 'security']
    },
    {
      id: 'users-profile',
      method: 'GET',
      path: '/api/users/profile',
      description: 'Get current user profile information',
      service: 'users',
      responses: [
        {
          code: 200,
          description: 'User profile retrieved successfully',
          example: '{"id": "123", "username": "john_doe", "email": "john@example.com"}'
        },
        {
          code: 401,
          description: 'Unauthorized - token required',
          example: '{"error": "Authentication required"}'
        }
      ],
      tags: ['user-management', 'profile']
    },
    {
      id: 'core-process',
      method: 'POST',
      path: '/api/core/process',
      description: 'Process business logic with input data',
      service: 'core',
      parameters: [
        {
          name: 'type',
          type: 'string',
          required: true,
          description: 'Type of processing to perform'
        }
      ],
      requestBody: {
        type: 'application/json',
        schema: 'ProcessRequest'
      },
      responses: [
        {
          code: 200,
          description: 'Processing completed successfully',
          example: '{"result": "processed_data", "status": "success"}'
        },
        {
          code: 400,
          description: 'Invalid input data',
          example: '{"error": "Invalid input parameters"}'
        }
      ],
      tags: ['business-logic', 'processing']
    }
  ];

  const services = [
    { id: 'all', name: 'All Services', icon: BookOpen },
    { id: 'auth', name: 'Authentication', icon: Shield },
    { id: 'users', name: 'User Management', icon: Database },
    { id: 'core', name: 'Core Business', icon: Zap }
  ];

  const filteredEndpoints = selectedService === 'all' 
    ? apiEndpoints 
    : apiEndpoints.filter(endpoint => endpoint.service === selectedService);

  const copyToClipboard = async (text: string, endpointId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEndpoint(endpointId);
      setTimeout(() => setCopiedEndpoint(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'endpoints', label: 'Endpoints', icon: Code },
    { id: 'schemas', label: 'Schemas', icon: Database },
    { id: 'examples', label: 'Examples', icon: Play }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.id} className="card text-center">
                    <div className="p-3 bg-primary-100 rounded-lg inline-block mb-4">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {service.id === 'all' 
                        ? `${apiEndpoints.length} total endpoints`
                        : `${apiEndpoints.filter(e => e.service === service.id).length} endpoints`
                      }
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">JWT Authentication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-700">Rate Limiting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-purple-500" />
                  <span className="text-sm text-gray-700">Request Validation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-orange-500" />
                  <span className="text-sm text-gray-700">OpenAPI 3.0 Spec</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'endpoints':
        return (
          <div className="space-y-6">
            <div className="flex space-x-2 mb-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      selectedService === service.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{service.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="space-y-4">
              {filteredEndpoints.map((endpoint) => (
                <div key={endpoint.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-gray-700 mb-3">{endpoint.description}</p>
                      
                      {endpoint.parameters && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Parameters:</h4>
                          <div className="space-y-1">
                            {endpoint.parameters.map((param) => (
                              <div key={param.name} className="text-sm">
                                <code className="font-mono text-primary-600">{param.name}</code>
                                <span className="text-gray-500 ml-2">({param.type})</span>
                                {param.required && <span className="text-red-500 ml-2">*</span>}
                                <span className="text-gray-600 ml-2">- {param.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Responses:</h4>
                        <div className="space-y-2">
                          {endpoint.responses.map((response) => (
                            <div key={response.code} className="text-sm">
                              <span className="font-medium text-gray-700">{response.code}</span>
                              <span className="text-gray-500 ml-2">- {response.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => copyToClipboard(endpoint.path, endpoint.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        title="Copy endpoint"
                      >
                        {copiedEndpoint === endpoint.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                        title="Test endpoint"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {endpoint.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'schemas':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Schemas</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">LoginRequest</h4>
                <pre className="text-sm text-gray-700 bg-gray-50 p-3 rounded overflow-x-auto">
{`{
  "username": "string",
  "password": "string",
  "rememberMe": "boolean (optional)"
}`}
                </pre>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">ProcessRequest</h4>
                <pre className="text-sm text-gray-700 bg-gray-50 p-3 rounded overflow-x-auto">
{`{
  "type": "string",
  "data": "object",
  "options": "object (optional)"
}`}
                </pre>
              </div>
            </div>
          </div>
        );
        
      case 'examples':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Examples</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">JavaScript/Node.js</h4>
                <pre className="text-sm text-gray-700 bg-gray-50 p-3 rounded overflow-x-auto">
{`const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Python</h4>
                <pre className="text-sm text-gray-700 bg-gray-50 p-3 rounded overflow-x-auto">
{`import requests

response = requests.post('/api/auth/login', json={
    'username': 'user@example.com',
    'password': 'password123'
})

data = response.json()`}
                </pre>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">API Documentation</h2>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            <Code className="h-4 w-4 mr-2" />
            OpenAPI Spec
          </button>
          <button className="btn-primary">
            <Play className="h-4 w-4 mr-2" />
            Test Console
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}
