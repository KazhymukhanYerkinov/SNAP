export type UserType = {
  id: number;
  placeWork: string;
  email: string;
  name: string;
  surname: string;
  middlename: string;
  password: string;
  role: Array<{id: number, name: string}>;
  phone: string;
  medBook: string;
  numberMedBook: string;
  dateMedBook: string;
}

export type UserDisplayType = {
  id: number,
  name: string,
  surname: string,
  middlename: string,
  role: string,
  phone: string,
  access: string,
  position: string,
  edit: JSX.Element,
  delete: JSX.Element,
}

export type FilterType = {
  currentPage: number,
  totalCount: number,
  term: string,
}

export type QueryType = {
  currentPage?: number,
  totalCount?: number,
  term?: string,
}