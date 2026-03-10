export const FUEL_CATEGORIES = [
    { id: 'petrol', label: 'Petrol', icon: 'Fuel' },
    { id: 'diesel', label: 'Diesel', icon: 'Fuel' },
    { id: 'hev', label: 'Hybrid (HEV)', icon: 'Zap' },
    { id: 'phev', label: 'Hybrid (PHEV)', icon: 'Zap' },
    { id: 'electric', label: 'Electric', icon: 'Battery' },
] as const;

export const CAR_STATUSES = [
    { id: 'available', label: 'Available', color: 'bg-green-500' },
    { id: 'rented', label: 'Rented', color: 'bg-blue-500' },
    { id: 'maintenance', label: 'Maintenance', color: 'bg-yellow-500' },
] as const;

export const TRANSMISSION_TYPES = ['Manual', 'Automatic'] as const;

export const KARACHI_LOCATIONS = [
    'DHA',
    'Clifton',
    'Gulshan-e-Iqbal',
    'Nazimabad',
    'North Nazimabad',
    'PECHS',
    'Bahria Town',
    'Malir',
    'Korangi',
];
