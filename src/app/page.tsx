"use client";
import { getToken } from '@/api/config';
import { Loading } from '@/components/Loading';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {

  useEffect(() => {
    const token = getToken();
    if (!token) {
      redirect('/login');
    }
  }, []);
}
