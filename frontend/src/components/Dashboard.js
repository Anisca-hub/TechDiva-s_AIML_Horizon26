import React from 'react';
import { 
  Activity, 
  Clock, 
  Car, 
  TrendingUp, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Traffic Prediction Accuracy',
      value: '94.2%',
      change: '+2.1%',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Average Time Saved',
      value: '23 min',
      change: '+5 min',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Parking Success Rate',
      value: '87.8%',
      change: '+3.4%',
      icon: Car,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Active Routes',
      value: '1,247',
      change: '+127',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const trafficStatus = [
    { area: 'Bandra-Worli Sea Link', status: 'heavy', time: '45 min', delay: '+15 min' },
    { area: 'Western Express Highway', status: 'moderate', time: '28 min', delay: '+5 min' },
    { area: 'Eastern Express Highway', status: 'light', time: '18 min', delay: 'On time' },
    { area: 'Sion-Panvel Highway', status: 'heavy', time: '38 min', delay: '+12 min' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'light': return 'traffic-green';
      case 'moderate': return 'traffic-yellow';
      case 'heavy': return 'traffic-red';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'light': return <CheckCircle className="h-4 w-4" />;
      case 'moderate': return <AlertTriangle className="h-4 w-4" />;
      case 'heavy': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Real-time urban navigation insights and predictions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traffic Status */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Current Traffic Status</h2>
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {trafficStatus.map((route, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(route.status)}`}>
                  {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{route.area}</p>
                  <p className="text-sm text-gray-600">{route.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(route.status)}
                <span className="text-sm text-gray-600">{route.delay}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <Activity className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Predict Traffic</h3>
          <p className="text-sm text-gray-600">
            Get AI-powered traffic predictions for your route
          </p>
        </div>
        
        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <Clock className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Plan Departure</h3>
          <p className="text-sm text-gray-600">
            Find the optimal time to leave for your destination
          </p>
        </div>
        
        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <Car className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Find Parking</h3>
          <p className="text-sm text-gray-600">
            Locate available parking spots near your destination
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
