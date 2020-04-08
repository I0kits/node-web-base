import Pageable from 'express-paginate';

const paging = Pageable.middleware(10, 50);

export default {
  paging,
}
