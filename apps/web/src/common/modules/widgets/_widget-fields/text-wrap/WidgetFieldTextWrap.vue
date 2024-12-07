<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

import { PFieldTitle, PToggleButton } from '@cloudforet/mirinae';

import { useProxyValue } from '@/common/composables/proxy-state';
import type { TextWrapValue, TextWrapOptions } from '@/common/modules/widgets/_widget-fields/text-wrap/type';
import type {
    WidgetFieldComponentProps,
    WidgetFieldComponentEmit,
} from '@/common/modules/widgets/types/widget-field-type';


const emit = defineEmits<WidgetFieldComponentEmit<TextWrapValue|undefined>>();

const props = withDefaults(defineProps<WidgetFieldComponentProps<TextWrapOptions, TextWrapValue>>(), {
    widgetFieldSchema: () => ({
        options: {
            toggle: false,
            default: false,
        },
    }),
});

const state = reactive({
    proxyValue: useProxyValue('value', props, emit),
});

const handleUpdateToggle = (value: boolean) => {
    state.proxyValue = {
        toggleValue: value,
    };
    if (!value) {
        state.proxyValue = undefined;
    }
};

onMounted(() => {
    emit('update:is-valid', true);
    if (!props.value) {
        state.proxyValue = undefined;
        return;
    }
    state.proxyValue = {
        toggleValue: props.value?.toggleValue ?? props.widgetFieldSchema.options?.toggle ?? false,
    };
});
</script>

<template>
    <div class="widget-field-text-wrap">
        <div class="field-header">
            <p-field-title>{{ $t('COMMON.WIDGETS.TEXT_WRAP.TEXT_WRAP') }}</p-field-title>
            <p-toggle-button :value="state.proxyValue?.toggleValue"
                             @update:value="handleUpdateToggle"
            />
        </div>
        <p class="description">
            {{ $t('COMMON.WIDGETS.TEXT_WRAP.DESCRIPTION') }}
        </p>
    </div>
</template>

<style lang="postcss" scoped>
.widget-field-text-wrap {
    .field-header {
        @apply flex items-center gap-1 justify-between;
    }
    .description {
        @apply text-paragraph-sm text-gray-900;
        margin-top: 0.25rem;
    }
}
</style>
