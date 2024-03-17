export function getQueryParams(query) {
  const queryParams = {};
  let queryParamsList = "";
  if (query) queryParamsList = query.split("&");

  for (let i = 0; i < queryParamsList.length; i++) {
    let pair = queryParamsList[i].split("=");
    queryParams[pair[0]] = pair[1];
  }

  return queryParams;
}

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
