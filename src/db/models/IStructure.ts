export interface IStructure {
    brandName?: string
    pageTitle1?: string
    pageTitle1Quote?: string
    pageMainPics?: string[]
    pageContent1?: string
    pageTitle2?: string
    pageTitle2Quote?: string
    pageContent2?: string
    productName?:string
    productPrice?:number
    productPromoPercent?:number
    points: [
        {
            title: string
            content: string
        }
    ]
}