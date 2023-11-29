import { Box, Collapse, Group, ThemeIcon, rem } from '@mantine/core';
import styles from '@styles/components/LinksGroup.module.scss';
import { IconChevronRight, TablerIconsProps } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import React from 'react';

export interface LinksGroupProps {
  icon: React.FC<TablerIconsProps>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; component: React.ReactElement }[];
}

export function LinksGroup(props: LinksGroupProps) {
  const { icon: Icon, label, initiallyOpened, links = [] } = props;
  const hasLinks = links.length > 0;

  const [opened, setOpened] = React.useState(initiallyOpened || false);

  const innerLinks = links.map(({ label, component }, index) =>
    React.cloneElement(component, { key: index, className: styles.link }, label),
  );

  return (
    <>
      <Link
        className={styles.control}
        activeProps={{ className: styles.active }}
        onClick={() => setOpened(o => !o)}
        search
      >
        <Group justify='space-between' gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant='light' size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml='md'>{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={styles.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </Link>
      {hasLinks && <Collapse in={opened}>{innerLinks}</Collapse>}
    </>
  );
}
