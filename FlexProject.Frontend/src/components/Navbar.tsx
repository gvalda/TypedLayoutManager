import { LinksGroup, LinksGroupProps } from '@/components/LinksGroup';
import { workspaceRoute } from '@/router';
import { getRouteParam } from '@/utils/workspaceUtils';
import { ScrollArea } from '@mantine/core';
import styles from '@styles/components/Navbar.module.scss';
import { IconPuzzleFilled } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import React from 'react';

export function Navbar() {
  const links: LinksGroupProps[] = [
    {
      icon: IconPuzzleFilled,
      label: 'Messages',
      links: [
        {
          label: 'User A',
          component: (
            <Link
              to={workspaceRoute.to}
              params={{ routeParamName: getRouteParam('privateChat') }}
              search={{ userName: 'User A' }}
            />
          ),
        },
        {
          label: 'User B',
          component: (
            <Link
              to={workspaceRoute.to}
              params={{ routeParamName: getRouteParam('privateChat') }}
              search={{ userName: 'User B' }}
            />
          ),
        },
        {
          label: 'User C',
          component: (
            <Link
              to={workspaceRoute.to}
              params={{ routeParamName: getRouteParam('privateChat') }}
              search={{ userName: 'User C' }}
            />
          ),
        },
        {
          label: 'All messages',
          component: <Link to={workspaceRoute.to} params={{ routeParamName: getRouteParam('chatList') }} />,
        },
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
