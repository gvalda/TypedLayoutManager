import { RegisteredPanels, WorkspacePanelProps } from '@/utils/workspaceUtils';
import { DockviewApi, IDockviewPanel } from 'dockview';
import React from 'react';

export interface WorkspaceProps {
  onReady: () => void;
  onDidActivePanelChange: (panelName: keyof RegisteredPanels, panel: IDockviewPanel) => void;
}

interface WorkspaceApi {
  setApi: React.Dispatch<React.SetStateAction<DockviewApi | undefined>>;
  displayPanel: <TPanelName extends keyof RegisteredPanels>({}: {
    [K in keyof RegisteredPanels]: {
      panelName: K;
      panelProps: WorkspacePanelProps<K>;
    } & { title: string };
  }[TPanelName]) => void;
}

const getComponentId = (panelName: string, panelProps?: object) => `${panelName}-${JSON.stringify(panelProps)}`;
const getPanelName = (id: string): keyof RegisteredPanels => id.split('-')[0] as keyof RegisteredPanels;

export const useWorkspace = (props: WorkspaceProps): WorkspaceApi => {
  const { onReady, onDidActivePanelChange } = props;

  const [api, setApi] = React.useState<DockviewApi>();

  React.useEffect(() => void (api && onReady()), [api]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(
    () => void api?.onDidActivePanelChange(panel => panel && onDidActivePanelChange(getPanelName(panel.id), panel)),
    [api], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const displayPanel: WorkspaceApi['displayPanel'] = ({ panelName, panelProps, title }) => {
    if (!api) return;

    const id = getComponentId(panelName, panelProps);

    const activePanel = api.panels.find(panel => panel.id === id);

    activePanel ? activePanel.api.setActive() : api.addPanel({ id, component: panelName, params: panelProps, title });
  };

  return { setApi, displayPanel };
};
