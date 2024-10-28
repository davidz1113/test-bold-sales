import { FrecuencyDate } from '../../core/models/sale.state';

export const calculateFrecuencyLabel = (
  frecuencyDate: FrecuencyDate
): string => {
  const date = new Date();
  switch (frecuencyDate) {
    case FrecuencyDate.TODAY:
      return formatDateToLongString(date);
    case FrecuencyDate.WEEKLY:
      return getWeekDatesLabel(date);
    case FrecuencyDate.MONTHLY:
      return getMonthDatesLabel(date);
  }
};

const getWeekDatesLabel = (date: Date): string => {
  const { startDate, endDate } = getWeekDates(date);
  return `${formatDateToLongString(
    new Date(startDate)
  )} - ${formatDateToLongString(new Date(endDate))}`;
};

const getMonthDatesLabel = (date: Date): string => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return `${formatDateToLongString(startDate)} - ${formatDateToLongString(
    endDate
  )}`;
};

const formatDateToLongString = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('es-ES', options).format(date);
};

export const getWeekDates = (date: Date) => {
  const dayOfWeek = date.getDay(); // 0 (Domingo) a 6 (Sábado)
  const startDate = normalizeDate(new Date(date));

  if (dayOfWeek === 0) {
    startDate.setDate(date.getDate() - dayOfWeek - 6); // Moverse al Lunes de la semana pasada
  } else {
    startDate.setDate(date.getDate() - dayOfWeek + 1); // Moverse al Lunes de la semana actual
  }

  const endDate = normalizeDate(new Date(startDate));
  endDate.setDate(startDate.getDate() + 6); // Moverse al domingo de la semana actual

  return {
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
  };
};

export const normalizeDate = (date: Date) => {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
};