export interface Pagination{
  currentPage : number;
  itemsPerPage : number;
  totalItems : number;
  totalPages : number;
}

// тут возвращаем класс ,result это items T , и сам интерфейс
export class PaginatedResult<T>{
  result : T;
  pagination : Pagination;
}
