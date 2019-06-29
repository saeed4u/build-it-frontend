import AuthRepo from "./authRepo";
import PlantRepo from "./plantRepo";
import SupplierRepo from "./supplierRepo";
import ConstructionSiteRepo from "./constructionSiteRepo";
import Login from './authRepo'
import InvoiceRepo  from './invoiceRepo'

const repositories = {
  login: AuthRepo,
  inv : PlantRepo,
  supplier: SupplierRepo,
  cons: ConstructionSiteRepo,
  auth: Login,
  invoice: InvoiceRepo
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
