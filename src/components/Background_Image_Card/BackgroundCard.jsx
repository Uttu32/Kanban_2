import React from "react";
import { Bcg_Image } from "../../Data/Data";
import Styles from './BackgroundCard.module.css';
import { Image } from "../../Recoil/Atom/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export default function BackgroundCard() {

    const [image, setImage ] = useRecoilState(Image);
    const navigate= useNavigate();

    function handleCLick(index){
        setImage(index);
        localStorage.setItem('Image', JSON.stringify(index));
        navigate("/")
    }
  return (
    <div className={Styles.Main}>
      <h2>Optimise your view</h2>
      <div className={Styles.image}>
        {Bcg_Image.map((ele,index) => (
          <img key={index}
          onClick={()=>handleCLick(index)}
          src={ele} alt="image" />
        ))}
      </div>
    </div>
  );
}
