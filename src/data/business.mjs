export const business = {
  name: "Centro Veterinario Zaragoza",
  legalDisplayName: "CENTRO VETERINARIO ZARAGOZA",
  slogan: "Tu mascota, nuestra pasión",
  description:
    "Dedicados y comprometidos con la salud de tu mascota. Previene, cuida y protege a quienes más amas.",
  shortDescription:
    "Atención veterinaria, diagnóstico, cirugía, estética canina y servicios para viaje en Venustiano Carranza, CDMX.",
  owners: [
    {
      name: "MVZ. Paulina E. Ortiz Rivera",
      initials: "PO",
      role: "Médica Veterinaria Zootecnista"
    },
    {
      name: "MVZ. Jimena Núñez Pacheco",
      initials: "JN",
      role: "Médica Veterinaria Zootecnista"
    }
  ],
  experience: "3 años trabajando junto a ti",
  differentiators: [
    {
      title: "Atención personalizada",
      text: "Cada mascota y cada familia reciben orientación clara y un trato cercano."
    },
    {
      title: "Actualización continua",
      text: "Un equipo comprometido con mantenerse al día para brindar atención profesional."
    },
    {
      title: "Trato jovial y empático",
      text: "Cuidamos la experiencia de tu mascota con respeto, paciencia y calidez."
    },
    {
      title: "Servicios integrales",
      text: "Salud, diagnóstico, belleza, cuidado y apoyo para viajes en un mismo centro."
    }
  ],
  contact: {
    phoneDisplay: "55 6815 7821",
    phoneE164: "+525568157821",
    whatsappNumber: "525568157821",
    email: "",
    instagram: "https://www.instagram.com/centro_veterinario_zaragoza/",
    addressLine: "Calle 33 #161",
    neighborhood: "Ignacio Zaragoza",
    borough: "Venustiano Carranza",
    city: "Ciudad de México",
    region: "CDMX",
    postalCode: "15000",
    countryCode: "MX",
    fullAddress:
      "Calle 33 #161, Ignacio Zaragoza, Venustiano Carranza, 15000, Ciudad de México, CDMX",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=C.%2033%20161%2C%20Ignacio%20Zaragoza%2C%20Venustiano%20Carranza%2C%2015000%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX",
    mapEmbedUrl:
      "https://maps.google.com/maps?output=embed&q=Centro+Veterinario+Zaragoza%2C+C.+33+161%2C+Ignacio+Zaragoza%2C+Venustiano+Carranza%2C+15000+Ciudad+de+M%C3%A9xico%2C+CDMX&z=17"
  },
  hours: {
    clinic: {
      label: "Clínica",
      summary: "Lunes a sábado · 10:00–18:00",
      days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      opens: "10:00",
      closes: "18:00"
    },
    grooming: {
      label: "Estética",
      summary: "Jueves a martes · 11:00–17:00",
      days: ["Jueves", "Viernes", "Sábado", "Domingo", "Lunes", "Martes"],
      opens: "11:00",
      closes: "17:00",
      closedDay: "Miércoles"
    }
  },
  services: {
    medical: [
      {
        id: "consulta-general",
        title: "Consulta médica general",
        short: "Valoración médica y orientación para el cuidado de tu mascota.",
        icon: "stethoscope"
      },
      {
        id: "ultrasonografia",
        title: "Ultrasonografía",
        short: "Estudio de imagen disponible con cita para apoyar la valoración clínica.",
        icon: "ultrasound"
      },
      {
        id: "laboratorio-clinico",
        title: "Laboratorio clínico",
        short: "Apoyo diagnóstico mediante estudios de laboratorio.",
        icon: "lab"
      },
      {
        id: "radiografias",
        title: "Estudios radiográficos",
        short: "Estudios de imagen para complementar la evaluación médica.",
        icon: "xray"
      },
      {
        id: "cirugia",
        title: "Cirugía",
        short: "Valoración prequirúrgica y planeación del procedimiento con cita previa.",
        icon: "surgery"
      },
      {
        id: "especialidades",
        title: "Especialidades",
        short: "Consulta disponibilidad de atención especializada por WhatsApp.",
        icon: "specialty"
      },
      {
        id: "servicios-funerarios",
        title: "Servicios funerarios",
        short: "Acompañamiento y orientación para despedir a tu mascota con respeto.",
        icon: "heart"
      },
      {
        id: "cartas-chips-viaje",
        title: "Cartas y chips para viaje",
        short: "Apoyo para viajes nacionales e internacionales. Consulta requisitos y agenda.",
        icon: "travel"
      }
    ],
    grooming: [
      {
        id: "bano",
        title: "Baño",
        short: "Servicio de higiene y cuidado para tu mascota.",
        icon: "bath"
      },
      {
        id: "deslanado",
        title: "Deslanado",
        short: "Retiro de pelo suelto para ayudar al mantenimiento del manto.",
        icon: "brush"
      },
      {
        id: "corte-unas",
        title: "Corte de uñas",
        short: "Cuidado básico de uñas con manejo atento.",
        icon: "nails"
      },
      {
        id: "estilismo-canino",
        title: "Estilismo canino",
        short: "Arreglo estético de acuerdo con el servicio solicitado.",
        icon: "scissors"
      },
      {
        id: "colorimetria",
        title: "Colorimetría",
        short: "Servicio estético disponible con valoración y cotización previa.",
        icon: "palette"
      }
    ]
  },
  prices: [
    {
      service: "Consulta general",
      price: "$300",
      currency: "MXN",
      note: "Precio informado por el centro"
    },
    {
      service: "Ultrasonografía abdominal general",
      price: "$900",
      currency: "MXN",
      note: "Agenda previa"
    },
    {
      service: "Estudios radiográficos",
      price: "$900",
      currency: "MXN",
      note: "Incluye 2 tomas"
    },
    {
      service: "Evaluación y cotización prequirúrgica",
      price: "Sin costo",
      currency: "",
      note: "Con cita previa"
    }
  ],
  faq: [
    {
      question: "¿Cuál es el costo de la consulta general?",
      answer: "La consulta médica general tiene un precio informado de $300 MXN."
    },
    {
      question: "¿La evaluación prequirúrgica tiene costo?",
      answer:
        "La evaluación y cotización prequirúrgica se ofrece sin costo y requiere cita previa."
    },
    {
      question: "¿Qué horario tiene la clínica?",
      answer: "La clínica atiende de lunes a sábado, de 10:00 a 18:00 horas."
    },
    {
      question: "¿Qué horario tiene la estética?",
      answer:
        "La estética atiende de jueves a martes, de 11:00 a 17:00 horas; descansa los miércoles."
    },
    {
      question: "¿Dónde se encuentra Centro Veterinario Zaragoza?",
      answer:
        "En Calle 33 #161, colonia Ignacio Zaragoza, alcaldía Venustiano Carranza, C.P. 15000, Ciudad de México."
    },
    {
      question: "¿Cómo puedo solicitar una cita?",
      answer:
        "Puedes enviar un mensaje por WhatsApp al 55 6815 7821 o usar el formulario de esta página, que prepara el mensaje por ti."
    }
  ]
};

export const navigation = [
  { label: "Inicio", href: "" },
  { label: "Servicios", href: "servicios/" },
  { label: "Estética", href: "estetica/" },
  { label: "Nosotros", href: "nosotros/" },
  { label: "Contacto", href: "contacto/" }
];

export const serviceOptions = [
  "Consulta general",
  "Ultrasonografía",
  "Laboratorio clínico",
  "Estudios radiográficos",
  "Cirugía / evaluación prequirúrgica",
  "Especialidad",
  "Cartas o chip para viaje",
  "Servicios funerarios",
  "Baño",
  "Deslanado",
  "Corte de uñas",
  "Estilismo canino",
  "Colorimetría",
  "Otro"
];
