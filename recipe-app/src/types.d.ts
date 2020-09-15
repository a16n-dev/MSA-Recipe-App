export type recipe = {
    _id: string
    name: string
    prepTime: string
    servings: string
    ingredients: string[]
    method: string[]
    notes: note[],
    authorName: string
    user?: string
    isPublic: boolean
    createdAt?: string
    updatedAt?: string
}

export type user = {
    name: string
    profileUrl: string
    email: string
}

export type note = {
    title: string
    body: string
    id: string
}