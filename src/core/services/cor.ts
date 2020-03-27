import { Container } from "inversify";
import { CORHandler } from ".";

export class CORBuilder<T> {
  private head: CORHandler<T> | null = null;

  constructor(private container: Container) {}

  add<TFunction extends Function>(handler: TFunction): CORBuilder<T> {
    const handlerInstance = this.container.get(handler);
    if (this.head === null) {
      this.head = handlerInstance;
    } else {
      let ptr = this.head;

      while (ptr.next !== null) {
        ptr = ptr.next;
      }

      ptr.next = handlerInstance;
    }

    return this;
  }

  props(props: { [key: string]: any }) {
    for (let ptr = this.head; ptr !== null; ptr = ptr.next) {
      ptr.props = props;
    }

    return this;
  }

  build(): CORHandler<T> {
    if (this.head !== null) {
      return this.head;
    } else {
      throw new Error("cannot build COR with zero handlers attached");
    }
  }
}
