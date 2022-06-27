export const fetchData = async (url: string, options: Record<string, unknown>) => {
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json",
      ContentType:"application/json" },
      ...options,
    });

    const data = await response.json();
    // const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const parseQuery = (query) => {

    let object: any = {};
    			
    if (query.indexOf('?') != -1){

      query = query.split('?');		
      query = query[1];

    }

    let parseQuery = query.split("&");

    for (var i = 0; i < parseQuery.length; i++) {

        let pair = parseQuery[i].split('=');
        let key = decodeURIComponent(pair[0]);
        if (key.length == 0) continue;
        let value = decodeURIComponent(pair[1].replace("+"," "));

        if (object[key] == undefined) object[key] = value;
        else if (object[key] instanceof Array) object[key].push(value);
        else object[key] = [object[key],value];

    }

    return object;

};