export abstract class CORHandler<T> {
  next: CORHandler<T> | null = null;
  props: { [key: string]: any } = {};

  request(data: T | null): any {
    if (this.canHandle(data)) {
      return this.transform(data);
    } else if (this.next !== null) {
      this.next.request(data);
    } else {
      return undefined;
    }
  }

  abstract canHandle(data: T | null): boolean;
  abstract transform(data: T | null): any;
}
