'use client';

import { useState, useEffect } from 'react';
import { 
  Bot, 
  Play, 
  Pause, 
  Trash2, 
  Settings, 
  MessageSquare, 
  Activity, 
  Zap,
  Plus,
  Eye,
  EyeOff,
  RotateCcw
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: 'authentication' | 'monitoring' | 'processing' | 'security' | 'analytics';
  status: 'active' | 'idle' | 'processing' | 'error';
  description: string;
  tasksCompleted: number;
  lastActive: string;
  performance: number;
  memory: number;
  cpu: number;
}

interface AgentTask {
  id: string;
  agentId: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  description: string;
  startedAt: string;
  completedAt?: string;
  result?: string;
}

export default function AgentConsole() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'auth-agent-1',
      name: 'Authentication Guardian',
      type: 'authentication',
      status: 'active',
      description: 'Monitors authentication patterns and detects suspicious activities',
      tasksCompleted: 1247,
      lastActive: '2 minutes ago',
      performance: 98,
      memory: 45,
      cpu: 23
    },
    {
      id: 'monitor-agent-1',
      name: 'System Monitor',
      type: 'monitoring',
      status: 'active',
      description: 'Tracks system performance and resource utilization',
      tasksCompleted: 892,
      lastActive: '1 minute ago',
      performance: 95,
      memory: 32,
      cpu: 18
    },
    {
      id: 'process-agent-1',
      name: 'Data Processor',
      type: 'processing',
      status: 'processing',
      description: 'Handles data transformation and business logic processing',
      tasksCompleted: 2156,
      lastActive: 'now',
      performance: 92,
      memory: 67,
      cpu: 45
    },
    {
      id: 'security-agent-1',
      name: 'Security Sentinel',
      type: 'security',
      status: 'active',
      description: 'Analyzes security events and threat patterns',
      tasksCompleted: 567,
      lastActive: '3 minutes ago',
      performance: 99,
      memory: 28,
      cpu: 15
    },
    {
      id: 'analytics-agent-1',
      name: 'Insight Analyzer',
      type: 'analytics',
      status: 'idle',
      description: 'Generates insights from system data and user behavior',
      tasksCompleted: 789,
      lastActive: '5 minutes ago',
      performance: 88,
      memory: 55,
      cpu: 12
    }
  ]);

  const [tasks, setTasks] = useState<AgentTask[]>([
    {
      id: 'task-1',
      agentId: 'process-agent-1',
      type: 'data-processing',
      status: 'running',
      description: 'Processing user analytics data',
      startedAt: '2 minutes ago'
    },
    {
      id: 'task-2',
      agentId: 'auth-agent-1',
      type: 'security-scan',
      status: 'completed',
      description: 'Completed security audit scan',
      startedAt: '10 minutes ago',
      completedAt: '8 minutes ago',
      result: 'No threats detected'
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'authentication':
        return <Bot className="h-5 w-5 text-blue-500" />;
      case 'monitoring':
        return <Activity className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Zap className="h-5 w-5 text-purple-500" />;
      case 'security':
        return <Settings className="h-5 w-5 text-red-500" />;
      case 'analytics':
        return <MessageSquare className="h-5 w-5 text-orange-500" />;
      default:
        return <Bot className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'idle':
        return 'bg-gray-100 text-gray-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAgentAction = (agentId: string, action: 'start' | 'stop' | 'restart') => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        switch (action) {
          case 'start':
            return { ...agent, status: 'active' as const };
          case 'stop':
            return { ...agent, status: 'idle' as const };
          case 'restart':
            return { ...agent, status: 'processing' as const };
          default:
            return agent;
        }
      }
      return agent;
    }));
  };

  const createNewAgent = () => {
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: 'New Agent',
      type: 'monitoring',
      status: 'idle',
      description: 'A new intelligent agent',
      tasksCompleted: 0,
      lastActive: 'just created',
      performance: 0,
      memory: 0,
      cpu: 0
    };
    setAgents(prev => [...prev, newAgent]);
  };

  const deleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId));
    if (selectedAgent === agentId) {
      setSelectedAgent(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Agent Console</h2>
        <div className="flex space-x-2">
          <button onClick={createNewAgent} className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Agent
          </button>
          <button className="btn-secondary">
            <Settings className="h-4 w-4 mr-2" />
            Agent Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Agents</h3>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedAgent === agent.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getAgentTypeIcon(agent.type)}
                      <div>
                        <h4 className="font-medium text-gray-900">{agent.name}</h4>
                        <p className="text-sm text-gray-600">{agent.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAgentAction(agent.id, 'start');
                          }}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Start Agent"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAgentAction(agent.id, 'stop');
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Stop Agent"
                        >
                          <Pause className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAgent(agent.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete Agent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Tasks:</span>
                      <span className="ml-1 font-medium text-gray-900">{agent.tasksCompleted}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Performance:</span>
                      <span className="ml-1 font-medium text-gray-900">{agent.performance}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Memory:</span>
                      <span className="ml-1 font-medium text-gray-900">{agent.memory}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">CPU:</span>
                      <span className="ml-1 font-medium text-gray-900">{agent.cpu}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Details */}
        <div className="space-y-6">
          {selectedAgent ? (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Details</h3>
              {(() => {
                const agent = agents.find(a => a.id === selectedAgent);
                if (!agent) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      {getAgentTypeIcon(agent.type)}
                      <div>
                        <h4 className="font-medium text-gray-900">{agent.name}</h4>
                        <p className="text-sm text-gray-500">{agent.type}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700">{agent.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-700">Last Active:</span>
                        <span className="ml-2 text-sm text-gray-600">{agent.lastActive}</span>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-700">Tasks Completed:</span>
                        <span className="ml-2 text-sm text-gray-600">{agent.tasksCompleted}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Resource Usage</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Performance</span>
                            <span className="text-gray-900">{agent.performance}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${agent.performance}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Memory</span>
                            <span className="text-gray-900">{agent.memory}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${agent.memory}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">CPU</span>
                            <span className="text-gray-900">{agent.cpu}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${agent.cpu}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="card text-center text-gray-500">
              <Bot className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Select an agent to view details</p>
            </div>
          )}

          {/* Recent Tasks */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
              <button
                onClick={() => setShowTaskDetails(!showTaskDetails)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {showTaskDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {showTaskDetails ? (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{task.type}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'running' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>Started: {task.startedAt}</span>
                      {task.completedAt && <span>Completed: {task.completedAt}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                <p className="text-sm">Click to view recent tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
