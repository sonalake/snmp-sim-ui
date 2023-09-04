export function sortObjectBy<T extends object>(a: T, b: T, property: keyof T, sortOrder: string) {
  const valA = a[property];
  const valB = b[property];
  const order = sortOrder !== 'DESC' ? 1 : -1;

  switch (typeof valA) {
    case 'number': {
      return (valA - (valB as number)) * order;
    }
    case 'string': {
      return (valA as string).localeCompare(valB as string) * order;
    }
    default:
      return 0;
  }
}
