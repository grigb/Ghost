import React, {useCallback, useEffect, useMemo, useState} from 'react';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import {Button, Filter, FilterFieldConfig, FilterOption, Filters, LucideIcon, ValueSource, ValueSourceParams, ValueSourceResult} from '@tryghost/shade';
import {STATS_LABEL_MAPPINGS, UNKNOWN_LOCATION_VALUES} from '@src/utils/constants';
import {formatQueryDate, getRangeDates} from '@tryghost/shade';
import {getAudienceFromFilterValues, getAudienceQueryParam} from '@src/utils/audience';
import {useAppContext} from '@src/providers/posts-app-context';
import {useGlobalData} from '@src/providers/post-analytics-context';
import {useTinybirdQuery} from '@tryghost/admin-x-framework';

countries.registerLocale(enLocale);

interface StatsFilterProps extends Omit<React.ComponentProps<typeof Filters>, 'fields' | 'onChange'> {
    filters: Filter[];
    onChange?: (filters: Filter[]) => void;
}

// Helper to get country name from code
const getCountryName = (code: string): string => {
    return STATS_LABEL_MAPPINGS[code as keyof typeof STATS_LABEL_MAPPINGS] || countries.getName(code, 'en') || code;
};

// Helper component for visit count badge - used by all filter options
const VisitCountBadge = ({visits}: {visits: number}) => (
    <span className="order-2 font-mono text-xs text-muted-foreground">
        {visits.toLocaleString()}
    </span>
);

// Configuration for each filter field type
interface FilterFieldDefinition {
    endpoint: string;
    valueKey: string;
    // Transform value and get display label
    transformValue?: (value: string) => {value: string; label: string};
    // Filter out invalid items from API response
    filterItem?: (item: Record<string, unknown>) => boolean;
}

const FILTER_FIELD_DEFINITIONS: Record<string, FilterFieldDefinition> = {
    utm_source: {
        endpoint: 'api_top_utm_sources',
        valueKey: 'utm_source',
        transformValue: v => ({value: v || '(not set)', label: v || '(not set)'})
    },
    utm_medium: {
        endpoint: 'api_top_utm_mediums',
        valueKey: 'utm_medium',
        transformValue: v => ({value: v || '(not set)', label: v || '(not set)'})
    },
    utm_campaign: {
        endpoint: 'api_top_utm_campaigns',
        valueKey: 'utm_campaign',
        transformValue: v => ({value: v || '(not set)', label: v || '(not set)'})
    },
    utm_content: {
        endpoint: 'api_top_utm_contents',
        valueKey: 'utm_content',
        transformValue: v => ({value: v || '(not set)', label: v || '(not set)'})
    },
    utm_term: {
        endpoint: 'api_top_utm_terms',
        valueKey: 'utm_term',
        transformValue: v => ({value: v || '(not set)', label: v || '(not set)'})
    },
    source: {
        endpoint: 'api_top_sources',
        valueKey: 'source',
        transformValue: v => ({
            value: v || '',
            label: v || 'Direct'
        })
    },
    location: {
        endpoint: 'api_top_locations',
        valueKey: 'location',
        filterItem(item) {
            const location = String(item.location || '');
            return location !== '' && !UNKNOWN_LOCATION_VALUES.includes(location);
        },
        transformValue: v => ({value: v, label: getCountryName(v)})
    },
    device: {
        endpoint: 'api_top_devices',
        valueKey: 'device',
        transformValue: v => ({
            value: v,
            label: v === 'mobile-ios' ? 'iOS' :
                v === 'mobile-android' ? 'Android' :
                    v === 'desktop' ? 'Desktop' :
                        v === 'bot' ? 'Bot' : v
        })
    }
};

const filterOptionsByQuery = <T = string,>(options: FilterOption<T>[], query: string): FilterOption<T>[] => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return options;
    }

    return options.filter((option) => {
        return option.label.toLowerCase().includes(normalizedQuery) ||
            option.detail?.toLowerCase().includes(normalizedQuery);
    });
};

