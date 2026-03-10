import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  Car,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const DeparturePlanning = () => {
  const [destination, setDestination] = useState('');
  const [arrivalTime, setArrivalTime] = useState('09:00');
  const [preferredDeparture, setPreferredDeparture] = useState('earliest');
  const [transportMode, setTransportMode] = useState('car');

  const departureRecommendations = [
    {
      departureTime: '07:45',
      arrivalTime: '08:52',
      travelTime: '67 min',
      trafficLevel: 'Light',
      confidence: '96%',
      fuelCost: '₹85',
      recommendation: 'Best Option'
    },
    {
      departureTime: '08:15',
      arrivalTime: '09:08',
      travelTime: '53 min',
      trafficLevel: 'Moderate',
      confidence: '91%',
      fuelCost: '₹72',
      recommendation: 'Balanced'
    },
    {
      departureTime: '08:45',
      arrivalTime: '09:45',
      travelTime: '60 min',
      trafficLevel: 'Heavy',
      confidence: '87%',
      fuelCost: '₹78',
      recommendation: 'Risky'
    }
  ];

  const weeklyPattern = [
    { day: 'Mon', optimal: '07:30', traffic: 'Moderate' },
    { day: 'Tue', optimal: '07:45', traffic: 'Moderate' },
    { day: 'Wed', optimal: '07:15', traffic: 'Light' },
    { day: 'Thu', optimal: '07:30', traffic: 'Light' },
    { day: 'Fri', optimal: '07:00', traffic: 'Heavy' },
    { day: 'Sat', optimal: '09:00', traffic: 'Light' },
    { day: 'Sun', optimal: '10:00', traffic: 'Light' }
  ];

  const getTrafficColor = (traffic) => {
    switch (traffic) {
      case 'Light': return 'traffic-green';
      case 'Moderate': return 'traffic-yellow';
      case 'Heavy': return 'traffic-red';
      default: return 'bg-gray-500';
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'Best Option': return 'text-green-600 bg-green-50';
      case 'Balanced': return 'text-blue-600 bg-blue-50';
      case 'Risky': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handlePlanDeparture = () => {
    // API call would go here
    console.log('Planning departure for', { destination, arrivalTime, preferredDeparture, transportMode });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Smart Departure Planning</h1>
        <p className="text-gray-600 mt-2">
          AI-powered optimal departure time recommendations
        </p>
      </div>

      {/* Planning Form */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Plan Your Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where are you going?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Arrival Time
            </label>
            <input
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Car className="inline h-4 w-4 mr-1" />
              Transport Mode
            </label>
            <select
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="car">Car</option>
              <option value="bike">Motorcycle</option>
              <option value="bus">Bus</option>
              <option value="metro">Metro</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Preference
            </label>
            <select
              value={preferredDeparture}
              onChange={(e) => setPreferredDeparture(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="earliest">Earliest Departure</option>
              <option value="latest">Latest Departure</option>
              <option value="balanced">Balanced</option>
              <option value="least-traffic">Least Traffic</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={handlePlanDeparture}
          className="btn-primary"
        >
          Get Recommendations
        </button>
      </div>

      {/* Departure Recommendations */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recommended Departure Times</h2>
          <Info className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {departureRecommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(rec.recommendation)}`}>
                    {rec.recommendation}
                  </div>
                  <h3 className="font-medium text-gray-900">
                    Depart at {rec.departureTime}
                  </h3>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTrafficColor(rec.trafficLevel)}`}>
                  {rec.trafficLevel} Traffic
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Departure</p>
                  <p className="font-medium text-gray-900">{rec.departureTime}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Arrival</p>
                  <p className="font-medium text-gray-900">{rec.arrivalTime}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Travel Time</p>
                  <p className="font-medium text-gray-900">{rec.travelTime}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Est. Cost</p>
                  <p className="font-medium text-gray-900">{rec.fuelCost}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Confidence</p>
                  <p className="font-medium text-gray-900">{rec.confidence}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Set Reminder →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Pattern Analysis */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Traffic Pattern</h2>
          <Users className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weeklyPattern.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-xs font-medium text-gray-600 mb-2">{day.day}</p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">{day.optimal}</p>
                <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium text-white ${getTrafficColor(day.traffic)}`}>
                  {day.traffic}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Insight:</p>
              <p>Wednesday and Thursday show the lightest traffic patterns. Consider scheduling important meetings on these days for optimal travel times.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeparturePlanning;
