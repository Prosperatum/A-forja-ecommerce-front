import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Like from "../../assets/likes.png"
import YellowStar  from "../../assets/yellowstar.png"
import { useNavigate } from 'react-router-dom';
import { BiCart } from "react-icons/bi"
import second from "../../assets/404second.png"
import { ClickProduct, SelectedProduct } from "../../services/ProductsRoute.js"
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

export default function ProductPage(props){

    const [Price, setPrice] = useState("100")
    const [Image, setImage] = useState("https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU=")
    const [Name, setName] = useState("404 NOT FOUND")
    const [Descri, setDescri] = useState("404")
    const [Catego, setCatego] = useState("404")
    const [ID, setID] = useState()
    // const {Token } = useContext(AuthContext);
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL

    const catchProducts = async () => {

        const promisse = await ClickProduct();
        console.log(promisse.data) 
        setPrice(promisse.data.price)
        setImage(promisse.data.picture)
        setName(promisse.data.name) 
        setDescri(promisse.data.description)
        setCatego(promisse.data.category)
        setID(promisse.data._id)
    }

    catchProducts()

    async function CartAdd(){
    const body = {id: ID}
    const Token = "5702bdae-8c1b-4c17-a888-d6b968bc2178"
    console.log(body);
    const config = {
        headers: {Authorization: Token}
        }
            
        
        const promisse = axios.post(`${url}/cart`, body, config)
        promisse.then(() => navigate("/carrinho"))
        promisse.catch((error) => {
            console.log(error.response)
            if (error.response.status === 401) {navigate("/login")} 
            return error.response;
        });
        return 
    }


    return(
        <>
        <Main>
             <ConteinerAll>
                <ConterinerLeft>
                    <IniDesc>{Catego} / {Name}</IniDesc>
                    <PicProduct src={Image}/>
                    <LowBarLike src={Like}/>
                    </ConterinerLeft>
                <ConteinerRight>
                    <TitleProduct>{Name}</TitleProduct>
                    <Subprice>De:R${30+Number(Price)}</Subprice>
                    <PriceYet><span>Por: </span>R${Price}</PriceYet>
                    <Cartao>em até 3x de <span>R${(Number(Price)/3).toFixed(2)} </span>no cartão.</Cartao>
                    <p>À vista no PIX com até 5% OFF</p>
                    <p>Ou em 1x no cartão com até 5% OFF</p>
                    <p>Vendido e entregue por: A Forja! | Em estoque</p>
                    <ConteinerStars>
                        <img src={YellowStar}/>
                        <img src={YellowStar}/>
                        <img src={YellowStar}/>
                        <img src={YellowStar}/>
                        <img src={YellowStar}/>
                    </ConteinerStars>
                    <BuyButton onClick={CartAdd}><BiCart size={40}/>COMPRAR</BuyButton>
                </ConteinerRight>
             </ConteinerAll>
             <Description>Descrição do produto</Description>
             <IniDesc>{Descri}</IniDesc>
        </Main>
        </>
    )
}

const Main = styled.div`

    display:flex;
    flex-direction:column;
    align-items:center;

    p{

    font-family: "Open Sans",sans-serif;
    }

`

const ConteinerAll = styled.main`

    margin-top:30px;
    width:1400px;
    height:800px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;

`
const IniDesc = styled.p`

    font-family: 'Texturina';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: -0.075em;
    margin-right:15px;
    text-decoration:underline;
    color:#873e16;

`

const ConterinerLeft = styled.div`

    width:700px;
    height:800px;
    display:flex;
    flex-direction:column;


`
const PicProduct = styled.img`

    margin:30px;
    width:600px;
    height:600px;

`
const LowBarLike = styled.img`

    width:350px;
    margin-left:170px;
`

const ConteinerRight = styled.div`

    width:700px;
    height:800px;
    display:flex;
    flex-direction:column;

    p{
        color:white;
    }

`
const Subprice = styled.p`

    margin-top:30px;
    font-family: 'Cinzel';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    letter-spacing: 0.01em;
    text-transform: capitalize;
    color:gray !important;
    text-decoration: line-through;
`

const PriceYet = styled.p`

    font-family: 'Cinzel';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    letter-spacing: 0.01em;
    text-transform: capitalize;
    color:#ffa375 !important;

`

const Cartao = styled.p`

    font-family: "Cinzel";
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    color:#ffa375 !important;
    margin-bottom:15px;

    span{
        color: red;
    }
`


const ConteinerStars = styled.div`

    width:150px;
    height:25px;
    margin-top:20px;

    img{
        width:30px;
        height:30px;
    }
`


const TitleProduct = styled.p`

    font-family: "Open Sans",sans-serif;
    font-weight: 600;
    font-style: normal;
    line-height: 1.2;
    margin: 0;
    font-size: 32px;
    margin-top:50px;
    color:#deb876 !important;

`

const BuyButton = styled.button`

    margin-top:15px;
    background-color:#deb876 !important;
    width:192px;
    height:50px;
    font-style: bold;
    font-weight:700;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family: "Cinzel";
    border-radius:7px;
    border:none;
    color: black;
    cursor:pointer;
    margin-bottom:15px;

    &:hover{
        background-color:white;
        color:#000;
    }
`
const Description = styled.p `

    font-family: "Open Sans",sans-serif;
    font-weight: 600;
    font-style: normal;
    line-height: 1.2;
    margin: 0;
    font-size: 32px;
    margin-top:50px;
    color:#deb876 !important;
    margin-bottom:40px;
`