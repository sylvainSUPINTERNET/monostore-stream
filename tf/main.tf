terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 4.0"
    }
  }
}

resource "heroku_app" "new_store" {
  region = "eu"
  name = var.app_name

  buildpacks = ["heroku/nodejs"]

  config_vars = {
    API = var.API
    PAYPAL_CLIENTID = var.PAYPAL_CLIENTID
    STORE_NAME = var.STORE_NAME
  }

}

resource "heroku_build" "new_store" {
  app = heroku_app.new_store.id

  source {
    url = var.RELEASE_URL
  }
}

# resource "heroku_formation" "new_store" {
#   app        = heroku_app.new_store.id
#   type       = "web"
#   quantity   = 1
#   size       = "Standard-1x"
#   depends_on = [heroku_app.new_store]
# }


output "new_store_url" {
  value = "https://${heroku_app.new_store.name}.herokuapp.com"
}