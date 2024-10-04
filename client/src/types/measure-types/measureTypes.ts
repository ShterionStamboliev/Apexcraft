export type Measure = {
    id?: string;
    name: string;
}
export interface MeasureFormProps {
    onSuccess?: () => void;
    measure: Measure;
}