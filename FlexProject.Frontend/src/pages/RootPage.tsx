import { DEFAULT_SITE_TITLE } from '@/constants';
import { useDocumentTitle } from '@mantine/hooks';
import { Outlet, useRouter } from '@tanstack/react-router';
import React from 'react';

export function RootPage() {
  const router = useRouter();
  const matchWithTitle = [...router.state.matches].reverse().find(match => match.context.title);

  useDocumentTitle(matchWithTitle?.context.title || DEFAULT_SITE_TITLE);

  return <Outlet />;
}
