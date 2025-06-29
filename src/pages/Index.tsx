
import { useState } from 'react';
import Layout from '@/components/Layout';
import AuthForm from '@/components/auth/AuthForm';
import ProfileSetup from '@/components/profile/ProfileSetup';
import SenderDashboard from '@/components/dashboard/SenderDashboard';
import RunnerDashboard from '@/components/dashboard/RunnerDashboard';

const Index = () => {
  const [user, setUser] = useState<any>(null);

  const handleAuth = (userData: any) => {
    console.log('User authenticated:', userData);
    setUser(userData);
  };

  const handleProfileComplete = (profileData: any) => {
    console.log('Profile completed:', profileData);
    setUser(profileData);
  };

  // Show auth form if no user
  if (!user) {
    return <AuthForm onAuth={handleAuth} />;
  }

  // Show profile setup if first login
  if (user.isFirstLogin) {
    return <ProfileSetup user={user} onComplete={handleProfileComplete} />;
  }

  // Show appropriate dashboard based on user role
  return (
    <Layout user={user}>
      {user.role === 'sender' ? <SenderDashboard /> : <RunnerDashboard />}
    </Layout>
  );
};

export default Index;
