export type recipe = {
    _id: string
    name: string
    prepTime: string
    servings: number
    ingredients: string[]
    method: string[]
    notes: note[],
    authorName: string
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