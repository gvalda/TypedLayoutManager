import { ChatList } from '@/components/ChatList';
import { PrivateChat } from '@/components/PrivateChat';
import { WorkspacePanel } from '@/types/workspaceTypes';
import { typedObjectKeys } from '@/utils';
import { z } from 'zod';

export const registeredPanels: readonly WorkspacePanel[] = [
  {
    component: PrivateChat,
    queryParams: { name: 'chat', value: 'userName' },
    id: userName => `privateChat-${userName}`,
    title: userName => userName,
  },
  {
    component: ChatList,
    queryParamName: 'chats',
    id: 'chatList',
    title: 'Chats',
  },
] as const;

export type RegisteredPanels = typeof registeredPanels;

export const workspaceSchema = z
  .record(z.enum(typedObjectKeys(registeredPanels)), z.union([z.string(), z.boolean()]))
  .refine(obj => Object.keys(obj).length <= 1, { message: 'Workspace schema must have 1 key' });
