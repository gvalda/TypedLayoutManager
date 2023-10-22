import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from '@styles/components/Layout.module.scss';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <AppShell header={{ height: 50 }} navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened } }}>
      <AppShell.Header>
        <Header navbarOpened={mobileOpened} onNavbarToggle={toggleMobile} />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main className={styles.main}>{props.children}</AppShell.Main>
    </AppShell>
  );
}