const mergeFilterOptions = <T = string,>(...lists: Array<Array<FilterOption<T>> | undefined>): FilterOption<T>[] => {
    const merged = new Map<T, FilterOption<T>>();

    for (const list of lists) {
        if (!list) {
            continue;
        }

        for (const option of list) {
            if (!merged.has(option.value)) {
                merged.set(option.value, option);
            }
        }
    }

    return [...merged.values()];
};

const buildTinybirdOptions = (
    data: unknown,
    definition?: FilterFieldDefinition
): FilterOption<string>[] => {
    if (!definition) {
        return [];
    }

    const items = (data as Array<Record<string, unknown>> | undefined) || [];

    return items
        .filter(item => (definition.filterItem ? definition.filterItem(item) : true))
        .map((item) => {
            const rawValue = String(item[definition.valueKey] ?? '');
            const visits = Number(item.visits) || 0;
            const {value, label} = definition.transformValue
                ? definition.transformValue(rawValue)
                : {value: rawValue, label: rawValue};

            return {
                label,
                value,
                icon: <VisitCountBadge visits={visits} />
            };
        });
};

// Build filter params for Tinybird API, excluding the specified field to avoid circular filtering
const buildFilterParams = (
    currentFilters: Filter[],
    excludeField: string | undefined,
    baseParams: Record<string, string>
): Record<string, string> => {
    const params = {...baseParams};

    currentFilters.forEach((filter) => {
        if ((excludeField && filter.field === excludeField) || filter.values.length === 0) {
            return;
        }

        const value = filter.values[0] as string;

        if (filter.field === 'audience') {
            // Skip audience - handled separately via member_status
            return;
        } else if (filter.field === 'source' || filter.field === 'device' || filter.field === 'location' || filter.field.startsWith('utm_')) {
            params[filter.field] = value;
        }
    });

    return params;
};

const useTinybirdFilterValueSource = (
    fieldKey: string,
    currentFilters: Filter[] = [],
    postUuid?: string
): ValueSource<string> => {
    const useTinybirdFilterValueSourceOptions = ({query, selectedValues}: ValueSourceParams<string>): ValueSourceResult<string> => {
        const {statsConfig, range} = useGlobalData();
        const {startDate, endDate, timezone} = getRangeDates(range);
        const definition = FILTER_FIELD_DEFINITIONS[fieldKey];

        const audience = useMemo(() => {
            const audienceFilter = currentFilters.find(f => f.field === 'audience');
            return getAudienceFromFilterValues(audienceFilter?.values as string[] | undefined);
        }, [currentFilters]);

        const baseParams = useMemo(() => {
            const params: Record<string, string> = {
                site_uuid: statsConfig?.id || '',
                date_from: formatQueryDate(startDate),
                date_to: formatQueryDate(endDate),
                timezone: timezone,
                member_status: getAudienceQueryParam(audience),
                limit: '50'
            };

            if (postUuid) {
                params.post_uuid = postUuid;
            }

            return params;
        }, [statsConfig?.id, startDate, endDate, timezone, audience, postUuid]);

        const visibleQuery = useTinybirdQuery({
            endpoint: definition?.endpoint || '',
            statsConfig,
            params: buildFilterParams(currentFilters, fieldKey, baseParams),
            enabled: !!definition
        });

        const hydratedParams = useMemo(() => {
            const params = buildFilterParams(currentFilters, undefined, baseParams);

            if (selectedValues[0]) {
                params[fieldKey] = selectedValues[0];
            }

            return params;
        }, [baseParams, currentFilters, fieldKey, selectedValues]);

        const hydratedQuery = useTinybirdQuery({
            endpoint: definition?.endpoint || '',
            statsConfig,
            params: hydratedParams,
            enabled: selectedValues.length > 0 && !!definition
        });

        const visibleOptions = useMemo(() => {
            return buildTinybirdOptions(visibleQuery.data, definition);
        }, [definition, visibleQuery.data]);

        const hydratedOptions = useMemo(() => {
            return buildTinybirdOptions(hydratedQuery.data, definition);
        }, [definition, hydratedQuery.data]);

        return {
            options: mergeFilterOptions(hydratedOptions, filterOptionsByQuery(visibleOptions, query)),
            isLoading: visibleQuery.loading || hydratedQuery.loading
        };
    };

    return useMemo(() => ({
        id: `posts.post-analytics.${fieldKey}`,
        useOptions: useTinybirdFilterValueSourceOptions
    }), [fieldKey, useTinybirdFilterValueSourceOptions]);
};

