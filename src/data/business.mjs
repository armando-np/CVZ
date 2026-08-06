const image = (src, width, height, alt, srcset = [], extra = {}) => ({
  src,
  width,
  height,
  alt,
  srcset,
  ...extra
});

const media = {
  banner: image(
    "assets/images/banner-veterinaria-1200.webp",
    1200,
    1600,
    "Cachorro atendido en Centro Veterinario Zaragoza",
    [
      { src: "assets/images/banner-veterinaria-720.webp", width: 720 },
      { src: "assets/images/banner-veterinaria-1200.webp", width: 1200 }
    ]
  ),
  surgery: image(
    "assets/images/cirugia-veterinaria-1200.webp",
    1200,
    1600,
    "Equipo veterinario durante un procedimiento quirúrgico",
    [
      { src: "assets/images/cirugia-veterinaria-720.webp", width: 720 },
      { src: "assets/images/cirugia-veterinaria-1200.webp", width: 1200 }
    ]
  ),
  paulina: image(
    "assets/images/mvz-paulina-1200.webp",
    1200,
    1041,
    "MVZ. Paulina E. Ortiz Rivera sosteniendo a un paciente canino",
    [
      { src: "assets/images/mvz-paulina-800.webp", width: 800 },
      { src: "assets/images/mvz-paulina-1200.webp", width: 1200 }
    ],
    {
      avatar: image("assets/images/mvz-paulina-avatar.webp", 400, 400, "")
    }
  ),
  jimena: image(
    "assets/images/mvz-jimena-nunez-900.webp",
    900,
    1200,
    "MVZ. Jimena Núñez Pacheco sosteniendo a una paciente canina",
    [
      { src: "assets/images/mvz-jimena-nunez-480.webp", width: 480 },
      { src: "assets/images/mvz-jimena-nunez-900.webp", width: 900 }
    ],
    {
      avatar: image("assets/images/mvz-jimena-nunez-avatar.webp", 400, 400, "")
    }
  ),
  paulinaProcedure: image(
    "assets/images/paulina-procedimiento-gato-1200.webp",
    1200,
    675,
    "Médica veterinaria con un paciente felino durante un procedimiento",
    [
      { src: "assets/images/paulina-procedimiento-gato-800.webp", width: 800 },
      { src: "assets/images/paulina-procedimiento-gato-1200.webp", width: 1200 }
    ]
  ),
  ultrasoundConsult: image(
    "assets/images/ultrasonido-consulta-960.webp",
    960,
    1280,
    "Estudio de ultrasonido veterinario durante una consulta",
    [
      { src: "assets/images/ultrasonido-consulta-480.webp", width: 480 },
      { src: "assets/images/ultrasonido-consulta-960.webp", width: 960 }
    ]
  ),
  ultrasoundPatient: image(
    "assets/images/ultrasonido-diagnostico-900.webp",
    900,
    1600,
    "Paciente canino junto a equipo de ultrasonografía veterinaria",
    [
      { src: "assets/images/ultrasonido-diagnostico-480.webp", width: 480 },
      { src: "assets/images/ultrasonido-diagnostico-900.webp", width: 900 }
    ]
  ),
  laboratory: image(
    "assets/images/laboratorio-clinico-1200.webp",
    1200,
    1587,
    "Paciente canino durante una evaluación de laboratorio clínico veterinario",
    [
      { src: "assets/images/laboratorio-clinico-480.webp", width: 480 },
      { src: "assets/images/laboratorio-clinico-1200.webp", width: 1200 }
    ]
  ),
  passport: image(
    "assets/images/pasaporte-animal-1200.webp",
    1200,
    684,
    "Gato acompañado de carnet y documentación veterinaria para viaje",
    [
      { src: "assets/images/pasaporte-animal-480.webp", width: 480 },
      { src: "assets/images/pasaporte-animal-1200.webp", width: 1200 }
    ]
  ),
  xrays: [
    image(
      "assets/images/rayos-x-torax-ap-830.webp",
      830,
      1600,
      "Estudio radiográfico veterinario en proyección frontal",
      [
        { src: "assets/images/rayos-x-torax-ap-480.webp", width: 480 },
        { src: "assets/images/rayos-x-torax-ap-830.webp", width: 830 }
      ]
    ),
    image(
      "assets/images/rayos-x-torax-lateral-1200.webp",
      1200,
      762,
      "Estudio radiográfico veterinario en proyección lateral",
      [
        { src: "assets/images/rayos-x-torax-lateral-480.webp", width: 480 },
        { src: "assets/images/rayos-x-torax-lateral-1200.webp", width: 1200 }
      ]
    ),
    image(
      "assets/images/rayos-x-cadera-1200.webp",
      1200,
      1330,
      "Estudio radiográfico veterinario de pelvis y extremidades posteriores",
      [
        { src: "assets/images/rayos-x-cadera-480.webp", width: 480 },
        { src: "assets/images/rayos-x-cadera-1200.webp", width: 1200 }
      ]
    )
  ],
  grooming: [
    image(
      "assets/images/spa-poodle-rosa-1200.webp",
      1200,
      1253,
      "Poodle después de un servicio de estética con orejas en color rosa",
      [
        { src: "assets/images/spa-poodle-rosa-480.webp", width: 480 },
        { src: "assets/images/spa-poodle-rosa-1200.webp", width: 1200 }
      ]
    ),
    image(
      "assets/images/spa-antes-despues-blanco-1200.webp",
      1200,
      1161,
      "Antes y después de un servicio de estética en un perro de pelo blanco",
      [
        { src: "assets/images/spa-antes-despues-blanco-480.webp", width: 480 },
        { src: "assets/images/spa-antes-despues-blanco-1200.webp", width: 1200 }
      ]
    ),
    image(
      "assets/images/spa-antes-despues-gris-1200.webp",
      1200,
      1150,
      "Antes y después de un servicio de estética en un perro de pelo gris",
      [
        { src: "assets/images/spa-antes-despues-gris-480.webp", width: 480 },
        { src: "assets/images/spa-antes-despues-gris-1200.webp", width: 1200 }
      ]
    ),
    image(
      "assets/images/spa-pomerania-antes-despues-1200.webp",
      1200,
      1058,
      "Antes y después de un servicio de estética en un perro Pomerania",
      [
        { src: "assets/images/spa-pomerania-antes-despues-480.webp", width: 480 },
        { src: "assets/images/spa-pomerania-antes-despues-1200.webp", width: 1200 }
      ]
    )
  ]
};

