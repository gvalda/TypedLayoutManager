// Make sure dockview css gets imported before styles module that overrides it
import 'dockview/dist/styles/dockview.css';
import styles from '@styles/pages/DockViewPage.module.scss';
import { Chat } from '@/components/Chat';
import cx from 'clsx';
import { AddPanelOptions, DockviewApi, DockviewReact, DockviewReadyEvent } from 'dockview';
import React from 'react';
import { useSub } from '@/hooks/useSub';
import { DockViewEventMappings } from '@/types/dockViewTypes';
import { usePub } from '@/hooks/usePub';

const components = {
  chat: () => <Chat />,
};

export function DockViewPage() {
  console.log('DockViewPage');
  // const [api, setApi] = React.useState<DockviewApi>();
  // const publish = usePub();

  const onReady = (event: DockviewReadyEvent) => {
    console.log('onReady', event);

    // return setApi(event.api);
  };

  // console.log('api', api);

  // React.useEffect(() => {
  //   const options: AddPanelOptions = {
  //     id: `id_${Date.now().toString()}`,
  //     component: 'chat',
  //     title: 'New chat',
  //   };

  //   const id = setTimeout(() => {
  //     console.log('addPanel');
  //     publish<DockViewEventMappings>('add-panel', options);
  //   }, 2000);

  //   return () => clearTimeout(id);
  // }, []);

  // useSub<DockViewEventMappings>('add-panel', options => {
  //   console.log('receive add panel', options);
  //   // console.log('api', api);
  //   // return api?.addPanel(options);
  // });

  return (
    <DockviewReact
      components={components}
      onReady={onReady}
      disableFloatingGroups
      className={cx('dockview-theme-vs', styles.wrapper)}
    />
  );
}
