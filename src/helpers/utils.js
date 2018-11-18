module.exports = {
  
  paginator : function (items, pageNo, perPageNo) {
                var page = pageNo || 1;
                let per_page = perPageNo || 10;
                let offset = (page - 1) * per_page;
              
                let paginatedItems = items.slice(offset).slice(0, per_page);
                let total_pages = Math.ceil(items.length / per_page);
                return {
                  page: page,
                  per_page: per_page,
                  pre_page: page - 1 ? page - 1 : null,
                  next_page: (total_pages > page) ? parseInt(page) + 1 : null,
                  total: items.length,
                  total_pages: total_pages,
                  data: paginatedItems
                };
  }
}