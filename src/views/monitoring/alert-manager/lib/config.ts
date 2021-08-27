import {
    red, coral, yellow, blue, violet, gray,
} from '@/styles/colors';

export enum ACTION {
    create = 'create',
    delete = 'delete',
    update = 'update',
    default = 'default',
}

export const EDIT_MODE = {
    DESCRIPTION: 'description',
    PROJECT: 'project',
} as const;
export type EDIT_MODE = typeof EDIT_MODE[keyof typeof EDIT_MODE];

export const ALERT_ACTION = {
    acknowledge: 'acknowledge',
    resolve: 'resolve',
    merge: 'merge',
    delete: 'delete',
} as const;
export type ALERT_ACTION = typeof ALERT_ACTION[keyof typeof ALERT_ACTION]

export enum SCOPE {
    global = 'GLOBAL',
    project = 'PROJECT',
}

export enum FINISH_CONDITION {
    acknowledged = 'ACKNOWLEDGED',
    resolved = 'RESOLVED',
}

export const WEBHOOK_STATE = {
    ENABLED: 'ENABLED',
    DISABLED: 'DISABLED',
} as const;
export type WEBHOOK_STATE = typeof WEBHOOK_STATE[keyof typeof WEBHOOK_STATE];


export const ALERT_STATE = {
    TRIGGERED: 'TRIGGERED',
    ACKNOWLEDGED: 'ACKNOWLEDGED',
    RESOLVED: 'RESOLVED',
    ERROR: 'ERROR',
} as const;
export type ALERT_STATE = typeof ALERT_STATE[keyof typeof ALERT_STATE];

export const ALERT_URGENCY = Object.freeze({
    ALL: 'ALL',
    HIGH: 'HIGH',
    LOW: 'LOW',
} as const);
export type ALERT_URGENCY = typeof ALERT_URGENCY[keyof typeof ALERT_URGENCY];

export const ALERT_SEVERITY = {
    CRITICAL: 'Critical',
    ERROR: 'Error',
    WARNING: 'Warning',
    INFO: 'Info',
    NOT_AVAILABLE: 'Not Available',
    NONE: 'None',
};
export type ALERT_SEVERITY = typeof ALERT_SEVERITY[keyof typeof ALERT_SEVERITY];

export const ALERT_STATE_FILTER = Object.freeze({
    OPEN: 'OPEN',
    TRIGGERED: 'TRIGGERED',
    ACKNOWLEDGED: 'ACKNOWLEDGED',
    RESOLVED: 'RESOLVED',
    ERROR: 'ERROR',
    ALL: 'ALL',
} as const);
export type ALERT_STATE_FILTER = typeof ALERT_STATE_FILTER[keyof typeof ALERT_STATE_FILTER];

export const ASSIGNED_STATE = Object.freeze({
    ALL: 'ALL',
    ASSIGNED_TO_ME: 'ASSIGNED_TO_ME',
} as const);
export type ASSIGNED_STATE = typeof ASSIGNED_STATE[keyof typeof ASSIGNED_STATE];

export const ALERT_SEVERITY_COLORS: Record<keyof typeof ALERT_SEVERITY, string> = {
    CRITICAL: red[600],
    ERROR: coral[600],
    WARNING: yellow[600],
    INFO: blue[400],
    NOT_AVAILABLE: violet[800],
    NONE: gray[500],
};
