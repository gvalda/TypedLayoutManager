import { ColorSchemeToggle } from '@/components/ColorSchemeToggle';
import { workspaceRoute } from '@/router';
import { Burger, Group } from '@mantine/core';
import styles from '@styles/components/Header.module.scss';
import { Icon123 } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import React from 'react';

interface HeaderProps {
  navbarOpened: boolean;
  onNavbarToggle: () => void;
}

export function Header(props: HeaderProps) {
  const { navbarOpened, onNavbarToggle } = props;

  return (
    <div className={styles.header}>
      <Group>
        <Burger opened={navbarOpened} onClick={onNavbarToggle} size='sm' hiddenFrom='sm' />
        <Icon123 size={28} />
      </Group>
      <Group>
        <Link className={styles.link} activeProps={{ className: styles.active }} to={workspaceRoute.to}>
          Workspace
        </Link>
        <ColorSchemeToggle />
      </Group>
    </div>
  );
}
