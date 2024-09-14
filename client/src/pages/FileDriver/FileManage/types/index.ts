import { TypeFile } from "src/utils/type"

export type GetAllFile = {
    createAt: Date
    id: string
    updateAt: Date
    note: string | null
    name: string
    currentPath: string
    path: string
    type: TypeFile
    typeFile: string
    url: string
    size: string
}