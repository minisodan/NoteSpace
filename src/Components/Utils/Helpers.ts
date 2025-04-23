/**
 * logs the input, then returns the element.
 * @param element 
 * @returns the element
 */
export function log(element: any): any {
  return (console.log(element), element)
}
/**
 * sets the value on a given key for the object, then returns the object.
 * this can be useful in non-imperative scenarios where the key may be dynamic and not known at compile time.
 * 
 * @param obj 
 * @param key 
 * @param value 
 * @param createNewObject
 * @returns the obj
 */
export function setObjectKeyValue(obj: any, key: string, value: any): any {
  const tempObj = {...obj}
  tempObj[key] = value
  return tempObj
}

/**
 * 
 * deletes the key/value pair on an object, then returns the object
 * this can be useful in non-imperative scenarios where the key may be dynamic and not known at compile time.
 * 
 * @param obj 
 * @param key 
 * @param createNewObject 
 * @returns 
 */
export function deleteObjectKeyValue(obj: any, key: string): any {
  const tempObj = {...obj}
  delete tempObj[key]
  return tempObj
}

/**
 * 
 * allows for a safe object access call, even if the object is undefined.
 * 
 * @param obj 
 * @param key 
 * @returns the result of the object access, or undefined.
 */
export function safeObjectAccess(obj: any, key: string): any {
  return !!obj ? obj[key] : obj
}