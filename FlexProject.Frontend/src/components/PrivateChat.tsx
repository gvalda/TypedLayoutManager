import { IDockviewPanelProps } from 'dockview';
import React from 'react';

export interface PrivateChatProps {
  userName?: string;
}

export function PrivateChat(props: IDockviewPanelProps<PrivateChatProps>) {
  const { userName } = props.params;

  return <div>Private chat with {userName}</div>;
}
