import { ExtractDockviewPanelProps, HasDockviewPanelProps, SchemaParser } from '@/types/workspaceTypes';
import { registeredPanels } from '@/workspaceConfiguration';

type WorkspacePanelComponent<TPanelName extends keyof RegisteredPanels> = RegisteredPanels[TPanelName]['component'];

export type RegisteredPanels = typeof registeredPanels;
export type RegisteredPanelsWithProps = {
  [K in keyof RegisteredPanels as RegisteredPanels[K] extends {
    propSchemaParser: SchemaParser<WorkspacePanelComponent<K>>;
  }
    ? K
    : never]: RegisteredPanels[K];
};

export type WorkspacePanelProps<TPanelName extends keyof RegisteredPanels> = HasDockviewPanelProps<
  WorkspacePanelComponent<TPanelName>
> extends true
  ? ExtractDockviewPanelProps<WorkspacePanelComponent<TPanelName>>
  : undefined;

export const getRouteParam = <TPanelName extends keyof RegisteredPanels>(panelName: TPanelName) =>
  registeredPanels[panelName].routeParamName;

export const isOfTypeWorkspacePanel = (panelName: string): panelName is keyof RegisteredPanels =>
  panelName in registeredPanels;

export const isOfTypeWorkspacePanelWithProps = (panelName: string): panelName is keyof RegisteredPanelsWithProps =>
  isOfTypeWorkspacePanel(panelName) && 'propSchemaParser' in registeredPanels[panelName];
