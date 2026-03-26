import {Page, useBrowsePages} from '@tryghost/admin-x-framework/api/pages';
import {Post, useBrowsePosts} from '@tryghost/admin-x-framework/api/posts';
import {ValueSource, ValueSourceParams, ValueSourceResult} from '@tryghost/shade';
import {buildQuotedListFilter, mergeFilterOptions} from './utils';
import {escapeNqlString} from '@src/views/filters/filter-normalization';
import {useDebounce} from 'use-debounce';
import {useMemo} from 'react';

function buildPublishedFilter(query: string) {
    return query ? `status:published+title:~${escapeNqlString(query)}` : 'status:published';
}

function toPostOption(post: Post) {
    return {
        value: post.id,
        label: post.title
    };
}

function toPageOption(page: Page) {
    return {
        value: page.id,
        label: page.title,
        detail: 'Page'
    };
}

export function usePostResourceValueSource(): ValueSource<string> {
    const usePostResourceValueSourceOptions = ({query, selectedValues}: ValueSourceParams<string>): ValueSourceResult<string> => {
        const [debouncedQuery] = useDebounce(query, 200);
        const postsBrowse = useBrowsePosts({
            searchParams: {
                filter: buildPublishedFilter(debouncedQuery),
                limit: '25',
                fields: 'id,title',
                order: 'published_at DESC'
            }
        });
        const pagesBrowse = useBrowsePages({
            searchParams: {
                filter: buildPublishedFilter(debouncedQuery),
                limit: '25',
                fields: 'id,title',
                order: 'published_at DESC'
            }
        });
        const hydratedPostBrowse = useBrowsePosts({
            enabled: selectedValues.length > 0,
            searchParams: {
                limit: '25',
                fields: 'id,title',
                ...(buildQuotedListFilter('id', selectedValues) ? {filter: buildQuotedListFilter('id', selectedValues)} : {})
            }
        });
        const hydratedPageBrowse = useBrowsePages({
            enabled: selectedValues.length > 0,
            searchParams: {
                limit: '25',
                fields: 'id,title',
                ...(buildQuotedListFilter('id', selectedValues) ? {filter: buildQuotedListFilter('id', selectedValues)} : {})
            }
        });

        const visibleOptions = useMemo(() => {
            return mergeFilterOptions(
                (postsBrowse.data?.posts || []).map(toPostOption),
                (pagesBrowse.data?.pages || []).map(toPageOption)
            );
        }, [pagesBrowse.data?.pages, postsBrowse.data?.posts]);

        const hydratedOptions = useMemo(() => {
            return mergeFilterOptions(
                (hydratedPostBrowse.data?.posts || []).map(toPostOption),
                (hydratedPageBrowse.data?.pages || []).map(toPageOption)
            );
        }, [hydratedPageBrowse.data?.pages, hydratedPostBrowse.data?.posts]);

        return {
            options: mergeFilterOptions(hydratedOptions, visibleOptions),
            isLoading: postsBrowse.isLoading || pagesBrowse.isLoading || hydratedPostBrowse.isLoading || hydratedPageBrowse.isLoading
        };
    };

    return useMemo(() => ({
        id: 'posts.resource.remote',
        useOptions: usePostResourceValueSourceOptions
    }), []);
}
