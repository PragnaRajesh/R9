import { useState } from 'react';
import type { UserRole, User } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface LoginFormProps {
  role: UserRole;
  onLogin: (user: User) => void;
  onBack: () => void;
}

const roleDisplayNames = {
  recruiter: 'Recruiter',
  teamlead: 'Team Lead',
  manager: 'Manager',
  admin: 'Admin'
};

export function LoginForm({ role, onLogin, onBack }: LoginFormProps) {
  const [email, setEmail] = useState('olivia@headsuphrsolutions.in');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@headsuphrsolutions\.in$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Client-side validation
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please use your @headsuphrsolutions.in email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const userData: User = {
        email,
        role,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
      };

      onLogin(userData);
    } catch (error) {
      setErrors({ general: 'Login failed. Please check your credentials and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-navy-dark hover:text-blue-bright"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Role Selection
        </Button>

        <Card className="p-8 shadow-soft">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-bright rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-navy-dark mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-medium">
              Sign in as {roleDisplayNames[role]}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {errors.general}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-navy-dark">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-medium" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@headsuphrsolutions.in"
                  className={`pl-10 ${errors.email ? 'border-red-300 focus:border-red-500' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-navy-dark">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-medium" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`pl-10 pr-10 ${errors.password ? 'border-red-300 focus:border-red-500' : ''}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto text-gray-medium hover:text-navy-dark"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-bright hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-medium">
              Forgot your password?{' '}
              <a href="#" className="text-blue-bright hover:underline">
                Reset it here
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
