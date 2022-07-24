import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

export default createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
/* bootstrap override */
.btn-primary {
  background-color: #278bdf;
  border-color: #278bdf;
  color: white;
}
/* reset */
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}
/* global styles */
html, body, #root{
  height: 100%;
}
body{
  background: #eff3f9 !important;
  color: #333333;
  -webkit-font-smoothing: antialised;
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
}


`;
