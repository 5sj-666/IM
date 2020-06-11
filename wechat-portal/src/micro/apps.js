/**
 * @description存储所有的微应用信息
 * @author wsj
 * */
const apps = [
  {
    name: "VueMicroApp",
    entry: "//localhost:10200",
    container: "#frame",
    activeRule: "/vue",
  },
  {
    name: "ReactMicroApp",
    entry: "//localhost:10100",
    container: "#frame",
    activeRule: "/react",
  }
];

export default apps;