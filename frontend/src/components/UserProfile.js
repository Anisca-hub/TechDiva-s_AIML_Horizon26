import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Clock, 
  MapPin, 
  Car, 
  Bell,
  Shield,
  History,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('preferences');

  const userProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    memberSince: 'January 2024',
    totalTrips: 147,
    timeSaved: '12h 34m',
    fuelSaved: '₹2,847',
    co2Saved: '89 kg'
  };

  const preferences = {
    transportMode: 'car',
    departurePreference: 'balanced',
    maxWalkingDistance: '500',
    parkingType: 'covered',
    notifications: {
      trafficAlerts: true,
      departureReminders: true,
      parkingUpdates: false,
      weeklyReports: true
    }
  };

  const recentTrips = [
    {
      date: '2024-03-09',
      origin: 'Bandra West',
      destination: 'Andheri East',
      time: '8:45 AM',
      duration: '42 min',
      savedTime: '8 min',
      trafficPrediction: '95% accurate'
    },
    {
      date: '2024-03-08',
      origin: 'Powai',
      destination: 'Churchgate',
      time: '9:15 AM',
      duration: '58 min',
      savedTime: '12 min',
      trafficPrediction: '88% accurate'
    },
    {
      date: '2024-03-07',
      origin: 'Goregaon',
      destination: 'BKC',
      time: '7:30 AM',
      duration: '35 min',
      savedTime: '15 min',
      trafficPrediction: '92% accurate'
    }
  ];

  const achievements = [
    {
      name: 'Early Bird',
      description: 'Used departure planning 50 times',
      icon: Clock,
      progress: 50,
      target: 50,
      unlocked: true
    },
    {
      name: 'Traffic Master',
      description: 'Accurate predictions for 100 trips',
      icon: TrendingUp,
      progress: 87,
      target: 100,
      unlocked: false
    },
    {
      name: 'Parking Pro',
      description: 'Found optimal parking 25 times',
      icon: Car,
      progress: 23,
      target: 25,
      unlocked: false
    },
    {
      name: 'Eco Warrior',
      description: 'Saved 100kg CO2 emissions',
      icon: Award,
      progress: 89,
      target: 100,
      unlocked: false
    }
  ];

  const handleSavePreferences = () => {
    // API call would go here
    console.log('Saving preferences...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your preferences and track your journey insights
        </p>
      </div>

      {/* Profile Overview */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{userProfile.name}</h2>
            <p className="text-gray-600">{userProfile.email}</p>
            <p className="text-sm text-gray-500">Member since {userProfile.memberSince}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <History className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userProfile.totalTrips}</p>
            <p className="text-sm text-gray-600">Total Trips</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userProfile.timeSaved}</p>
            <p className="text-sm text-gray-600">Time Saved</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Car className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userProfile.fuelSaved}</p>
            <p className="text-sm text-gray-600">Fuel Saved</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Target className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userProfile.co2Saved}</p>
            <p className="text-sm text-gray-600">CO2 Saved</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('preferences')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'preferences'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings className="inline h-4 w-4 mr-2" />
            Preferences
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <History className="inline h-4 w-4 mr-2" />
            Trip History
          </button>
          
          <button
            onClick={() => setActiveTab('achievements')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'achievements'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Award className="inline h-4 w-4 mr-2" />
            Achievements
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'preferences' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Travel Preferences</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Car className="inline h-4 w-4 mr-1" />
                  Preferred Transport Mode
                </label>
                <select
                  value={preferences.transportMode}
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
                  Departure Preference
                </label>
                <select
                  value={preferences.departurePreference}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="earliest">Earliest Departure</option>
                  <option value="latest">Latest Departure</option>
                  <option value="balanced">Balanced</option>
                  <option value="least-traffic">Least Traffic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Max Walking Distance
                </label>
                <select
                  value={preferences.maxWalkingDistance}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="200">200m</option>
                  <option value="500">500m</option>
                  <option value="1000">1km</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Car className="inline h-4 w-4 mr-1" />
                  Parking Preference
                </label>
                <select
                  value={preferences.parkingType}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="covered">Covered</option>
                  <option value="open">Open</option>
                  <option value="street">Street</option>
                  <option value="valet">Valet</option>
                </select>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">
                <Bell className="inline h-4 w-4 mr-1" />
                Notifications
              </h4>
              <div className="space-y-3">
                {Object.entries(preferences.notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={value}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleSavePreferences}
              className="btn-primary"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Trips</h3>
          
          <div className="space-y-4">
            {recentTrips.map((trip, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">
                      {trip.origin} → {trip.destination}
                    </p>
                    <p className="text-sm text-gray-600">{trip.date} at {trip.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{trip.duration}</p>
                    <p className="text-sm text-green-600">Saved {trip.savedTime}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <Shield className="inline h-3 w-3 mr-1" />
                  {trip.trafficPrediction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Achievements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const progressPercentage = (achievement.progress / achievement.target) * 100;
              
              return (
                <div key={index} className={`border rounded-lg p-4 ${achievement.unlocked ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                      <Icon className={`h-6 w-6 ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Award className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">
                        {achievement.progress}/{achievement.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${achievement.unlocked ? 'bg-yellow-500' : 'bg-blue-500'}`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
