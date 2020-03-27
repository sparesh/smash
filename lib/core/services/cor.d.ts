import { Container } from "inversify";
import { CORHandler } from ".";
export declare class CORBuilder<T> {
    private container;
    private head;
    constructor(container: Container);
    add<TFunction extends Function>(handler: TFunction): CORBuilder<T>;
    props(props: {
        [key: string]: any;
    }): this;
    build(): CORHandler<T>;
}
