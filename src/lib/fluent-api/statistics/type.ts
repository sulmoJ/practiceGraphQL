/* eslint-disable camelcase */
import { BaseQuery, BaseQueryState, TimeStamp } from '@/lib/fluent-api/type';

/* Stat Query */
export enum STAT_OPERATORS {
    count = 'count',
    sum = 'sum',
    average = 'avg',
    min = 'min',
    max = 'max',
    size = 'size',
    set = 'add_to_set',
    merge = 'merge_objects'
}

export interface GroupKeyItem {
    key: string;
    name: string;
}

export interface GroupFieldsItem {
    key?: string;
    name: string;
    operator: STAT_OPERATORS;
}

export interface Group {
    keys: GroupKeyItem[];
    fields: GroupFieldsItem[];
}

export interface UnwindItem {
    [key: string]: string;
}

export interface Aggregate {
    group: Group;
    unwind?: UnwindItem[];
}

export interface StatSort {
    name: string;
    desc: boolean;
}

export interface StatQueryState<param> extends BaseQueryState<param> {
    aggregate: Aggregate;
    sort?: StatSort;
    limit?: number;
}

export interface StatQuery extends BaseQuery {
    aggregate: Aggregate;
    sort?: StatSort;
    limit?: number;
}

/* Resource */
export interface JoinStateItem {
    keys: string[];
    type: string;
    resource_type: string;
    data_source_id?: string;
    query: StatQueryState<undefined>;
}

export interface FormulaItem {
    name: string;
    formula: string;
}

export interface ResourceStatState {
    resource_type: string;
    joinState: JoinStateItem[];
    formulas?: FormulaItem[];
    data_source_id?: string;
}

export interface JoinItem {
    keys: string[];
    resource_type: string;
    data_source_id?: string;
    query: StatQuery;
    type?: string;
}

export interface ResourceStatParam {
    resource_type: string;
    join?: JoinItem[];
    formulas?: FormulaItem[];
    data_source_id?: string;
}

export interface StatResponse<value> {
    results: value[];
}

/* History */
export interface HistoryParam {
    topic: string;
}

export interface HistoryListResp {
    topic: string;
    values: object;
    created_at: TimeStamp;
}

export interface HistoryDiffParam {
    topic: string;
    start: TimeStamp;
    end: TimeStamp;
    default_fields: string[];
    diff_fields: string[];
}

export interface HistoryDiffResp<value> {
    topic: string;
    results: value[];
}
