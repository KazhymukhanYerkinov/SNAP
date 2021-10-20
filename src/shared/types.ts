export type UserType = {
  id: number;
  email: string;
  name: string;
  surname: string;
  middlename: string;
  password: string;
  role: Array<{id: number, name: string}>;
  phone: string;
  numberMedBook: number;
  dataMedBook: string;
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