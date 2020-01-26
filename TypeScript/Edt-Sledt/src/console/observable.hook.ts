import { Observable } from 'rxjs';
import { useEffect, useState } from 'react';

export function useObservable<T>(observable$: Observable<T>, initialValue: T): T | undefined {
    const [value, update] = useState<T | undefined>(initialValue);

    useEffect(() => {
        const s = observable$.subscribe(update);
        return () => s.unsubscribe();
    }, [observable$]);

    return value;
}
