import { ChatList } from '@/components/ChatList';
import { PrivateChat, privateChatPropsSchema } from '@/components/PrivateChat';
import { RegisterWorkspacePanel, WorkspacePanel } from '@/types/workspaceTypes';

export const registeredPanels = {
  privateChat: {
    component: PrivateChat,
    routeParamName: 'chat',
    getTitle: props => props.userName,
    propSchemaParser: privateChatPropsSchema,
  } as RegisterWorkspacePanel<typeof PrivateChat>,
  chatList: {
    component: ChatList,
    routeParamName: 'chats',
    getTitle: () => 'Chats',
  } as RegisterWorkspacePanel<typeof ChatList>,
} as const satisfies Record<string, WorkspacePanel>;
