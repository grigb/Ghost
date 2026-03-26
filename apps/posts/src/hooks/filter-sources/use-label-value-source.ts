import {Label, useBrowseLabels} from '@tryghost/admin-x-framework/api/labels';
import {ValueSource, ValueSourceParams, ValueSourceResult} from '@tryghost/shade';
import {buildQuotedListFilter, filterOptionsByQuery, mergeFilterOptions} from './utils';
import {escapeNqlString} from '@src/views/filters/filter-normalization';
import {useDebounce} from 'use-debounce';
import {useHybridSourceMode} from './use-hybrid-source-mode';
import {useMemo} from 'react';

const LABEL_PAGE_LIMIT = '100';

function toLabelOption(label: Label) {
    return {
        value: label.slug,
        label: label.name,
        metadata: {
            id: label.id
        }
    };
}

export function useLabelValueSource(): ValueSource<string> {
    const useLabelValueSourceOptions = ({query, selectedValues}: ValueSourceParams<string>): ValueSourceResult<string> => {
        const initialBrowse = useBrowseLabels({
            searchParams: {
                limit: LABEL_PAGE_LIMIT,
                order: 'name asc'
            }
        });
        const mode = useHybridSourceMode(
            initialBrowse.data?.meta?.pagination,
            Number(LABEL_PAGE_LIMIT)
        );
        const [debouncedQuery] = useDebounce(mode === 'remote' ? query : '', 250);

        const remoteBrowse = useBrowseLabels({
            enabled: mode === 'remote',
            searchParams: {
                limit: LABEL_PAGE_LIMIT,
                order: 'name asc',
                ...(debouncedQuery ? {filter: `name:~${escapeNqlString(debouncedQuery)}`} : {})
            }
        });

        const hydratedBrowse = useBrowseLabels({
            enabled: selectedValues.length > 0,
            searchParams: {
                limit: LABEL_PAGE_LIMIT,
                ...(buildQuotedListFilter('slug', selectedValues) ? {filter: buildQuotedListFilter('slug', selectedValues)} : {})
            }
        });

        const initialOptions = useMemo(() => {
            return (initialBrowse.data?.labels || []).map(toLabelOption);
        }, [initialBrowse.data?.labels]);

        const visibleOptions = useMemo(() => {
            if (mode === 'remote') {
                return (remoteBrowse.data?.labels || []).map(toLabelOption);
            }

            return filterOptionsByQuery(initialOptions, query);
        }, [initialOptions, mode, query, remoteBrowse.data?.labels]);

        const hydratedOptions = useMemo(() => {
            return (hydratedBrowse.data?.labels || []).map(toLabelOption);
        }, [hydratedBrowse.data?.labels]);

        return {
            options: mergeFilterOptions(hydratedOptions, visibleOptions),
            isLoading: initialBrowse.isLoading || (mode === 'remote' && remoteBrowse.isLoading) || hydratedBrowse.isLoading
        };
    };

    return useMemo(() => ({
        id: 'posts.labels.hybrid',
        useOptions: useLabelValueSourceOptions
    }), []);
}
