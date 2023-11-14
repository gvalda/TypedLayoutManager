import { LinksGroup, LinksGroupProps } from '@/components/LinksGroup';
import { workspaceRoute } from '@/router';
import { ScrollArea } from '@mantine/core';
import styles from '@styles/components/Navbar.module.scss';
import { IconPuzzleFilled } from '@tabler/icons-react';
import React from 'react';

export function Navbar() {
  const links: LinksGroupProps[] = [
    {
      icon: IconPuzzleFilled,
      label: 'Messages',
      links: [
        { label: 'User A', to: workspaceRoute.to, search: { privateChat: 'User A' } },
        { label: 'User B', to: workspaceRoute.to, search: { privateChat: 'User B' } },
        { label: 'User C', to: workspaceRoute.to, search: { privateChat: 'User C' } },
        { label: 'All messages', to: workspaceRoute.to, search: { chatList: true } },
      ],
    },
  ];

  return (
    <div className={styles.navbar}>
      <ScrollArea className={styles.links}>
        <div className={styles.linksInner}>
          {links.map((link, index) => (
            <LinksGroup {...link} key={index} />
          ))}
        </div>
      </ScrollArea>

      <div className={styles.footer}>Login information</div>
    </div>
  );
}
