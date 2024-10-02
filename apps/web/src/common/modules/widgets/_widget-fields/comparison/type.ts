export type ComparisonFormat = 'all'|'percent'|'fixed';

export interface ComparisonValue {
    decreaseColor?: string;
    increaseColor?: string;
    format?: ComparisonFormat;
}

export interface ComparisonOptions {
    toggle?: boolean;
    // forTable?: boolean;
}