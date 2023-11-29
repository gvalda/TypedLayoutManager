import { IDockviewPanelProps } from 'dockview';
import React from 'react';
import { z } from 'zod';

export interface PrivateChatProps {
  userName: string;
}

export const privateChatPropsSchema: z.ZodType<PrivateChatProps> = z.object({
  userName: z.string(),
});

export function PrivateChat(props: IDockviewPanelProps<PrivateChatProps>) {
  const { userName } = props.params;

  return <div>Private chat with {userName}</div>;
}
