import React, { useState, useEffect } from "react";
import Link from "next/link";
import Carousel from "react-elastic-carousel";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
import api from "/Components/axiosRequest";
import { socket } from "config/websocket";
import { fetch } from "Utils/strapiApi";
import dynamic from "next/dynamic"
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });


export default function HotCollections() {
    const [serverCollections, setServerCollections] = useState([]);
    const responsive = {
        0: {
            items: 1
        },
        400: {
            items: 2
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
    const loadServerCollection = async () => {
        await fetch("/collections")
            .then((response) => {
                setServerCollections(response.data);
            })
            .catch((e) => {
                console.log("error in loading collection", e);
            });
    };

    useEffect(async () => {
        socket.on("serverBroadCastNewCollection", (data) => {
            setServerCollections((prev) => [data, ...prev]);
        });

        loadServerCollection();
    }, []);
    return (

        <div className="row">
            <div className="col-lg-12">
                <h2 className="style-2">Hot Collections</h2>
            </div>
            <OwlCarousel className='owl-theme  fadeIn' responsive={responsive} responsiveClass={"-"} dots={false} items={5} navClass={["owl-prev carouselPrev", "owl-next carouselNext"]} loop margin={15} nav>
                {serverCollections?.length > 0 && serverCollections.map((collection) => {
                    return <div className="nft_coll style-2">
                        <div className="nft_wrap">
                            <a href="collection.html"><img src={collection?.collectionBanner?.url} className="lazy img-fluid" alt="" /></a>
                        </div>
                        <div className="nft_coll_pp">
                            <a href="collection.html"><img className="lazy" src={collection?.talent?.talentAvatar?.url} alt="" /></a>
                            <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                            <a href="collection.html"><h4>{collection?.collectionName}</h4></a>
                            <span>ERC-192</span>
                        </div>
                    </div>
                })}
            </OwlCarousel>
        </div>

    );
}
