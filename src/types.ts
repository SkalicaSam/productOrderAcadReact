export interface Author {
    id: number
    name: string
}

export interface Book {
    id: number
    title: string
    description: string
    authorId: number
}

export interface Product {
    id: number
    name: string
    description: string
    amount: number
    price: number
    
}
