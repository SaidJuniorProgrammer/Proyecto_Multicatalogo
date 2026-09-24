export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  img: string;
  galeria: string[];
}

export const productosMock: Producto[] = [
  {
    id: 1,
    nombre: "Serum Revitalizante",
    descripcion:
      "Serum concentrado con vitamina C y ácido hialurónico para iluminar y hidratar la piel desde la primera aplicación.",
    precio: 45,
    categoria: "Serum",
    img: "https://picsum.photos/seed/serum/900",
    galeria: [
      "https://picsum.photos/seed/serum1/900",
      "https://picsum.photos/seed/serum2/900",
      "https://picsum.photos/seed/serum3/900",
    ],
  },
  {
    id: 2,
    nombre: "Crema Hidratante Pro",
    descripcion:
      "Crema ligera con niacinamida y manteca de karité para una hidratación de 24 horas y una barrera protegida.",
    precio: 32.5,
    categoria: "Crema",
    img: "https://picsum.photos/seed/crema/900",
    galeria: [
      "https://picsum.photos/seed/crema1/900",
      "https://picsum.photos/seed/crema2/900",
      "https://picsum.photos/seed/crema3/900",
    ],
  },
  {
    id: 3,
    nombre: "Tónico Purificante",
    descripcion:
      "Tónico sin alcohol con hamamelis y agua de rosas para equilibrar el pH y preparar la piel para el resto de la rutina.",
    precio: 28,
    categoria: "Tónico",
    img: "https://picsum.photos/seed/tonico/900",
    galeria: [
      "https://picsum.photos/seed/tonico1/900",
      "https://picsum.photos/seed/tonico2/900",
      "https://picsum.photos/seed/tonico3/900",
    ],
  },
  {
    id: 4,
    nombre: "Mascarilla Nocturna",
    descripcion:
      "Mascarilla con colágeno y vitamina E para reparar y devolver luminosidad mientras duermes.",
    precio: 50,
    categoria: "Mascarilla",
    img: "https://picsum.photos/seed/mascarilla/900",
    galeria: [
      "https://picsum.photos/seed/mascarilla1/900",
      "https://picsum.photos/seed/mascarilla2/900",
      "https://picsum.photos/seed/mascarilla3/900",
    ],
  },
  {
    id: 5,
    nombre: "Serum Anti-Edad Retinol",
    descripcion:
      "Retinol encapsulado para suavizar líneas y mejorar la firmeza con un uso nocturno recomendado.",
    precio: 58,
    categoria: "Serum",
    img: "https://picsum.photos/seed/retinol/900",
    galeria: [
      "https://picsum.photos/seed/retinol1/900",
      "https://picsum.photos/seed/retinol2/900",
      "https://picsum.photos/seed/retinol3/900",
    ],
  },
  {
    id: 6,
    nombre: "Kit de Inicio Facial",
    descripcion:
      "Kit completo con limpieza, hidratación y protección para una rutina facial básica y efectiva.",
    precio: 74,
    categoria: "Kit",
    img: "https://picsum.photos/seed/kit/900",
    galeria: [
      "https://picsum.photos/seed/kit1/900",
      "https://picsum.photos/seed/kit2/900",
      "https://picsum.photos/seed/kit3/900",
    ],
  },
];

export const categorias = ["Todas", ...new Set(productosMock.map((producto) => producto.categoria))];
