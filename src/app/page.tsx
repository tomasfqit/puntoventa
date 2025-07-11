"use client";
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/helpers';

export default function HomePage() {
  if (isAuthenticated()) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
