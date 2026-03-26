import {Post, useBrowsePosts} from '@tryghost/admin-x-framework/api/posts';
import {ValueSource, ValueSourceParams, ValueSourceResult} from '@tryghost/shade';
import {buildQuotedListFilter, mergeFilterOptions} from './utils';
import {escapeNqlString} from '@src/views/filters/filter-normalization';
import {useDebounce} from 'use-debounce';
import {useMemo} from 'react';

const EMAIL_BASE_FILTER = '(status:published,status:sent)+newsletter_id:-null';

function buildEmailFilter(query: string) {
    return query ? `${EMAIL_BASE_FILTER}+title:~${escapeNqlString(query)}` : EMAIL_BASE_FILTER;
}

function toPostOption(post: Post) {
    return {
        value: post.id,
        label: post.title
    };
}

export function useEmailPostValueSource(): ValueSource<string> {
    const useEmailPostValueSourceOptions = ({query, selectedValues}: ValueSourceParams<string>): ValueSourceResult<string> => {
        const [debouncedQuery] = useDebounce(query, 200);
        const browse = useBrowsePosts({
            searchParams: {
                filter: buildEmailFilter(debouncedQuery),
                limit: '25',
                fields: 'id,title',
                order: 'published_at DESC'
            }
        });
        const hydrated = useBrowsePosts({
            enabled: selectedValues.length > 0,
            searchParams: {
                limit: '25',
                fields: 'id,title',
                ...(buildQuotedListFilter('id', selectedValues) ? {filter: buildQuotedListFilter('id', selectedValues)} : {})
            }
        });

        const visibleOptions = useMemo(() => {
            return (browse.data?.posts || []).map(toPostOption);
        }, [browse.data?.posts]);

        const hydratedOptions = useMemo(() => {
            return (hydrated.data?.posts || []).map(toPostOption);
        }, [hydrated.data?.posts]);

        return {
            options: mergeFilterOptions(hydratedOptions, visibleOptions),
            isLoading: browse.isLoading || hydrated.isLoading
        };
    };

    return useMemo(() => ({
        id: 'posts.email.remote',
        useOptions: useEmailPostValueSourceOptions
    }), []);
}
