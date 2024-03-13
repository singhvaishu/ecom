// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO : we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // TODO : we will not hard-code server URL here
    // const response = await fetch(`http://localhost:8080/products?id=${id}`);
    const response = await fetch('http://localhost:8080/products/' + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // TODO : On server we will support multi values
  // Suppose filter is comming like  {"category":"smartphone"}
  // filter : {"category" : ["smartphone", "Laptops"]}
  // pagination : {_page:1, _limit:10}

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) => {
    // TODO : we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products?' + queryString);
    console.log("response", response);
    const data = await response.json();
    // console.log("this is data ---->", data.items)
    const products = data.data;
    const totalItems = data.items;
    resolve({ data: { products: products, totalItems: +totalItems } });
    console.log("products", products)
  });
}


export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories');
    // console.log("This response is categories ----->", response)
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    // const response2 = await fetch("http;//localhost:8080/brands");
    const response = await fetch('http://localhost:8080/brands');
    // console.log("This response is brands ----->", response)
    const data = await response.json();
    // console.log("This data is comes from API -", data);
    resolve({ data });
  });
}

export function fetchFilters() {
  return new Promise(async (resolve) => {
    // const response2 = await fetch("http;//localhost:8080/brands");
    const response = await fetch('http://localhost:8080/filters');
    // console.log("This response is brands ----->", response)
    const data = await response.json();
    // console.log("This data is comes from API -", data);
    resolve({ data });
  });
}