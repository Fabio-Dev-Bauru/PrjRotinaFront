export class ObjetoQuantidade<T> {

  constructor() {
      this.Quantidade = 0;
      this.Lista = [];
  }

  Quantidade: number;
  Lista: T[];
}
