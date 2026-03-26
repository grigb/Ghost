import {FilterOption, ValueSource, ValueSourceParams, ValueSourceResult} from '@tryghost/shade';
import {filterOptionsByQuery} from './utils';
import {useMemo} from 'react';

export function useNewsletterValueSource(options: FilterOption<string>[] = []): ValueSource<string> {
    const useNewsletterValueSourceOptions = ({query}: ValueSourceParams<string>): ValueSourceResult<string> => {
        const visibleOptions = useMemo(() => filterOptionsByQuery(options, query), [options, query]);

        return {
            options: visibleOptions,
            isLoading: false
        };
    };

    return useMemo(() => ({
        id: 'posts.newsletters.local',
        useOptions: useNewsletterValueSourceOptions
    }), [useNewsletterValueSourceOptions]);
}