function StatsFilter({filters, onChange, ...props}: StatsFilterProps) {
    const {appSettings} = useAppContext();
    const {post} = useGlobalData();
    const postUuid = post?.uuid;

    // Track screen width for responsive popover alignment
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1024px)'); // lg breakpoint

        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };

        // Set initial value
        handleChange(mediaQuery);

        // Listen for changes
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Filter audience options based on site settings
    const audienceOptions = useMemo(() => {
        const options = [
            {value: 'undefined', label: 'Public visitors', icon: <LucideIcon.Globe className='text-gray-700'/>},
            {value: 'free', label: 'Free members', icon: <LucideIcon.User className='text-green'/>},
            {value: 'paid', label: 'Paid members', icon: <LucideIcon.UserPlus className='text-orange'/>}
        ];
        return appSettings?.paidMembersEnabled ? options : options.filter(opt => opt.value !== 'paid');
    }, [appSettings?.paidMembersEnabled]);
    const utmSourceValueSource = useTinybirdFilterValueSource('utm_source', filters, postUuid);
    const utmMediumValueSource = useTinybirdFilterValueSource('utm_medium', filters, postUuid);
    const utmCampaignValueSource = useTinybirdFilterValueSource('utm_campaign', filters, postUuid);
    const utmContentValueSource = useTinybirdFilterValueSource('utm_content', filters, postUuid);
    const utmTermValueSource = useTinybirdFilterValueSource('utm_term', filters, postUuid);
    const sourceValueSource = useTinybirdFilterValueSource('source', filters, postUuid);
    const deviceValueSource = useTinybirdFilterValueSource('device', filters, postUuid);
    const locationValueSource = useTinybirdFilterValueSource('location', filters, postUuid);

    // Note: Only 'is' operator supported - Tinybird pipes only support exact match
    const supportedOperators = useMemo(() => [
        {value: 'is', label: 'is'}
    ], []);

    // Grouped fields - memoized to avoid recreation on every render
    // Note: No 'post' filter in this context since we're already viewing a specific post
    const groupedFields: FilterFieldConfig[] = useMemo(() => {
        const utmFields: FilterFieldConfig[] = [
            {
                key: 'utm_source',
                label: 'UTM Source',
                type: 'select',
                icon: <LucideIcon.MousePointerClick className="size-4" />,
                placeholder: 'Select source',
                operators: supportedOperators,
                defaultOperator: 'is',
                hideOperatorSelect: true,
                valueSource: utmSourceValueSource,
                searchable: true,
                selectedOptionsClassName: 'hidden'
            },
            {
                key: 'utm_medium',
                label: 'UTM Medium',
                type: 'select',
                icon: <LucideIcon.SatelliteDish className="size-4" />,
                placeholder: 'Select medium',
                operators: supportedOperators,
                defaultOperator: 'is',
                hideOperatorSelect: true,
                valueSource: utmMediumValueSource,
                className: 'w-60',
                popoverContentClassName: 'w-60',
                searchable: true,
                selectedOptionsClassName: 'hidden'
            },
            {
                key: 'utm_campaign',
                label: 'UTM Campaign',
                type: 'select',
                icon: <LucideIcon.Flag className="size-4" />,
                placeholder: 'Select campaign',
                operators: supportedOperators,
                defaultOperator: 'is',
                hideOperatorSelect: true,
                valueSource: utmCampaignValueSource,
                className: 'w-60',
                popoverContentClassName: 'w-60',
                searchable: true,
                selectedOptionsClassName: 'hidden'
            },
            {
                key: 'utm_content',
                label: 'UTM Content',
                type: 'select',
                icon: <LucideIcon.TextCursorInput className="size-4" />,
                placeholder: 'Select content',
                operators: supportedOperators,
                defaultOperator: 'is',
                hideOperatorSelect: true,
                valueSource: utmContentValueSource,
                className: 'w-60',
                popoverContentClassName: 'w-60',
                searchable: true,
                selectedOptionsClassName: 'hidden'
            },
            {
                key: 'utm_term',
                label: 'UTM Term',
                type: 'select',
                icon: <LucideIcon.Tag className="size-4" />,
                placeholder: 'Select term',
                operators: supportedOperators,
                defaultOperator: 'is',
                hideOperatorSelect: true,
                valueSource: utmTermValueSource,
                className: 'w-60',
                popoverContentClassName: 'w-60',
                searchable: true,
                selectedOptionsClassName: 'hidden'
            }
        ];

        return [
            {
                group: 'Basic',
                fields: [
                    {
                        key: 'audience',
                        label: 'Audience',
                        type: 'multiselect',
                        icon: <LucideIcon.Users />,
                        options: audienceOptions.map(({value, label, icon}) => ({value, label, icon})),
                        defaultOperator: 'is any of',
                        hideOperatorSelect: true,
                        autoCloseOnSelect: true
                    },
                    {
                        key: 'source',
                        label: 'Source',
                        type: 'select',
                        icon: <LucideIcon.Globe className="size-4" />,
                        placeholder: 'Select source',
                        operators: supportedOperators,
                        defaultOperator: 'is',
                        hideOperatorSelect: true,
                        valueSource: sourceValueSource,
                        className: 'w-60',
                        popoverContentClassName: 'w-60',
                        searchable: true,
                        selectedOptionsClassName: 'hidden'
                    },
                    {
                        key: 'device',
                        label: 'Device',
                        type: 'select',
                        icon: <LucideIcon.Monitor className="size-4" />,
                        placeholder: 'Select device',
                        operators: supportedOperators,
                        defaultOperator: 'is',
                        hideOperatorSelect: true,
                        valueSource: deviceValueSource,
                        selectedOptionsClassName: 'hidden'
                    },
                    {
                        key: 'location',
                        label: 'Location',
                        type: 'select',
                        icon: <LucideIcon.MapPin className="size-4" />,
                        placeholder: 'Select location',
                        operators: supportedOperators,
                        defaultOperator: 'is',
                        hideOperatorSelect: true,
                        valueSource: locationValueSource,
                        searchable: true,
                        selectedOptionsClassName: 'hidden'
                    }
                ]
            },
            {
                group: 'UTM parameters',
                fields: utmFields
            }
        ];
    }, [audienceOptions, deviceValueSource, locationValueSource, sourceValueSource, supportedOperators, utmCampaignValueSource, utmContentValueSource, utmMediumValueSource, utmSourceValueSource, utmTermValueSource]);

    // Show clear button when there's at least one filter
    const hasFilters = filters.length > 0;

    const handleClearFilters = useCallback(() => {
        if (onChange) {
            onChange([]);
        }
    }, [onChange]);

    return (
        <div className="mt-3 flex w-full justify-between gap-2 lg:mt-0" data-testid="stats-filter-container">
            <Filters
                addButtonIcon={<LucideIcon.FunnelPlus />}
                addButtonText={hasFilters ? 'Add filter' : 'Filter'}
                allowMultiple={false}
                className={`[&>button]:order-last ${hasFilters && '[&>button]:border-none'}`}
                fields={groupedFields}
                filters={filters}
                keyboardShortcut="f"
                popoverAlign={isMobile ? 'start' : (hasFilters ? 'start' : 'end')}
                showSearchInput={false}
                onChange={onChange || (() => {})}
                {...props}
            />
            {hasFilters && (
                <Button
                    className='hidden font-normal text-muted-foreground lg:flex'
                    data-testid="stats-filter-clear-button"
                    variant="ghost"
                    onClick={handleClearFilters}
                >
                    <LucideIcon.FunnelX />
                    Clear
                </Button>
            )}
        </div>
    );
}

export default StatsFilter;
