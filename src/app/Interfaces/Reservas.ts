export interface Reservas{
    id?:number;
    nombreAsistente: String;
    email:String;
    tipoEntrada: String;
    fechaReserva:Date;
    eventoId:number;
    cancelada:boolean;
}