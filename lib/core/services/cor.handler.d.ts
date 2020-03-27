export declare abstract class CORHandler<T> {
    next: CORHandler<T> | null;
    props: {
        [key: string]: any;
    };
    request(data: T | null): any;
    abstract canHandle(data: T | null): boolean;
    abstract transform(data: T | null): any;
}
