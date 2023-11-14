import { useEvent } from '@/hooks/useEvent';
import { useSub } from '@/hooks/useSub';
import { WorkspaceEventMappings } from '@/types/workspaceTypes';
import { DockviewApi } from 'dockview';
import React from 'react';

interface WorkspaceProps {
  onReady: () => void;
  onDidActivePanelChange: (id: string) => void;
}

interface WorkspaceApi {
  setApi: React.Dispatch<React.SetStateAction<DockviewApi | undefined>>;
}

export const useWorkspace = (props: WorkspaceProps): WorkspaceApi => {
  const { onReady, onDidActivePanelChange } = props;

  const onDidActivePanelChangeEvent = useEvent(onDidActivePanelChange);

  const [api, setApi] = React.useState<DockviewApi>();

  useSub<WorkspaceEventMappings>(
    'privateChat',
    props => {
      api?.panels.find(panel => panel.api.setActive());
      return api?.addPanel({
        id: `privateChat-${props.userName}`,
        component: 'privateChat',
        title: `Private chat with ${props.userName}`,
        params: props,
      });
    },
    [api],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => void (api && onReady()), [api]);

  React.useEffect(
    () => void api?.onDidActivePanelChange(panel => panel && onDidActivePanelChangeEvent(panel.id)),
    [api, onDidActivePanelChangeEvent],
  );

  return { setApi };
};
