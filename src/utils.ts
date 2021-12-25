export function makeImagePath(id: any, format?: string) {
  if (id === null)
    return "https://nanati.me/wp-content/themes/lionmedia/img/ximg_no.gif.pagespeed.ic.79sXjLKYSZ.webp";

  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
