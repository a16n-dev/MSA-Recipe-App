import { recipe } from "../types";

export const sortByName = (arr : recipe[]) => {
    const copy: recipe[] = arr.slice()

    return copy.sort((a: recipe,b: recipe) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;

        return 0
    })
}

export const sortByModified = (arr : recipe[]) => {
    const copy: recipe[] = arr.slice()
    
    return copy.sort((a: recipe,b: recipe) => {
        
        if(a.updatedAt && b.updatedAt){
            if (a.updatedAt < b.updatedAt) return 1;
            if (b.updatedAt < a.updatedAt) return -1;
        }
        return 0
    })
}

export const sortByCreated = (arr : recipe[]) => {
    const copy: recipe[] = arr.slice()
    
    return copy.sort((a: recipe,b: recipe) => {
        
        if(a.createdAt && b.createdAt){
            if (a.createdAt < b.createdAt) return 1;
            if (b.createdAt < a.createdAt) return -1;
        }
        return 0
    })
}