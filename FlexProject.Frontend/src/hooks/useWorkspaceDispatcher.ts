import { usePub } from '@/hooks/usePub';
import { WorkspaceEventMappings } from '@/types/workspaceTypes';

export const useWorkspaceDispatcher = () => {
  const publish = usePub<WorkspaceEventMappings>();

  const displayPrivateChat = (userName: string) => publish('privateChat', { userName });

  return { displayPrivateChat };
};
