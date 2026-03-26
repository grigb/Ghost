import {Member, useBrowseMembers} from '@tryghost/admin-x-framework/api/members';
import {ValueSource, ValueSourceParams, ValueSourceResult} from '@tryghost/shade';
import {buildQuotedListFilter, mergeFilterOptions} from './utils';
import {useDebounce} from 'use-debounce';
import {useMemo} from 'react';

function toMemberOption(member: Member) {
    return {
        value: member.id,
        label: member.name || 'Unknown name',
        detail: member.email ?? '(Unknown email)'
    };
}

export function useMemberValueSource(): ValueSource<string> {
    const useMemberValueSourceOptions = ({query, selectedValues}: ValueSourceParams<string>): ValueSourceResult<string> => {
        const [debouncedQuery] = useDebounce(query, 200);
        const browse = useBrowseMembers({
            searchParams: {
                limit: '100',
                order: 'created_at DESC',
                ...(debouncedQuery ? {search: debouncedQuery} : {})
            }
        });
        const hydrated = useBrowseMembers({
            enabled: selectedValues.length > 0,
            searchParams: {
                limit: '100',
                ...(buildQuotedListFilter('id', selectedValues) ? {filter: buildQuotedListFilter('id', selectedValues)} : {})
            }
        });

        const visibleOptions = useMemo(() => {
            return (browse.data?.members || []).map(toMemberOption);
        }, [browse.data?.members]);

        const hydratedOptions = useMemo(() => {
            return (hydrated.data?.members || []).map(toMemberOption);
        }, [hydrated.data?.members]);

        return {
            options: mergeFilterOptions(hydratedOptions, visibleOptions),
            isLoading: browse.isLoading || hydrated.isLoading
        };
    };

    return useMemo(() => ({
        id: 'posts.members.remote',
        useOptions: useMemberValueSourceOptions
    }), []);
}
