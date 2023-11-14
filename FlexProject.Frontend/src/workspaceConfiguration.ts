import { ChatList } from '@/components/ChatList';
import { PrivateChat } from '@/components/PrivateChat';
import { typedObjectKeys } from '@/utils';
import { z } from 'zod';

export const registeredComponents = {
  privateChat: PrivateChat,
  chatList: ChatList,
} as const;

export type RegisteredComponents = typeof registeredComponents;

export const workspaceSchema = z
  .record(z.enum(typedObjectKeys(registeredComponents)), z.union([z.string(), z.boolean()]))
  .refine(obj => Object.keys(obj).length <= 1, { message: 'Workspace schema must have 1 key' });
