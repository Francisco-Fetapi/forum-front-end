import styled, { css } from "styled-components";
import MuiBox from "@material-ui/core/Box";
import MuiPaper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Button as MuiButton } from "./MuiStyled";
import { Link as Link2 } from "react-router-dom";

import MuiCard from "@material-ui/core/Card";
import MuiGrid from "@material-ui/core/Grid";
import MuiAvatar from "@material-ui/core/Avatar";

import API from "../API";

// De Formik
import { Form as Form2 } from "formik";

export const Button = styled(MuiButton)`
  border-radius: 0px;
  padding: 10px 30px;
`;

export const Link = styled(Link2)`
  color: #ff4081;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export const Form = styled(Form2)`
  width: 70%;
  margin-top: 30px;
  margin-bottom: 15px;
  div {
    margin-bottom: 8px;
  }
  .botao {
    display: flex;
    justify-content: center;
  }
  ${({ largura }) =>
    largura &&
    css`
      width: ${largura};
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    `}
`;

export const Paper = styled(MuiPaper)`
  width: 90%;
  max-width: 600px;
  padding-bottom: 20px;
  max-height: 550px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  opacity: 0.1;
  ${({ irpara }) =>
    irpara === "baixo" &&
    css`
      top: -150px;
    `}
  ${({ irpara }) =>
    irpara === "cima" &&
    css`
      top: 150px;
    `}

    animation-name:aparece;
  animation-duration: 1.2s;
  animation-iteration-count: 1;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;

  @keyframes aparece {
    to {
      top: 0px;
      opacity: 1;
    }
  }

  h4 {
    padding: 19px;
    letter-spacing: 3px;
    font-family: "Roboto-Thin";
    font-size: 32px !important;
    position: relative;
  }

  footer {
    opacity: 0;
    position: relative;
    left: -130px;

    animation: apareceX 1 1.2s 1.2s forwards;
    @keyframes apareceX {
      to {
        left: 0;
        opacity: 1;
      }
    }
  }
`;

export const PseudoElement = styled.span``;

export const Box = styled(MuiBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: white;

  overflow-y: hidden;

  ${(props) =>
    props.back_image &&
    css`
      background-position: center;
      background-size: cover;
      /* background-image:url('./img/${props.back_image}') */
      background-image: url("/img/${props.back_image}");
    `}
`;

export const HomeBox = styled(MuiBox)`
  min-height: 100vh;
  width: 100vw;
  background: #ddd;
  padding: 0px 20px;

  &.post {
    width: auto;
    padding: 15px;

    .MuiPaper-root {
      opacity: 0.9559;
    }
  }

  .comentarios {
    ${Form} {
      margin-left: 0px !important;
      margin-right: 0px !important;

      .botao {
        justify-content: flex-start;
      }
    }
    .MuiList-root {
      max-width: 590px;
    }
    .MuiListItemAvatar-root {
      margin-top: 0px;
    }
  }
`;
export const HomeMain = styled(MuiPaper)`
  width: 95%;
  background: white;
  min-height: 100vh;
`;
export const HomeHeader = styled(MuiBox)`
  /* background:url('./img/3.jpg'); */
  background-image: url("/img/3.jpg");

  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  height: 400px;
  width: 100%;
  padding-left: 50px;

  display: flex;
  align-items: center;

  div {
    width: 90%;
    max-width: 500px;
  }
`;
export const Text = styled(Typography)`
  color: white;
  font-family: "Roboto-Thin";

  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize};
    `}
  ${({ paragraph }) =>
    paragraph &&
    css`
      text-indent: 30px;
      padding-top: 10px;
    `}
    ${({ cor }) =>
    cor &&
    css`
      color: ${cor};
    `}
    ${({ fontFamily }) =>
    fontFamily &&
    css`
      font-family: ${fontFamily};
    `}
    &.titulo {
    padding-bottom: 4px;
    font-weight: bold;
    font-size: 18px;
  }
`;
export const Card = styled(MuiCard)`
  /* max-width:550px; */
  margin: 10px 0px;
  width: 100%;
  .card-content {
    height: 90px;
  }
`;
export const HomeContent = styled(MuiGrid)`
  padding: 15px;
  padding-bottom: 0px;
  justify-content: flex-start;
  align-items: center;
  & > div {
    display: flex;
    justify-content: center;
  }
  ${Card} {
    background: rgba(255, 255, 255, 0.9);
  }
`;
export const FooterA = styled(MuiBox)`
  padding: 20px;
  margin-top: 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
`;
export const HomeButton = styled(MuiBox)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PerfilHeader = styled(MuiBox)`
  /* background:url('./img/2.jpg'); */
  background-image: url("/img/2.jpg");
  background-position: center;
  background-size: cover;
  height: 300px;
  position: relative;
`;
export const PerfilAvatar = styled.div`
  position: absolute;
  bottom: -80px;
  width: 100%;
  /* background-color:black; */
  display: flex;
  justify-content: center;
  z-index: 2;

  div {
    width: 160px;
    height: 160px;
    position: relative;
  }
`;
export const PerfilContent = styled(MuiBox)`
  /* margin-top:80px; */

  padding: 80px 20px;
  position: relative;

  /* background:url('/img/fundo1.svg') no-repeat; */
  background: url("/img/fundo1.svg") no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  .MuiListItem-root {
    padding: 0px;
    margin-left: 10px;
  }
  .MuiListItemText-primary {
    font-size: 18px;
  }
  /* & > div:after{
        content:'';
        position:absolute;
        width:50%;
        height:2px;
        background:rgba(0,0,0,.3);
        bottom:10px;
        right:25%;
        left:25%;
    } */

  .posts .MuiListItem-root {
    padding: 5px;
  }
  .posts .MuiListItemText-primary {
    padding-bottom: 8px;
  }
`;
export const IconeTexto = styled(MuiBox)`
  display: flex;
  align-items: center;
  & * {
    font-size: 14px !important;
  }

  svg {
    color: #888;
    font-size: 32px;
    box-sizing: content-box;
    padding-right: 3px;
  }
`;
export const FotoUser = styled(MuiAvatar)`
  width: 190px;
  height: 190px;
  cursor: pointer;
`;
export const PostsHeader = styled(MuiBox)``;
