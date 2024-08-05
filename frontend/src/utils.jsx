export const sortData = (data, sortConfig) => {
    return [...data].sort((a, b) => {
        if (!sortConfig.key) return 0;
    
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
    
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1; // -1 a va antes que b
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1; // 1 a va despues de b
    
        return 0;
    });
    
}; 

export const handleSort = (sortConfig, setSortConfig, key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
    }
    setSortConfig({ key, direction });
};