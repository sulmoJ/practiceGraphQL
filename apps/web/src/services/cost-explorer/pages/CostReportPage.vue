<script lang="ts" setup>
import {
    computed, onMounted, reactive, watch,
} from 'vue';
import { useRoute } from 'vue-router/composables';

import { clone } from 'lodash';

import {
    PHeading, PTab, PEmpty, PDataLoader,
} from '@cloudforet/mirinae';
import type { TabItem } from '@cloudforet/mirinae/types/navigation/tabs/tab/type';

import { store } from '@/store';
import { i18n } from '@/translations';

import type { Currency } from '@/store/modules/display/type';

import type { PageAccessMap } from '@/lib/access-control/config';
import type { MenuId } from '@/lib/menu/config';
import { MENU_ID } from '@/lib/menu/config';

import CostReportMonthlyTotalAmountSummaryCard
    from '@/services/cost-explorer/components/CostReportMonthlyTotalAmountSummaryCard.vue';
import CostReportOverviewCostTrendCard from '@/services/cost-explorer/components/CostReportOverviewCostTrendCard.vue';
import CostReportRecipientsCard from '@/services/cost-explorer/components/CostReportRecipientsCard.vue';
import CostReportReportsTab from '@/services/cost-explorer/components/CostReportReportsTab.vue';
import CostReportUpcomingReportCard from '@/services/cost-explorer/components/CostReportUpcomingReportCard.vue';
import { COST_EXPLORER_ROUTE } from '@/services/cost-explorer/routes/route-constant';
import { useCostReportPageStore } from '@/services/cost-explorer/stores/cost-report-page-store';



const costReportPageStore = useCostReportPageStore();
const costReportPageState = costReportPageStore.state;

const route = useRoute();

const storeState = reactive({
    pageAccessPermissionMap: computed<PageAccessMap>(() => store.getters['user/pageAccessPermissionMap']),
});
const state = reactive({
    loading: true,
    tabs: computed<TabItem[]>(() => [
        {
            name: 'overview',
            label: i18n.t('BILLING.COST_MANAGEMENT.COST_REPORT.OVERVIEW'),
            keepAlive: true,
        },
        {
            name: 'reports',
            label: i18n.t('BILLING.COST_MANAGEMENT.COST_REPORT.REPORTS'),
            keepAlive: true,
        },
    ]),
    activeTab: 'overview',
    currency: 'KRW' as Currency,
    selectedMenuId: computed(() => {
        const reversedMatched = clone(route.matched).reverse();
        const closestRoute = reversedMatched.find((d) => d.meta?.menuId !== undefined);
        const targetMenuId: MenuId = closestRoute?.meta?.menuId || MENU_ID.WORKSPACE_HOME;
        if (route.name === COST_EXPLORER_ROUTE.LANDING._NAME) {
            return '';
        }
        return targetMenuId;
    }),
    hasReadWriteAccess: computed<boolean|undefined>(() => storeState.pageAccessPermissionMap[state.selectedMenuId]?.write),
});

/* Watcher */
watch(() => state.activeTab, (activeTab) => {
    costReportPageState.activeTab = activeTab;
});

onMounted(async () => {
    state.loading = true;
    await costReportPageStore.fetchCostReportConfig();
    await costReportPageStore.fetchRecentReportData(costReportPageState.costReportConfig?.cost_report_config_id);
    state.loading = false;
});
</script>

<template>
    <div class="cost-report-page">
        <p-heading class="mb-6"
                   :title="$t('BILLING.COST_MANAGEMENT.COST_REPORT.COST_REPORT')"
        />
        <p-tab :tabs="state.tabs"
               :active-tab.sync="state.activeTab"
        >
            <template #overview>
                <p-data-loader :loading="state.loading"
                               :data="true"
                               class="data-loader"
                >
                    <div class="overview-tab-pane">
                        <cost-report-overview-cost-trend-card v-if="!costReportPageState.recentReportDataLoading && costReportPageState.hasReport"
                                                              class="col-span-12"
                        />
                        <cost-report-monthly-total-amount-summary-card v-if="!costReportPageState.recentReportDataLoading & costReportPageState.hasReport"
                                                                       class="xl:col-span-8 lg:col-span-6 col-span-12"
                        />
                        <p-empty v-if="!costReportPageState.recentReportDataLoading && !costReportPageState.hasReport"
                                 class="xl:col-span-8 lg:col-span-6 col-span-12 empty-card"
                                 show-image
                                 :title="$t('BILLING.COST_MANAGEMENT.COST_REPORT.NO_REPORT')"
                        />
                        <div class="xl:col-span-4 lg:col-span-6 col-span-12 grid gap-4">
                            <cost-report-upcoming-report-card class="col-span-12"
                                                              :has-read-write-access="state.hasReadWriteAccess"
                            />
                            <cost-report-recipients-card class="col-span-12"
                                                         :has-read-write-access="state.hasReadWriteAccess"
                            />
                        </div>
                    </div>
                </p-data-loader>
            </template>
            <template #reports>
                <cost-report-reports-tab />
            </template>
        </p-tab>
    </div>
</template>

<style lang="scss" scoped>
.cost-report-page {
    .overview-tab-pane {
        @apply grid-cols-12;
        display: grid;
        gap: 1rem;
        align-items: start;
        padding: 1.5rem;
        .cost-report-monthly-total-amount-summary-card {
            @apply col-span-8;
        }
        .empty-card {
            @apply border border-gray-200 rounded-md;
            height: 28.875rem;
        }
        .right-part {
            @apply col-span-4;
            display: grid;
            gap: 1rem;
        }
    }
}

/* custom design-system component - p-tab */
:deep(.p-tab) {
    .data-loader {
        min-height: 14.5rem;
    }
}
</style>