export const business = {
  media,
  name: "Centro Veterinario Zaragoza",
  legalDisplayName: "CENTRO VETERINARIO ZARAGOZA",
  slogan: "Tu mascota, nuestra pasión",
  description:
    "Dedicados y comprometidos con la salud de tu mascota. Previene, cuida y protege a quienes más amas.",
  shortDescription:
    "Atención veterinaria, diagnóstico, cirugía, farmacia, estética animal y apoyo para viajes en Venustiano Carranza, CDMX.",
  owners: [
    {
      name: "MVZ. Paulina E. Ortiz Rivera",
      initials: "PO",
      role: "Médica Veterinaria Zootecnista",
      photo: media.paulina
    },
    {
      name: "MVZ. Jimena Núñez Pacheco",
      initials: "JN",
      role: "Médica Veterinaria Zootecnista",
      photo: media.jimena
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
      text: "Salud, diagnóstico, farmacia, belleza y apoyo para viajes en un mismo centro."
    }
  ],
  contact: {
    phoneDisplay: "55 6815 7821",
    phoneE164: "+525568157821",
    whatsappNumber: "525568157821",
    email: "",
    instagram: "https://www.instagram.com/centro_veterinario_zaragoza/",
    addressLine: "C. 33 161",
    neighborhood: "Ignacio Zaragoza",
    borough: "Venustiano Carranza",
    city: "Ciudad de México",
    region: "CDMX",
    postalCode: "15000",
    countryCode: "MX",
    fullAddress:
      "C. 33 161, Ignacio Zaragoza, Venustiano Carranza, C.P. 15000, Ciudad de México, CDMX",
    mapSharedUrl: "https://share.google/nFRBrkXE8wR9b98kZ",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=C.%2033%20161%2C%20Ignacio%20Zaragoza%2C%20Venustiano%20Carranza%2C%2015000%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX",
    mapSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Centro%20Veterinario%20Zaragoza%2C%20C.%2033%20161%2C%20Ignacio%20Zaragoza%2C%20Venustiano%20Carranza%2C%2015000%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX",
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
        id: "cardiologia",
        title: "Especialidad cardiológica",
        short: "Atención especializada disponible con cita previa coordinada por WhatsApp.",
        icon: "cardiology",
        image: media.ultrasoundConsult
      },
      {
        id: "ultrasonografia",
        title: "Ultrasonografía",
        short: "Estudio de imagen disponible con cita para apoyar la valoración clínica.",
        icon: "ultrasound",
        image: media.ultrasoundPatient
      },
      {
        id: "laboratorio-clinico",
        title: "Laboratorio clínico",
        short: "Apoyo diagnóstico mediante estudios de laboratorio indicados en consulta.",
        icon: "lab",
        image: media.laboratory
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
        icon: "surgery",
        image: media.surgery
      },
      {
        id: "farmacia-veterinaria",
        title: "Farmacia veterinaria",
        short: "Solicita tu pedido, comparte tu receta veterinaria y recibe una cotización por WhatsApp.",
        icon: "pharmacy"
      },
      {
        id: "microchip-viajes",
        title: "Microchip y documentación de viaje",
        short: "Aplicación de microchip sin cita, lectura, carnet o pasaporte veterinario y orientación documental.",
        icon: "travel",
        image: media.passport
      },
      {
        id: "servicios-funerarios",
        title: "Servicios funerarios",
        short: "Acompañamiento y orientación para despedir a tu mascota con respeto.",
        icon: "heart"
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
  travel: {
    title: "Identificación segura para viajar a tu lado",
    services: [
      {
        title: "Aplicación de microchip sin previa cita",
        text: "Identificación individual mediante microchip. Puedes acudir dentro del horario de clínica; conviene confirmar disponibilidad por WhatsApp antes de trasladarte.",
        icon: "chip"
      },
      {
        title: "Lectura compatible con ISO 11784/11785",
        text: "Comprobamos el número del microchip con lector compatible y te orientamos sobre el registro de la identificación.",
        icon: "scanner"
      },
      {
        title: "Carnet o pasaporte veterinario",
        text: "Entrega y actualización de documentación clínica para concentrar identificación, vacunación y datos relevantes del paciente.",
        icon: "passport"
      },
      {
        title: "Cartas nacionales e internacionales",
        text: "Preparamos la documentación clínica que corresponda y revisamos contigo los requisitos informados por el destino o transportista.",
        icon: "document"
      }
    ],
    disclaimer:
      "El microchip, el carnet o pasaporte veterinario y las cartas clínicas no sustituyen certificados zoosanitarios, permisos ni requisitos oficiales. Las condiciones cambian según destino, autoridad y medio de transporte; deben confirmarse antes de viajar."
  },
  pharmacy: {
    title: "Farmacia veterinaria",
    text: "Solicita tu pedido por WhatsApp. Comparte una fotografía legible de tu receta veterinaria y te enviamos disponibilidad y cotización.",
    notes: [
      "Surtido sujeto a existencia.",
      "Los medicamentos que requieren receta se entregan únicamente con indicación veterinaria válida.",
      "La cotización no sustituye una consulta ni una prescripción."
    ]
  },
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
      question: "¿La especialidad cardiológica requiere cita?",
      answer:
        "Sí. La disponibilidad de la especialidad cardiológica se coordina previamente por WhatsApp."
    },
    {
      question: "¿Necesito cita para la aplicación de microchip?",
      answer:
        "La aplicación de microchip se ofrece sin previa cita dentro del horario de clínica. Recomendamos confirmar disponibilidad por WhatsApp antes de acudir."
    },
    {
      question: "¿El pasaporte veterinario garantiza el ingreso a cualquier país?",
      answer:
        "No. Cada destino, autoridad y transportista puede solicitar requisitos adicionales. El centro brinda documentación clínica y orientación, pero deben confirmarse las condiciones oficiales antes de viajar."
    },
    {
      question: "¿Cómo solicito un producto de farmacia?",
      answer:
        "Escríbenos por WhatsApp, indica el producto y comparte tu receta veterinaria cuando corresponda. Te enviaremos disponibilidad y cotización."
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
        "En C. 33 161, colonia Ignacio Zaragoza, alcaldía Venustiano Carranza, C.P. 15000, Ciudad de México."
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
  { label: "Viajes", href: "microchip-y-viajes/" },
  { label: "Nosotros", href: "nosotros/" },
  { label: "Contacto", href: "contacto/" }
];

export const serviceOptions = [
  "Consulta general",
  "Especialidad cardiológica",
  "Ultrasonografía",
  "Laboratorio clínico",
  "Estudios radiográficos",
  "Cirugía / evaluación prequirúrgica",
  "Aplicación o lectura de microchip",
  "Carnet, pasaporte o carta para viaje",
  "Farmacia veterinaria / cotización",
  "Servicios funerarios",
  "Baño",
  "Deslanado",
  "Corte de uñas",
  "Estilismo canino",
  "Colorimetría",
  "Otro"
];
