export type TItemWithIndex = TItem & { index: number; }

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

export interface IMessage {
    success: boolean;
    orders: [
        {
            ingredients: Array<string>;
            _id: string;
            status: string;
            number: number;
            createdAt: string;
            updatedAt: string;
        }
    ];
    total: number;
    totalToday: number;
}