export function handleQueryParams(queryParams) {
  let filters = "";

  for (let item in queryParams) {
    filters += item + "=" + queryParams[item] + "&";
  }

  return filters.slice(0, filters.length - 1);
}

export function isSellerMode(props) {
  return props.match.path.indexOf("/seller") >= 0;
}
