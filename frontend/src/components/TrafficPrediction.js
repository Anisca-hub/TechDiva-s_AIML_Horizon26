import React, { useState } from 'react';
import { 
  Activity, 
  MapPin, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrafficPrediction = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedTime, setSelectedTime] = useState('now');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predictionData = [
    { time: '8:00', traffic: 65, predicted: 62 },
    { time: '9:00', traffic: 89, predicted: 85 },
    { time: '10:00', traffic: 72, predicted: 70 },
    { time: '11:00', traffic: 58, predicted: 55 },
    { time: '12:00', traffic: 45, predicted: 42 },
    { time: '1:00', traffic: 52, predicted: 48 },
    { time: '2:00', traffic: 68, predicted: 65 },
    { time: '3:00', traffic: 75, predicted: 72 },
    { time: '4:00', traffic: 82, predicted: 78 },
    { time: '5:00', traffic: 95, predicted: 92 },
    { time: '6:00', traffic: 88, predicted: 85 },
  ];

  const routeOptions = [
    {
      name: 'Route 1: Via Western Express Highway',
      distance: '18.5 km',
      currentTraffic: 'Heavy',
      predictedTraffic: 'Moderate',
      eta: '45 min',
      predictedEta: '38 min',
      confidence: '94%'
    },
    {
      name: 'Route 2: Via Link Road',
      distance: '22.3 km',
      currentTraffic: 'Moderate',
      predictedTraffic: 'Light',
      eta: '52 min',
      predictedEta: '42 min',
      confidence: '87%'
    },
    {
      name: 'Route 3: Via SV Road',
      distance: '19.8 km',
      currentTraffic: 'Light',
      predictedTraffic: 'Light',
      eta: '48 min',
      predictedEta: '45 min',
      confidence: '91%'
    }
  ];

  const getTrafficColor = (traffic) => {
    switch (traffic) {
      case 'Light': return 'traffic-green';
      case 'Moderate': return 'traffic-yellow';
      case 'Heavy': return 'traffic-red';
      default: return 'bg-gray-500';
    }
  };

  const handlePredict = async () => {
    if (!origin || !destination) {
      setError('Please enter both origin and destination');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:8000/api/ml/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_type: 'traffic',
          origin: origin,
          destination: destination,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to get traffic prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Traffic Prediction</h1>
        <p className="text-gray-600 mt-2">
          AI-powered traffic forecasting using LSTM models
        </p>
      </div>

      {/* Prediction Form */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Plan Your Route</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Origin
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter starting location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Travel Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="now">Now</option>
              <option value="30min">In 30 minutes</option>
              <option value="1hour">In 1 hour</option>
              <option value="2hours">In 2 hours</option>
              <option value="custom">Custom time</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Predicting...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Predict Traffic
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Prediction Results */}
        {prediction && (
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-green-800">Traffic Prediction Results</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-gray-600">Traffic Level</div>
                <div className="text-2xl font-bold text-blue-600">{prediction.traffic_level}/10</div>
                <div className="text-xs text-gray-500">Scale: 1-10 (1=Very Light, 10=Very Heavy)</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-gray-600">Estimated Time</div>
                <div className="text-2xl font-bold text-green-600">{prediction.estimated_travel_time} min</div>
                <div className="text-xs text-gray-500">{prediction.congestion} traffic</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-gray-600">Weather</div>
                <div className="text-lg font-bold text-purple-600">{prediction.weather_impact}</div>
                <div className="text-xs text-gray-500">{prediction.explanation}</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <strong>Route:</strong> {origin} → {destination}
            </div>
          </div>
        )}
      </div>

      {/* Traffic Forecast Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">24-Hour Traffic Forecast</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Predicted</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="traffic" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Current Traffic"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#10b981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted Traffic"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Route Recommendations */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Route Recommendations</h2>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {routeOptions.map((route, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{route.name}</h3>
                <span className="text-sm text-gray-600">{route.distance}</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Current Traffic</p>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white mt-1 ${getTrafficColor(route.currentTraffic)}`}>
                    {route.currentTraffic}
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-600">Predicted Traffic</p>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white mt-1 ${getTrafficColor(route.predictedTraffic)}`}>
                    {route.predictedTraffic}
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-600">Current ETA</p>
                  <p className="font-medium text-gray-900">{route.eta}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Predicted ETA</p>
                  <p className="font-medium text-green-600">{route.predictedEta}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">
                      Confidence: <span className="font-medium">{route.confidence}</span>
                    </span>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Select Route →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficPrediction;
