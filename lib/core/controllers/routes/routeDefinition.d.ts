import { MethodKeys } from "../routes";
export interface RouteDefinition {
    name: string;
    path: string | undefined;
    method: MethodKeys;
    middlewares: Array<Function>;
}
