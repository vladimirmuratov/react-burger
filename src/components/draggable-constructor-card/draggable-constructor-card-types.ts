
export type TProps = {
    item: TItem;
    index: number;
    customId: number;
    moveCard: (t: number, u: number) => void;
    deleteHandler: (t: string) => void;
}

export type TItem = {
    index: number;
    calories: number;
    carbohydrates: number;
    count: number;
    customId: any;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
}
