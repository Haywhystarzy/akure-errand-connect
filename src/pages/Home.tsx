
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Zap, Shield, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-errand-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-primary mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path d="M12 7l-3 3h2v4h2v-4h2l-3-3z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to ErrandGo</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with people in Akure for running errands. Get help or earn money by helping others in your community.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-errand-600 mb-12">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Serving Akure, Ondo State exclusively</span>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="border-2 border-transparent hover:border-errand-200 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 rounded-2xl bg-errand-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-errand-600" />
              </div>
              <CardTitle className="text-2xl">I Need Help</CardTitle>
              <CardDescription className="text-base">
                Post errands and get help from trusted runners in Akure
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Post delivery tasks</li>
                <li>• Get grocery shopping done</li>
                <li>• Find help with various errands</li>
                <li>• Choose from verified runners</li>
              </ul>
              <div className="space-y-3 pt-4">
                <Button asChild className="w-full" size="lg">
                  <Link to="/signup-sender">Sign Up as Sender</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login-sender">Login as Sender</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-transparent hover:border-errand-200 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">I Want to Earn</CardTitle>
              <CardDescription className="text-base">
                Run errands for others and earn money in Akure
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Browse available errands</li>
                <li>• Choose tasks that fit your schedule</li>
                <li>• Earn money helping others</li>
                <li>• Build your reputation</li>
              </ul>
              <div className="space-y-3 pt-4">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Link to="/signup-runner">Sign Up as Runner</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login-runner">Login as Runner</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose ErrandGo?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Users</h3>
              <p className="text-gray-600">All users go through KYC verification with NIN for safety</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Local Focus</h3>
              <p className="text-gray-600">Exclusively serving Akure community members</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
              <p className="text-gray-600">Built by and for the people of Akure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
