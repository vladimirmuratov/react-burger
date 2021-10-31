import { Location } from 'history'

export interface ILocationState extends Location {
    background?: Location<unknown>;
}