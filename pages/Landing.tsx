import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LandingLayout } from '../components/landing/LandingLayout';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingFeatures } from '../components/landing/LandingFeatures';
import { LandingServices } from '../components/landing/LandingServices';
import { LandingTestimonials } from '../components/landing/LandingTestimonials';

export const Landing: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (user) {
      const from = location.state?.from?.pathname || "/dashboard";
      return <Navigate to={from} replace />;
  }

  return (
    <LandingLayout>
      <LandingHero />
      <LandingFeatures />
      <LandingServices />
      <LandingTestimonials />
    </LandingLayout>
  );
};