
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Upload } from 'lucide-react';

interface ProfileSetupProps {
  user: any;
  onComplete: (profileData: any) => void;
}

const akureAreas = [
  'Alagbaka',
  'Aule',
  'Ayedun',
  'Oba-Ile',
  'Ilesa Road',
  'Ondo Road',
  'Ijapo',
  'Ijoka',
  'Ikere Road',
  'Isikan',
  'Orita Obele',
  'FUTA Area',
  'Shagari Village',
  'Igoba',
  'Isolo Road'
];

const ProfileSetup = ({ user, onComplete }: ProfileSetupProps) => {
  const [formData, setFormData] = useState({
    fullName: user.name || '',
    role: '',
    location: '',
    bio: '',
    profilePicture: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...user,
      ...formData,
      isFirstLogin: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-errand-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Let's set up your ErrandGo profile to get started</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              This information will be visible to other users in the ErrandGo community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={previewUrl || ''} alt="Profile" />
                  <AvatarFallback className="bg-errand-100 text-errand-600">
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="profilePicture" className="cursor-pointer">
                    <div className="flex items-center space-x-2 text-sm text-errand-600 hover:text-errand-700">
                      <Upload className="w-4 h-4" />
                      <span>Upload Profile Picture</span>
                    </div>
                  </Label>
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">I want to *</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sender">
                      <div className="flex flex-col">
                        <span className="font-medium">Send Errands</span>
                        <span className="text-sm text-gray-500">Post tasks for others to complete</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="runner">
                      <div className="flex flex-col">
                        <span className="font-medium">Run Errands</span>
                        <span className="text-sm text-gray-500">Complete tasks and earn money</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location in Akure */}
              <div className="space-y-2">
                <Label htmlFor="location">Location in Akure *</Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your area in Akure" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {akureAreas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={!formData.role || !formData.location}>
                Complete Setup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
