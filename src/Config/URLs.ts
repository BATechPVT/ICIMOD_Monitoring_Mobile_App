export const BASE_URL = "http://182.180.86.76:9001/";

export const LOGIN = BASE_URL + "api/Account/login";

export const GET_LIST = BASE_URL + "api/Monitoring/GetDetailsList";

export const GET_DIVISIONS = BASE_URL + "api/Monitoring/GetDivisionList";

export const GET_DISTRICTS = (Id: string) =>
  BASE_URL + "api/Monitoring/GetDistrictList/" + Id;

export const GET_TEHSIL = (Id: string) =>
  BASE_URL + "api/Monitoring/getTehsilsList/" + Id;

export const GET_SITE_LIST = (Id: string) =>
  BASE_URL + "api/Monitoring/GetSitesList/" + Id;
export const GET_PLANT_SPECIES = BASE_URL + "api/Monitoring/GetSpecies";

export const GET_INTERVENTIONS = BASE_URL + "api/Monitoring/GetInterventions";

export const GET_PROTECTION_LIST =
  BASE_URL + "api/Monitoring/GetProtectionMechanismList";

export const GET_IRRIGATION_LIST =
  BASE_URL + "api/Monitoring/GetIrrigationList";

export const SAVE_MONITORING = BASE_URL + "api/Monitoring/Save";
