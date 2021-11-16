variable "app_name" {
    type=string
    description = "Name of app"
}

variable "API" {
    type=string
    description = "eph store API url"
}

variable "PAYPAL_CLIENTID" {
    type=string
    description = "Paypal clientID"
}

variable "STORE_NAME" { 
    type=string
    description = "Store name ( use in app )"
}

variable "GIT_SOURCE" {
    type=string
    default="https://github.com/sylvainSUPINTERNET/eph-store.git"
    description = "https://github.com/sylvainSUPINTERNET/eph-store.git"
}