export function dayName(dayNumber) {
  switch(dayNumber) {
    case 0:
      return "Domingo";
    case 1:
      return "Segunda-Feira";
    case 2:
      return "Terça-Feira";
    case 3:
      return "Quarta-Feira";
    case 4:
      return "Quinta-Feira";
    case 5:
      return "Sexta-Feira";
    case 6:
      return "Sábado";
  }
};

export function monthName(monthNumber, shortName) {
  switch(monthNumber) {
    case 0:
      return shortName ? "Janeiro" : "Jan";
    case 1:
      return shortName ? "Fevereiro" : "Fev";
    case 2:
      return shortName ? "Março" : "Mar";
    case 3:
      return shortName ? "Abril" : "Abr";
    case 4:
      return shortName ? "Maio" : "Mai";
    case 5:
      return shortName ? "Junho" : "Jun";
    case 6:
      return shortName ? "Julho" : "Jul";
    case 7:
      return shortName ? "Agosto" : "Ago";
    case 8:
      return shortName ? "Setembro" : "Set";
    case 9:
      return shortName ? "Outubro" : "Out";
    case 10:
      return shortName ? "Novembro" : "Nov";
    case 11:
      return shortName ? "Dezembro" : "Dez";
  }
};