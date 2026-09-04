export interface Task {
    id: number;
    titulo: string;
    descripcion: string | null;
    completado: boolean;
    fechaCreacion: string;
}