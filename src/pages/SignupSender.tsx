import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, ArrowLeft } from 'lucide-react';

const akureAreas = [
  'Alagbaka', 'Aule', 'Ayedun', 'Oba-Ile', 'Ilesa Road', 'Ondo Road',
  'Ijapo', 'Ijoka', 'Ikere Road', 'Isikan', 'Orita Obele', 'FUTA Area',
  'Shagari Village', 'Igoba', 'Isolo Road'
];

const relationshipStatuses = [
  'Single', 'Married', 'Divorced', 'Widowed', 'In a relationship'
];

const SignupSender = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    relationshipStatus: '',
    address: '',
    area: '',
    bio: '',
    agreeToTerms: false
  });
  const [files, setFiles] = useState({
    ninFront: null as File | null,
    ninBack: null as File | null,
    profilePicture: null as File | null
  });

  const handleFileChange = (field: keyof typeof files) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [field]: file }));
    }
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    console.log(`Uploading file to bucket: ${bucket}, path: ${path}`);
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Upload error:', error);
      throw error;
    }
    console.log('Upload successful:', data);
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Starting signup process...');
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the Terms & Conditions",
        variant: "destructive",
      });
      return;
    }

    if (!files.ninFront || !files.ninBack) {
      toast({
        title: "Error",
        description: "Please upload both front and back of your NIN card",
        variant: "destructive",
      });
      return;
    }

    if (!formData.relationshipStatus || !formData.area) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting to sign up user...');
      
      // Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            role: 'sender'
          },
          emailRedirectTo: `${window.location.origin}/dashboard-sender`
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      console.log('User signed up successfully:', authData.user?.id);

      if (authData.user) {
        const userId = authData.user.id;
        
        // Upload files
        console.log('Uploading NIN front...');
        const ninFrontPath = await uploadFile(files.ninFront, 'documents', `nin/${userId}/front.${files.ninFront.name.split('.').pop()}`);
        
        console.log('Uploading NIN back...');
        const ninBackPath = await uploadFile(files.ninBack, 'documents', `nin/${userId}/back.${files.ninBack.name.split('.').pop()}`);
        
        let profilePicturePath = null;
        if (files.profilePicture) {
          console.log('Uploading profile picture...');
          profilePicturePath = await uploadFile(files.profilePicture, 'avatars', `${userId}/profile.${files.profilePicture.name.split('.').pop()}`);
        }

        console.log('Saving profile data...');
        // Save profile data
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: formData.email,
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            role: 'sender',
            nin_front_url: ninFrontPath,
            nin_back_url: ninBackPath,
            profile_picture_url: profilePicturePath,
            relationship_status: formData.relationshipStatus,
            address: `${formData.address}, ${formData.area}, Akure, Ondo State`,
            bio: formData.bio
          });

        if (profileError) {
          console.error('Profile error:', profileError);
          throw profileError;
        }

        console.log('Profile created successfully!');

        toast({
          title: "Success!",
          description: "Account created successfully. Please check your email for verification.",
        });

        // Wait a moment then redirect
        setTimeout(() => {
          navigate('/dashboard-sender');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      
      let errorMessage = "Failed to create account";
      
      if (error?.message?.includes('User already registered')) {
        errorMessage = "An account with this email already exists";
      } else if (error?.message?.includes('Invalid email')) {
        errorMessage = "Please enter a valid email address";
      } else if (error?.message?.includes('Password')) {
        errorMessage = "Password must be at least 6 characters long";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-errand-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/" className="flex items-center text-errand-600 hover:text-errand-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">You are signing up as an Errand Sender</h1>
          <p className="text-gray-600">Complete your registration to start posting errands</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Sender Registration</CardTitle>
            <CardDescription>
              Fill out all required information to create your sender account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+234 xxx xxx xxxx"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              {/* NIN Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ninFront">NIN Card (Front) *</Label>
                  <div className="relative">
                    <Input
                      id="ninFront"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange('ninFront')}
                      required
                    />
                    <Upload className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {files.ninFront && <p className="text-sm text-green-600">✓ {files.ninFront.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ninBack">NIN Card (Back) *</Label>
                  <div className="relative">
                    <Input
                      id="ninBack"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange('ninBack')}
                      required
                    />
                    <Upload className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {files.ninBack && <p className="text-sm text-green-600">✓ {files.ninBack.name}</p>}
                </div>
              </div>

              {/* Profile Picture */}
              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <div className="relative">
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange('profilePicture')}
                  />
                  <Upload className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {files.profilePicture && <p className="text-sm text-green-600">✓ {files.profilePicture.name}</p>}
              </div>

              {/* Relationship Status */}
              <div className="space-y-2">
                <Label htmlFor="relationshipStatus">Relationship Status *</Label>
                <Select value={formData.relationshipStatus} onValueChange={(value) => setFormData({ ...formData, relationshipStatus: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your relationship status" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationshipStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Residential Address *</Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, house number"
                  required
                />
              </div>

              {/* Area in Akure */}
              <div className="space-y-2">
                <Label htmlFor="area">Area in Akure *</Label>
                <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
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
                <Label htmlFor="bio">Why do you want to use ErrandGo? *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us why you need help with errands..."
                  rows={3}
                  required
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <Link to="/terms" className="text-errand-600 hover:underline">Terms & Conditions</Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Sender Account'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login-sender" className="text-errand-600 hover:underline">
                    Login as Sender
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupSender;
