import { ColorSchemeToggle } from '@/components/ColorSchemeToggle';
import { Burger, Group } from '@mantine/core';
import styles from '@styles/components/Header.module.scss';
import { Icon123 } from '@tabler/icons-react';
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

      <ColorSchemeToggle />
    </div>
  );
}
