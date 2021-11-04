export type TItemWithIndex = TItem & {index: number;}

export type TItem = {
    calories: number;
    carbohydrates: number;
    count: number;
    customId: number;
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