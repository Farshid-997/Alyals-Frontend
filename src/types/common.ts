export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export interface IService {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface Name {
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface IProduct {
  id: string;
  image: string | undefined;
  name: string | number;
  price: string | number;
  productstate: string;
}
