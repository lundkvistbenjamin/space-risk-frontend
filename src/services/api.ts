import type {
    Assessment,
    TrendAssessment,
} from '../types/assessment';

const API_BASE_URL =
    'https://space-risk-backend.vercel.app';

export async function fetchLatestAssessment(): Promise<Assessment> {
    const response = await fetch(
        `${API_BASE_URL}/api/v1/latest-assessment`,
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch latest assessment: ${response.status}`,
        );
    }

    return response.json();
}

export async function fetchTrends(
    limit = 7,
): Promise<TrendAssessment[]> {
    const response = await fetch(
        `${API_BASE_URL}/api/v1/trends?limit=${limit}`,
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch assessment trends: ${response.status}`,
        );
    }

    const result = await response.json();

    return result.data;
}