'use client';

import React from 'react';
import { useAuth } from '@clerk/nextjs'; // Corrected the import to use @clerk/nextjs
import {
  Brain,
  Sparkles,
  BookOpen,
  FlaskConical,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  // Using useAuth() hook
  const { isSignedIn, isLoaded, user, signOut } = useAuth(); // Added signOut for logging out

  // Define features for the section
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: 'AI-Powered Learning',
      description:
        'Transform any topic into comprehensive study materials using advanced AI technology',
    },
    {
      icon: <FlaskConical className="w-6 h-6 text-purple-500" />,
      title: 'Multiple Study Formats',
      description:
        'Generate flashcards, quizzes, and detailed notes tailored to your learning style',
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      title: 'Instant Generation',
      description: 'Create complete study materials in minutes, not hours',
    },
  ];

  // Show a loading indicator until auth data is loaded
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <div className="bg-white dark:bg-gray-900 shadow-md py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" passHref>
            <span className="text-xl font-bold text-purple-600">LearnMate</span>
          </Link>
          <div className="space-x-4">
            {!isSignedIn ? (
              <>
                <Link href="/sign-in" passHref>
                  <Button
                    variant="link"
                    className="text-purple-600 dark:text-purple-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up" passHref>
                  <Button
                    variant="link"
                    className="text-purple-600 dark:text-purple-300"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  className="text-purple-600 dark:text-purple-300"
                  onClick={signOut}
                >
                  Logout
                </Button>
                <Link href="/dashboard" passHref>
                  <Button
                    variant="link"
                    className="text-purple-600 dark:text-purple-300"
                  >
                    View Dashboard
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 z-0" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-1.5 rounded-full text-purple-600 dark:text-purple-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                AI-Powered Study Material Generator
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform Your Learning with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {' '}
                AI Magic
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Create comprehensive study materials instantly. From flashcards to
              quizzes, let AI do the heavy lifting while you focus on learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isSignedIn && (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Link href="/sign-in" passHref>
                    <div className="flex items-center">
                      Get Started Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </Link>
                </Button>
              )}
              <Button size="lg" variant="outline">
                <Link href="#features" passHref>
                  <div className="flex items-center">
                    Learn More
                    <BookOpen className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-lg bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="p-6">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mt-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
          </div>
          <div className="space-y-4">
            {[
              'Save hours of manual content creation time',
              'Generate materials tailored to your learning style',
              'Access comprehensive study materials instantly',
              'Track your progress with interactive quizzes',
              'Create flashcards for effective memorization',
              'Study smarter, not harder with AI assistance',
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
