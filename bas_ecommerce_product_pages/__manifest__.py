# -*- coding: utf-8 -*-
#################################################################################
# Author      : BAS
#################################################################################
{
  "name"                 :  "E-commerce: Product Pages",
  "summary"              :  """All customizations to e-commerce product pages""",
  "category"             :  "Website",
  "version"              :  "3.0",
  "author"               :  "BAS",
  "description"          :  """Odoo Website: E-commerce Pages""",
  "depends"              :  ['sale_management','website_sale'],
  "data"                 :  [
                             'views/product.xml'
                            ],
  "application"          :  False,
  "installable"          :  True,
  "auto_install"         :  False,
}
