import React from "react";

import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import banner from '../src/images/banner-2.jpg';

import { StyledTimeline } from "../src/components/Timeline";

function HomePage(){

    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
                
                {/* Prop Drilling*/}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Banner />
                <Header />
                <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}/>
            </div>
        </>
    )
}

export default HomePage;

const StyledHeader = styled.div`

    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 84px;
        border-radius: 50%;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

/*const StyledBanner = styled.div = `
    background-image: url(${({bg}) => bg});
    background-image: url(${bg});
    height: 230px;
`;*/
function Header(){
    return (
        <StyledHeader>

            { /* <StyledBanner bg={banner.src} /> */ }
            <section className="user-info">
                <img src={config.github}></img>
                <div> 
                    <h2>
                        {config.name}    
                    </h2>
                    <p>
                        {config.job}
                    </p>    
                </div>
            </section>

        </StyledHeader>
    )
}

function Banner(){
    return (
        <section style={{"width":"100%","height":"15%","display": "flex"}}>
            <img style={{"width":"100%"}} src={banner.src}></img>
        </section>
    )
}

function TimeLine({searchValue, ...propriedades}){
    const playlistNames = Object.keys(propriedades.playlists);

    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {
                playlistNames.map(function(playlistName) {
                    const videos = propriedades.playlists[playlistName];

                    return (
                        <section key={playlistName}>
                            <h2>{playlistName}</h2>
                            <div>
                                { 
                                    videos.filter((video) => {
                                        const titleNormalize = video.title.toLowerCase();
                                        const searchValueNormalize = searchValue.toLowerCase();

                                        return titleNormalize.includes(searchValueNormalize);
                                    }).map((video) => {
                                        return (
                                            <a key={video.url} href={video.url}>
                                                <img src={video.thumb} />
                                                <span>
                                                    {video.title}
                                                </span>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </section>
                    )
                })
            }
        </StyledTimeline>
    )
}