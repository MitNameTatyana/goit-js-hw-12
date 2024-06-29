export function createGalleryMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
  </a>
  <ul class="list-img">
    <li class="item-img">
      <span class="label">Likes</span>
      <span class="value">${likes}</span>
    </li>
    <li class="item-img">
      <span class="label">Views</span>
      <span class="value">${views}</span>
    </li>
    <li class="item-img">
      <span class="label">Comments</span>
      <span class="value">${comments}</span>
    </li>
    <li class="item-img">
      <span class="label">Downloads</span>
      <span class="value">${downloads}</span>
    </li>
  </ul>
</li>`;
      }
    )
    .join('');
}
