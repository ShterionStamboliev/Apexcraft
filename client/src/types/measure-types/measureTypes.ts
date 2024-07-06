export type Measure = {
    id?: number;
    name: string;
}
export interface MeasureFormProps {
    onSuccess?: () => void;
    measure: Measure;
}