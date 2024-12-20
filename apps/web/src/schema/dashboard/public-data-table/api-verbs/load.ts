import type { Page } from '@/schema/_common/type';
import type { DashboardVars } from '@/schema/dashboard/_types/dashboard-type';
import type { Granularity } from '@/schema/dashboard/_types/widget-type';



export interface DataTableLoadParameters {
    data_table_id: string;
    granularity: Granularity;
    start?: string;
    end?: string;
    sort?: any[];
    page?: Page;
    vars?: DashboardVars;
}
