import { useSub } from '@/hooks/useSub';
import { AddPanelOptions, DockviewApi } from 'dockview';

const ADD_PANEL_EVENT = 'add-panel-event';

interface DockViewSubProps {
  api?: DockviewApi;
}

export const useDockViewSub = (props: DockViewSubProps) => {
  const { api } = props;

  useSub(ADD_PANEL_EVENT, (options: AddPanelOptions) => api?.addPanel(options));
};
