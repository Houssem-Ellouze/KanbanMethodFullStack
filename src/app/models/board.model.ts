import { Column } from './column.models';

export class Board {
  name: string;
  columns: Column[];

  constructor(name: string, columns: Column[]) {
    this.name = name;
    this.columns = columns;
  }
}
