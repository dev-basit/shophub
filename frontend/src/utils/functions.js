export function handleQueryParams(queryParams) {
  let filters = "";

  for (let item in queryParams) {
    filters += item + queryParams[item] + "&";
  }

  return filters;
}

export function isSellerMode(props) {
  return props.match.path.indexOf("/seller") >= 0;
}
