import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import styles from '@styles/components/ColorSchemeToggle.module.scss';
import cx from 'clsx';
import React from 'react';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  return (
    <ActionIcon onClick={() => setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')} variant='default'>
      <IconSun className={cx(styles.icon, styles.light)} />
      <IconMoon className={cx(styles.icon, styles.dark)} />
    </ActionIcon>
  );
}
