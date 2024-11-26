export interface ISecondaryVarients  {
    id: string;
    name: string;
    price: number;
    discountPercentage?: number;
    inventory: number
}

export interface IPrimaryVarients  {
    id: string;
    name: string;
    price: number;
    discountPercentage?: number;
    inventory: number;
    active: boolean;
    secondaryVariants: ISecondaryVarients[]
}

export interface IProduct  {
    id: string;
    title: string;
    price: number;
    discountPercentage?: number;
    inventory: string;
    active: boolean;
    leadTime: string;
    description: string;
    category: string;
    image: string;
    primaryVariantName: string;
    secondaryVariantName: string;
    primaryVariants: IPrimaryVarients[]
}