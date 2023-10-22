import { LinksGroup } from '@/components/LinksGroup';
import { newChatRoute } from '@/router';
import { ScrollArea } from '@mantine/core';
import styles from '@styles/components/Navbar.module.scss';
import { IconPuzzleFilled } from '@tabler/icons-react';
import React from 'react';

export function Navbar() {
  const links = [
    {
      icon: IconPuzzleFilled,
      label: 'DockView',
      links: [{ label: 'New chat', to: newChatRoute.to }],
    },
  ].map((link, index) => <LinksGroup {...link} key={index} />);

  return (
    <div className={styles.navbar}>
      <ScrollArea className={styles.links}>
        <div className={styles.linksInner}>{links}</div>
      </ScrollArea>

      <div className={styles.footer}>Login information</div>
    </div>
  );
}
