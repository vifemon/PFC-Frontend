import fondo from "../../assets/muestra.jpg"

export const TARIFAS = {
  tarifa_general: {
    title: 'Tarifa General Mensual',
    description:
      'Acceso libre 24h con mesa fija. Wifi de alta velocidad y café gratis todos los días. Uso de un día al mes de la sala de reuniones en horario laboral según disponibilidad',
    price: '180€/mes',
    image: fondo
  },
  tarifa_flexible: {
    title: 'Tarifa Puesto Flexible',
    description:
      'Bono de 10 días sueltos para utilizar a lo largo de dos meses. Café gratis un día a la semana',
    price: '100€',
    image: ""
  },
  reserva_horas: {
    title: 'Reserva por Horas',
    description:
      'Reservas 10€ por cada hora que necesites con la flexibilidad que te ofrece nuestra aplicación web',
    price: '10€/hora',
    image: ""
  },
  reserva_salas: {
    title: 'Reserva de Oficinas',
    description:
      'Alquila el espacio que necesites para eventos, formaciones o reuniones. Por horas o concierta los precios a medida con nuestros empleados',
    price: '25€/hora',
    image: ""
  }
};