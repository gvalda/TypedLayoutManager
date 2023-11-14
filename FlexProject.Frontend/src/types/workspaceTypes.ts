import { RegisteredComponents } from '@/workspaceConfiguration';
import { IDockviewPanelProps } from 'dockview';

type ExtractDockviewPanelProps<T extends React.FC<IDockviewPanelProps>> =
  React.ComponentProps<T> extends IDockviewPanelProps<infer P> ? P : never;

export type WorkspaceEventMappings = {
  [key in keyof RegisteredComponents]: ExtractDockviewPanelProps<RegisteredComponents[key]>;
};
