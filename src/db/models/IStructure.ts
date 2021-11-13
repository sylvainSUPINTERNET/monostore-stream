export interface IStructure {
    brandName?: string
    pageTitle1?: string
    mainDescription?: string
    globalDescAndCheckout?: string
    pageTitle1Quote?: string
    pageMainPics?: string[]
    pageContent1?: string
    pageTitle2?: string
    pageTitle2Quote?: string
    pageContent2?: string
    productName?:string
    productPrice?:number
    stockLimit?: number
    productPromoPercent?:number
    shippingFare?: number
    checkoutDescription?: string
    points?: [
        {
            title: string
            content: string
        }
    ]
}