import { IDockviewPanelProps } from 'dockview';
import z from 'zod';

export type HasDockviewPanelProps<T extends React.FC<IDockviewPanelProps>> =
  React.ComponentProps<T> extends IDockviewPanelProps ? true : false;

export type ExtractDockviewPanelProps<T extends React.FC<IDockviewPanelProps>> =
  React.ComponentProps<T> extends IDockviewPanelProps<infer P> ? P : never;

export type SchemaParser<T extends React.FC<IDockviewPanelProps>> = HasDockviewPanelProps<T> extends true
  ? z.ZodType<ExtractDockviewPanelProps<T>>
  : never;

export interface WorkspacePanelWithoutProps<T extends React.FC<IDockviewPanelProps> = React.FC<IDockviewPanelProps>> {
  component: T;
  routeParamName: string;
  getTitle: () => string;
}

export interface WorkspacePanelWithProps<
  T extends React.FC<IDockviewPanelProps> = React.FC<IDockviewPanelProps>,
  TProps extends ExtractDockviewPanelProps<T> = ExtractDockviewPanelProps<T>,
> {
  component: T;
  routeParamName: string;
  getTitle: (props: TProps) => string;
  propSchemaParser: SchemaParser<T>;
}

export type WorkspacePanel = WorkspacePanelWithoutProps | WorkspacePanelWithProps;

export type RegisterWorkspacePanel<T extends React.FC<IDockviewPanelProps> = React.FC<IDockviewPanelProps>> =
  HasDockviewPanelProps<T> extends true ? WorkspacePanelWithProps<T> : WorkspacePanelWithoutProps<T>;
