import { MetadataRoute } from 'next';
import { carService } from '@/services/carService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://epicdrive.vercel.app';

    // Static routes
    const routes = [
        '',
        '/cars',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes for cars
    try {
        const cars = await carService.getCars();
        const carRoutes = cars.map((car) => ({
            url: `${baseUrl}/cars/${car.id}`,
            lastModified: new Date(car.created_at || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        return [...routes, ...carRoutes];
    } catch (error) {
        console.error('Sitemap generation error:', error);
        return routes;
    }
}
