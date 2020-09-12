export type recipe = {
    _id: string
    name: string
    prepTime: string
    servings: string
    ingredients: string[]
    method: string[]
    notes: note[],
    authorName: string
    isPublic: boolean
    createdAt?: string
    updatedAt?: string
}

export type user = {
    name: String
    photoUrl: String
    email: String
}

export type note = {
    title: string
    body: string
    id: string
}