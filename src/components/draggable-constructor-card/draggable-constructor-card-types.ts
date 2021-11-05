import {TItem} from "../../types";

export type TProps = {
    item: TItem;
    index: number;
    customId: number;
    moveCard: (t: number, u: number) => void;
    deleteHandler: (id: number) => void;
}