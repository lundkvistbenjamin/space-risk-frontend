export interface RiskScores {

    power_grid: number;

    overall_max: number;

    gps_disruption: number;

    radio_blackout: number;

}

export interface PrimaryCmeFeatures {

    speed: number;

    half_angle: number;

    is_earth_directed: boolean;

}

export interface Assessment {

    id: string;

    assessment_date: string;

    generated_at: string;

    flare_count: number;

    cme_count: number;

    peak_solar_flare_class: string;

    peak_xray_flux_wm2: number;

    primary_cme_features: PrimaryCmeFeatures;

    scores: RiskScores;

    threat_level: string;

    created_at: string;

}

export interface TrendAssessment {

    assessment_date: string;

    generated_at: string;

    scores: RiskScores;

    threat_level: string;

    flare_count: number;

    cme_count: number;

}