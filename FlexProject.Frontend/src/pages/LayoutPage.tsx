import { Layout } from '@/components/Layout';
import { Outlet } from '@tanstack/react-router';
import React from 'react';

export function LayoutPage() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
