export default class ApiHeaders {
  constructor() {
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    this.customKeys = {
      Accept: 'Accept',
      'Content-Type': 'Content-Type',
    };
  }

  __normalizedName(name) {
    const lowerCase = name.toLowerCase();

    if (this.customKeys[lowerCase]) {
      return this.customKeys[lowerCase];
    }

    this.customKeys[lowerCase] = name;
    return name;
  }

  get accept() {
    return this.headers.Accept;
  }

  set accept(value) {
    this.headers.Accept = value;
  }

  get contentType() {
    return this.headers['Content-Type'];
  }

  set contentType(value) {
    this.headers['Content-Type'] = value;
  }

  get(name) {
    return this.headers[this.__normalizedName(name)];
  }

  set(name, value) {
    this.headers[this.__normalizedName(name)] = value;
  }

  toDictionary() {
    return this.headers;
  }
}
