import type {
    REFRESH_INTERVAL_OPTIONS_MAP,
    DASHBOARD_TYPE,
} from '@/schema/dashboard/_constants/dashboard-constant';
import type {
    InheritOptions, WidgetOptions, WidgetSize, NewWidgetFilters,
} from '@/schema/dashboard/_types/widget-type';

import type { VariableModelType } from '@/lib/variable-models';
import type { Value } from '@/lib/variable-models/_base/types';


export type DashboardType = typeof DASHBOARD_TYPE[keyof typeof DASHBOARD_TYPE];

// dashboard variable schema types
type VariableSelectionType = 'SINGLE' | 'MULTI';

export type TemplateType = 'MANAGED'|'EXTENSION';

interface DashboardVariableOptions {
    type: VariableModelType;
    key: string;
    dataKey?: string;
    values?: Value[];
}

export interface DashboardVariableSchemaProperty {
    name?: string;
    variable_type: VariableModelType;
    use: boolean;
    selection_type?: VariableSelectionType;
    description?: string;
    readonly?: boolean; // can not edit value
    options?: DashboardVariableOptions[];
    fixed?: boolean; // can not delete this variable from dashboard
    required?: boolean; // value is required
}

type DashboardVariableSchemaProperties = Record<string, DashboardVariableSchemaProperty>;

export interface DashboardVariablesSchema {
    properties: DashboardVariableSchemaProperties;
    order: string[];
    fixed_options?: Record<string, any>;
}

// dashboard variables types
export type DashboardVariables = SingleSelectDashboardVariables | MultiSelectDashboardVariables;
interface SingleSelectDashboardVariables {
    [key: string]: string;
}
interface MultiSelectDashboardVariables {
    [key: string]: string[];
}

export type RefreshIntervalOption = keyof typeof REFRESH_INTERVAL_OPTIONS_MAP;
// dashboard settings types
export interface DashboardSettings {
    date_range: {
        enabled: boolean;
    } & DateRange;
    refresh_interval_option: RefreshIntervalOption;
}
export interface DateRange {
    start?: string;
    end?: string;
}

// dashboard template types
export interface DashboardTemplate {
    name: string;
    version: number|string;
    layouts: DashboardLayoutWidgetInfo[][];
    variables: DashboardVariables;
    settings: DashboardSettings;
    variables_schema: DashboardVariablesSchema;
    labels: string[];
    template_id: string;
    template_type: TemplateType;
    plugin_ids?: string[];
    display_info?: {
        icon?: string;
        preview_image?: string;
    }
}

export interface DashboardLayoutWidgetInfo {
    widget_name: string; // widget config name
    widget_key: string; // widget unique key. used for layout key binding.
    template_widget_id?: string; // widget id included in template. used to find widget settings to refer to when resetting widgets.
    title?: string; // widget title
    widget_options?: WidgetOptions;
    size?: WidgetSize;
    version: string; // widget config version
    inherit_options?: InheritOptions; // inherit information for the widget option
    schema_properties?: string[]; // schema properties that are shown on widget form. updated when use add more options.
    fixed_options?: Record<string, any>; // fixed options for the widget
}



export interface NewDashboardLayoutWidgetInfo {
    widget_name: string;
    widget_key: string;
    template_widget_id?: string;
    title?: string;
    size?: WidgetSize;
    version: string;
    schema_properties?: string[];
    fixed_options?: Record<string, any>;

    // Widget Options
    data_sources: DataSource[],
    data_mapping: Record<string, string|string[]>;
    chart_options: Record<string, any>;
    filters?: NewWidgetFilters;
}


export interface DataSource {
    data_domain: string; // Cost/Asset/Security
    data_source_from?: string; // cost_analysis
    resource_type: any; // 'cost_analysis.Cost' || 'inventory.MetricData'
    // TODO: create ResrouceType
    value: string[];
}
