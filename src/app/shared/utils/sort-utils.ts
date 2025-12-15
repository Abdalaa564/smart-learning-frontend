export class SortUtils {
    static sortData<T>(data: T[], field: string, direction: 'asc' | 'desc'): T[] {
        if (!data || data.length === 0 || !field) {
            return data;
        }

        return [...data].sort((a, b) => {
            const valueA = this.resolveField(a, field);
            const valueB = this.resolveField(b, field);

            let comparison = 0;

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                comparison = valueA.localeCompare(valueB);
            } else {
                if (valueA < valueB) comparison = -1;
                if (valueA > valueB) comparison = 1;
            }

            return direction === 'asc' ? comparison : -comparison;
        });
    }

    private static resolveField(obj: any, path: string): any {
        return path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
    }
}
