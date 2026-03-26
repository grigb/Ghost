import {useEffect, useState} from 'react';

type PaginationLike = {
    total: number;
    next: number | null;
};

export function useHybridSourceMode(
    pagination: PaginationLike | undefined,
    pageLimit: number
): 'local' | 'remote' | null {
    const [mode, setMode] = useState<'local' | 'remote' | null>(null);

    useEffect(() => {
        if (mode !== null || !pagination) {
            return;
        }

        setMode(pagination.total <= pageLimit || pagination.next === null ? 'local' : 'remote');
    }, [mode, pageLimit, pagination]);

    return mode;
}
