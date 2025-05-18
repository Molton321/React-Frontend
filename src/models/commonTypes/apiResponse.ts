import { ColumnDefinition } from "./columnDefinition";

export interface ApiResponse<T> {
    columns: Record<string, ColumnDefinition>;  // Diccionario con nombre y tipo
    data: T[];  // Datos devueltos por el backend
}
