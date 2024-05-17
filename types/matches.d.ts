interface IEvents {
    events: IEventsObject[];
    current_round: any | number | string;
}
interface IEventsObject {
    id: number;
    competition_slug: string;
    name: string;
    short_name: string;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
    match_day: number;
    points: number;
}