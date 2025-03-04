interface TRequestAnswer<T = any> {
  success: boolean;
  data: T;
}
export default TRequestAnswer;
