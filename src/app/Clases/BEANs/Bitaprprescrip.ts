export interface Bitaprprescrip {
  idprescripcion: string;
  idbitapr: string;
  idcatprescrip: string;
  descripcion: string;
  orden: string;
}
export const DummyPrescripcionVacia = {
  idprescripcion: '',
  idbitapr: '',
  idcatprescrip: '',
  descripcion: '',
  orden: ''
};
export const DummyPrescripcion = {
  idprescripcion: '1',
  idbitapr: '1',
  idcatprescrip: '1',
  descripcion: 'Prescripción de prueba',
  orden: '1'
};
export const DummyPrescripcion2 = {
  idprescripcion: '2',
  idbitapr: '1',
  idcatprescrip: '2',
  descripcion: 'Hola Mundo!',
  orden: '2'
};
