
import { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockErrands = [
  {
    id: 1,
    title: 'Buy Recharge Card',
    description: 'Need MTN recharge card worth ₦1000 from any nearby shop',
    area: 'Alagbaka',
    reward: '₦200',
    timePosted: '2 hours ago',
    category: 'Shopping',
    sender: {
      name: 'Adebayo Johnson',
      rating: 4.8,
      avatar: null
    },
    applicants: 3
  },
  {
    id: 2,
    title: 'Deliver Documents',
    description: 'Deliver important documents to office in Ondo Road. Must be done today.',
    area: 'Ondo Road',
    reward: '₦500',
    timePosted: '4 hours ago',
    category: 'Delivery',
    sender: {
      name: 'Funmi Adeyemi',
      rating: 4.9,
      avatar: null
    },
    applicants: 1
  },
  {
    id: 3,
    title: 'Grocery Shopping',
    description: 'Buy groceries from Shoprite - I have a specific list',
    area: 'Aule',
    reward: '₦800',
    timePosted: '6 hours ago',
    category: 'Shopping',
    sender: {
      name: 'Kemi Ogundimu',
      rating: 4.7,
      avatar: null
    },
    applicants: 5
  },
  {
    id: 4,
    title: 'House Cleaning Help',
    description: 'Need help with cleaning my apartment. Should take about 3 hours.',
    area: 'FUTA Area',
    reward: '₦1500',
    timePosted: '8 hours ago',
    category: 'Cleaning',
    sender: {
      name: 'Tunde Akinola',
      rating: 4.6,
      avatar: null
    },
    applicants: 2
  }
];

const myApplications = [
  {
    id: 2,
    title: 'Deliver Documents',
    status: 'pending',
    appliedAt: '3 hours ago'
  },
  {
    id: 5,
    title: 'Pick up Prescription',
    status: 'accepted',
    appliedAt: '1 day ago'
  },
  {
    id: 6,
    title: 'Car Wash',
    status: 'completed',
    appliedAt: '3 days ago',
    earning: '₦600'
  }
];

const RunnerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('available');

  const filteredErrands = mockErrands.filter(errand => {
    const matchesSearch = errand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         errand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || errand.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Errands</h1>
          <p className="text-gray-600">Find and apply for errands in Akure</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">{mockErrands.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Applied</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-errand-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-errand-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-2xl font-bold text-gray-900">₦12,400</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Errands</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="available">Available Errands</TabsTrigger>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="mt-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search errands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Available Errands */}
              <div className="space-y-4">
                {filteredErrands.map(errand => (
                  <Card key={errand.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col space-y-4">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900">{errand.title}</h3>
                            <Badge variant="secondary">{errand.category}</Badge>
                          </div>
                          <div className="text-lg font-bold text-errand-600">{errand.reward}</div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600">{errand.description}</p>

                        {/* Sender Info */}
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={errand.sender.avatar || ''} alt={errand.sender.name} />
                            <AvatarFallback className="bg-errand-100 text-errand-600 text-sm">
                              {errand.sender.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{errand.sender.name}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-500">{errand.sender.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {errand.area}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {errand.timePosted}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {errand.applicants} applicants
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-3 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Details
                          </Button>
                          <Button size="sm" className="flex-1">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredErrands.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No errands found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="applications" className="mt-6">
              <div className="space-y-4">
                {myApplications.map(application => (
                  <Card key={application.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{application.title}</h3>
                            <Badge className={getApplicationStatusColor(application.status)}>
                              {application.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            Applied {application.appliedAt}
                            {application.earning && (
                              <>
                                <span className="mx-2">•</span>
                                <DollarSign className="w-4 h-4 mr-1" />
                                Earned {application.earning}
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          {application.status === 'accepted' && (
                            <Button size="sm">Start Task</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {myApplications.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Clock className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600">Start applying for errands to see them here</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunnerDashboard;
