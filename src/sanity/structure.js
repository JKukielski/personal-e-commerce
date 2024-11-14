// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Personal E-commerce')
    .items([
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !['post', 'category', 'author'].includes(item.getId())
      ),
    ]);
