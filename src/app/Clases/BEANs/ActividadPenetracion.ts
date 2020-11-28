export class ActividadPenetracion {

  iDActividad:string;
  ordenTrabajo:string;
  ubicacionTecnica:string;
  denominacionEquipo:string;
  descripcionActividad:string;
  claveSistema:string;
  division:string;
  tipoMantto:string;
  grupoTrabajo:string;
  area:string;
  ingResponsable:string;
  fechaPlanInicio:Date;
  fechaPlanFin:Date;
  fechaRealInicio:Date;
  fechaRealFin:Date;
  duracionOriginal:number;
  actividadesRelacionadas:ActividadPenetracion[];
  equipos:string;
  esHijo:boolean;
  porcentajeAvance:number;
}
