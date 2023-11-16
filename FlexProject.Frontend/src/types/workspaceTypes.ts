import { IDockviewPanelProps } from 'dockview';

// type ExtractDockviewPanelProps<T extends React.FC<IDockviewPanelProps>> =
//   React.ComponentProps<T> extends IDockviewPanelProps<infer P> ? P : never;

// type IdentifierGenerator<T extends object, TKey extends keyof T | null> = TKey extends keyof T
//   ? (props: T[TKey]) => string
//   : () => string;

// export interface WorkspacePanel<
//   TComponent extends React.FC<IDockviewPanelProps>,
//   TKey extends keyof ExtractDockviewPanelProps<TComponent> | null = null,
// > {
//   component: TComponent;
//   queryParams: TKey extends null ? string : { name: string; value: TKey };
//   id: IdentifierGenerator<ExtractDockviewPanelProps<TComponent>, TKey>;
//   title: IdentifierGenerator<ExtractDockviewPanelProps<TComponent>, TKey>;
// }

interface WorkspacePanelCommonProps {
  component: React.FC<IDockviewPanelProps>;
  componentName: string;
  queryComponentName: string;
}

export interface WorkspacePanelWithoutParam extends WorkspacePanelCommonProps {
  id: string;
  title: string;
}

export interface WorkspacePanelWithParam extends WorkspacePanelCommonProps {
  queryParam: { fieldName: string; value: string };
  id: (props: string) => string;
  title: (props: string) => string;
}

export type WorkspacePanel = WorkspacePanelWithoutParam | WorkspacePanelWithParam;
