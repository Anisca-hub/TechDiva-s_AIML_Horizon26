import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search,
  Navigation,
  Star,
  Shield,
  Zap
} from 'lucide-react';

const ParkingIntelligence = () => {
  const [destination, setDestination] = useState('');
  const [parkingType, setParkingType] = useState('all');
  const [maxDistance, setMaxDistance] = useState('500');

  const parkingSpots = [
    {
      name: 'Phoenix Mall Parking',
      distance: '0.2 km',
      availability: 'High',
      totalSpots: 450,
      availableSpots: 127,
      hourlyRate: '₹40',
      maxRate: '₹200',
      rating: 4.2,
      features: ['Covered', 'Security', 'EV Charging'],
      predictedAvailability: '89%',
      timeToReach: '3 min'
    },
    {
      name: 'Street Parking - Link Road',
      distance: '0.1 km',
      availability: 'Medium',
      totalSpots: 80,
      availableSpots: 23,
      hourlyRate: '₹20',
      maxRate: '₹80',
      rating: 3.8,
      features: ['Open', 'Free 2hrs'],
      predictedAvailability: '67%',
      timeToReach: '2 min'
    },
    {
      name: 'Corporate Tower Parking',
      distance: '0.5 km',
      availability: 'Low',
      totalSpots: 200,
      availableSpots: 12,
      hourlyRate: '₹60',
      maxRate: '₹300',
      rating: 4.5,
      features: ['Covered', 'Security', 'Valet'],
      predictedAvailability: '34%',
      timeToReach: '7 min'
    }
  ];

  const parkingPredictions = [
    { time: '9:00 AM', availability: 85, predicted: 82 },
    { time: '10:00 AM', availability: 92, predicted: 88 },
    { time: '11:00 AM', availability: 78, predicted: 75 },
    { time: '12:00 PM', availability: 45, predicted: 42 },
    { time: '1:00 PM', availability: 32, predicted: 28 },
    { time: '2:00 PM', availability: 38, predicted: 35 },
    { time: '3:00 PM', availability: 52, predicted: 48 },
    { time: '4:00 PM', availability: 68, predicted: 65 },
    { time: '5:00 PM', availability: 25, predicted: 22 },
    { time: '6:00 PM', availability: 18, predicted: 15 },
    { time: '7:00 PM', availability: 42, predicted: 38 },
    { time: '8:00 PM', availability: 78, predicted: 75 }
  ];

  const getAvailabilityColor = (availability) => {
    if (availability >= 70) return 'traffic-green';
    if (availability >= 40) return 'traffic-yellow';
    return 'traffic-red';
  };

  const getAvailabilityLevel = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage >= 30) return 'High';
    if (percentage >= 15) return 'Medium';
    return 'Low';
  };

  const handleSearch = () => {
    // API call would go here
    console.log('Searching parking for', { destination, parkingType, maxDistance });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Parking Intelligence</h1>
        <p className="text-gray-600 mt-2">
          AI-powered parking availability prediction and recommendations
        </p>
      </div>

      {/* Search Form */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Find Parking</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you need parking?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Car className="inline h-4 w-4 mr-1" />
              Parking Type
            </label>
            <select
              value={parkingType}
              onChange={(e) => setParkingType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Types</option>
              <option value="covered">Covered</option>
              <option value="open">Open</option>
              <option value="street">Street</option>
              <option value="valet">Valet</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Navigation className="inline h-4 w-4 mr-1" />
              Max Distance
            </label>
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="200">200m</option>
              <option value="500">500m</option>
              <option value="1000">1km</option>
              <option value="2000">2km</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full btn-primary flex items-center justify-center"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Parking
            </button>
          </div>
        </div>
      </div>

      {/* Parking Availability Forecast */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Today's Parking Forecast</h2>
          <Zap className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {parkingPredictions.map((prediction, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 w-20">{prediction.time}</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${prediction.predicted}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-12 text-right">
                {prediction.predicted}%
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-traffic-green rounded-full"></div>
            <span className="text-gray-600">High Availability</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-traffic-yellow rounded-full"></div>
            <span className="text-gray-600">Medium Availability</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-traffic-red rounded-full"></div>
            <span className="text-gray-600">Low Availability</span>
          </div>
        </div>
      </div>

      {/* Parking Recommendations */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recommended Parking Spots</h2>
          <Star className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {parkingSpots.map((spot, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{spot.name}</h3>
                  <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {spot.distance}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {spot.timeToReach}
                    </span>
                    <span className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {spot.rating}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getAvailabilityColor(spot.predictedAvailability)}`}>
                  {spot.predictedAvailability} Available
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                <div>
                  <p className="text-gray-600">Available Spots</p>
                  <p className="font-medium text-gray-900">
                    {spot.availableSpots}/{spot.totalSpots}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600">Hourly Rate</p>
                  <p className="font-medium text-gray-900">{spot.hourlyRate}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Max Rate</p>
                  <p className="font-medium text-gray-900">{spot.maxRate}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Features</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {spot.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">
                    Predicted availability: <span className="font-medium">{spot.predictedAvailability}</span>
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                    Navigate →
                  </button>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Reserve Spot
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

export default ParkingIntelligence;
