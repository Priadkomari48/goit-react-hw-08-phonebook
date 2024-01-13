//keeps only the fields we need. No "serializable" check (but these fields should be okay)
export function filterAxiosError(rawAxiosError) {
  if (rawAxiosError.name === "AxiosError") {
    //console.log(rawAxiosError)
    const { name, code, message } = rawAxiosError;
    const serializedError = {name, code, message};
    //status, statusText, data
    if (rawAxiosError.response) {
      serializedError.status = rawAxiosError.response.status;
      serializedError.statusText = rawAxiosError.response.statusText;
      serializedError.data = rawAxiosError.response.data;
    }
    return serializedError;
  }
  else {
    return rawAxiosError;
  }
}

export function serializeAxiosData(rawData, level = 1, maxLevel = 3) {
  //let's try to strip anything that isn't serializable, naive approach
  //inspired by miniSerializeError from redux-toolkit

  if (typeof rawData === 'object' && rawData !== null) {
    //this magic is required because typeof (null) is Object. Did I say I *love* JS?
    if (level > maxLevel) {
      return null;
      //drop if max recursion level reached
    }

    const flatData = {};
    const rawKeys = Object.keys(rawData);
    for (const key of rawKeys) {
      if (["string", "number", "bool"].includes(typeof rawData[key])) {
        flatData[key] = rawData[key];
      }
      else if (typeof rawData[key] === "object" && rawData[key] !== null) {
        flatData[key] = serializeAxiosData(rawData[key], level + 1, maxLevel);
      }
    }

    return flatData;
  }

  return null;
}