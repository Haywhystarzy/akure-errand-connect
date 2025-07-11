
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const LoginSender = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting sender login...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      if (data.user) {
        console.log('User logged in, checking role...');
        
        // Check if user is a sender
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
          throw profileError;
        }

        if (profile.role !== 'sender') {
          toast({
            title: "Access Denied",
            description: "This login is for senders only. Please use the runner login.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          return;
        }

        console.log('Sender login successful!');
        
        toast({
          title: "Welcome back!",
          description: "Successfully logged in as sender.",
        });

        navigate('/dashboard-sender');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = "Failed to login";
      
      if (error?.message?.includes('Invalid login credentials')) {
        errorMessage = "Invalid email or password";
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
    <div className="min-h-screen bg-gradient-to-br from-errand-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sender Login</h1>
          <p className="text-gray-600">Sign in to your sender account</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Welcome Back, Sender!</CardTitle>
            <CardDescription>
              Enter your credentials to access your sender dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In as Sender'}
              </Button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have a sender account?{' '}
                <Link to="/signup-sender" className="text-errand-600 hover:underline">
                  Sign up here
                </Link>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Are you a runner?{' '}
                <Link to="/login-runner" className="text-errand-600 hover:underline">
                  Login as Runner
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginSender;
