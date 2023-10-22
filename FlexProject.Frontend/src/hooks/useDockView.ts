import { AddPanelOptions } from 'dockview';
import { usePub } from '@/hooks/usePub';

const ADD_PANEL_EVENT = 'add-panel-event';

interface DockViewApi {
  addPanel: () => void;
}

export const useDockView = (): DockViewApi => {
  const publish = usePub();

  const options: AddPanelOptions = {
    id: `id_${Date.now().toString()}`,
    component: 'chat',
    title: 'New chat',
  };

  const addPanel = () => {
    console.log('publish', publish);
    return publish(ADD_PANEL_EVENT, options);
  };

  return { addPanel };
};
