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

variable "RELEASE_URL" {
    type=string
    default="https://github.com/sylvainSUPINTERNET/eph-store/archive/refs/tags/v1.0.0.tar.gz"
    description = "https://github.com/sylvainSUPINTERNET/eph-store/archive/refs/tags/v1.0.0.tar.gz"
}

