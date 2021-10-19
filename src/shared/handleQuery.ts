import { FilterType, QueryType } from "./types"

export const updateQuery = (filter: FilterType) => {
  let query: QueryType = {};

  if (filter.currentPage > 1) {
    query.currentPage = filter.currentPage;
  }
  if (!!filter.term) {
    query.term = filter.term
  }
  return query;
}

export const getQueryParams = (filter: FilterType, parsed: QueryType) => {
  let actualFilter = filter;

  if (!!parsed.currentPage && parsed.currentPage > 1) {
    actualFilter = { ...actualFilter, currentPage: Number(parsed.currentPage) };
  }
  if (!!parsed.term) {
    actualFilter = { ...actualFilter, term: parsed.term };
  }

  return actualFilter;
}