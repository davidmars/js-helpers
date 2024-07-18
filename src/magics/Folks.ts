export class Folks {
  props: any = {};

  /**
   * If the property is not yet declared, returns false and declares the property with the provided value
   * @param propName
   * @param valueToSet
   */
  getAndSetItem(propName: string, valueToSet: any) {
    if (this.getItem(propName)) {
      return this.getItem(propName);
    } else {
      this.setItem(propName, valueToSet)
      return false;
    }
  }

  getItem(propName: string) {
    return this.props[propName];
  }

  setItem(propName: string, value: any) {
    this.props[propName] = value;
  }
}
