export interface ISecondaryVarients  {
    name: string;
    price: number;
    discountPercentage?: number;
    inventory: number
}

export interface IPrimaryVarients  {
    name: string;
    price: number;
    discountPercentage?: number;
    inventory: number;
    active: boolean;
    secondaryVariants: ISecondaryVarients[]
}

export interface IProduct  {
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