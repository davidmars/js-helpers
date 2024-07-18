/**
 * Check if object is one of the provided instances
 * @param object
 * @param instances
 */
export default function isInstanceOf(object: any, instances: any[]) {
  for (const i of instances) {
    if (object instanceof i) {
      return true;
    }
  }
  return false;
}
