import { useState } from "react";
import styled from "styled-components";
import { cor4, cor5, cor7} from "../constants/colors";
import Logo from "./Logo";
import SideBar from "./Sidebar";
import {GoThreeBars, GoSearch} from "react-icons/go"
import {BiUserCircle, BiCart} from "react-icons/bi"
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  window.scrollTo(0, 0);

  return (
    <Hcontainer>
      <nav>
        <GoThreeBars className="icons" size={35} onClick={() => setMenuOpen(!menuOpen)}/>
        {menuOpen && <SideBar />}
        <Logo />
      </nav>

      <Search>
        <input type="text" placeholder="Procure os produtos" />
        <GoSearch size={30} className="icons" onClick={() => {}}/>
      </Search>

      <nav>
      <BiUserCircle size={35} className="icons" onClick={() => navigate("/login")}/>
      <p>
        Faça seu <span onClick={() => navigate("/login")}>Login</span>
        <br /> ou <span onClick={() => navigate("/cadastro")}>Cadastre-se</span>
      </p>
      </nav>

      <BiCart size={40} className="icons" onClick={() => navigate("/carrinho")}/>

    </Hcontainer>
  );
}

const Hcontainer = styled.div`
  font-family: "Texturina", serif;
  background-color: ${cor7};
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  color: ${cor5};
  span {
    text-decoration: underline;
    &:hover {
    cursor: pointer;
    color: ${cor4}
    }
  }
  nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .icons:hover {
  cursor: pointer;
  color: ${cor4}
  }
`;

const Search = styled.div`
  width: 25%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  input {
    width: 90%;
    padding: 7px;
  }
`;

