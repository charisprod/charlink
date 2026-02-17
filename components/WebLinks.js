// Weblinks Page Sections
// created by @agcrisbp
// date: 29 Jul, 2022

import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { Button, ButtonLink, Container, StyledLink } from "./ReusableStyles";
import Link from "next/link";
import { HexIcon, HomeIcon, NewUp, OvalIcon } from './icons';
import allLinks from "../data/LinksData";
import bioData from "../data/BioData";
import Online from "../components/Online";
import { Icon } from '@iconify/react';
import { 
  InstagramEmbed, 
  TwitterEmbed, 
  TikTokEmbed, 
  YouTubeEmbed, 
  FacebookEmbed, 
  LinkedInEmbed 
} from 'react-social-media-embed';

const Links = () => {
  // Embed opened state
  const [activeEmbed, setActiveEmbed] = useState(null);

  // toggle embed
  const toggleEmbed = (id) => {
    if (activeEmbed === id) {
      setActiveEmbed(null);
    } else {
      setActiveEmbed(id);
    }
  };

  // all user info from bioData
  const bio = bioData[0];
  const avatarShape = bio.nftAvatar ? `nft-clipped` : `oval-clipped`;

  const socialIcons = allLinks.filter((el) => el.type === "social" && el.on);
  const nfts = allLinks.filter((el) => el.type === "nft" && el.on);
  const other = allLinks.filter((el) => el.type === "other" && el.on);

  // Social Embed Logic
  const socialConfig = bioData[0].social ? bioData[0].social.split(',').map(s => s.trim().toLowerCase()) : [];
  const socialUrls = bioData[0].socialUrl ? bioData[0].socialUrl.split(',').map(u => u.trim()) : [];

  const renderEmbed = (type, url, index) => {
    switch (type) {
      case 'instagram': return <InstagramEmbed url={url} width="100%" />;
      case 'twitter':
      case 'x': return <TwitterEmbed url={url} width="100%" />;
      case 'tiktok': return <TikTokEmbed url={url} width="100%" />;
      case 'youtube': return <YouTubeEmbed url={url} width="100%" />;
      case 'facebook': return <FacebookEmbed url={url} width="100%" />;
      case 'linkedin': return <LinkedInEmbed url={url} width="100%" />;
      default: return null;
    }
  };
  
  return (
    <LinkWrapper>
      <LinkContainer>
        <TopPart>
          <LinkHeader>
            <Avatar>
              <AvatarWrap>
                {/* Avatar svg  hex or oval if nftAvatar=true will convert to hex */}
                <HexIcon />
                <OvalIcon />
                <div className={`${avatarShape} avatar-border`}></div>
                <div className={`${avatarShape} avatar-fill`}></div>
                <img
                  src={bio.avatar}
                  className={avatarShape}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {bio.online && (
                  <OnlineWrapper>
                    <a href={`${bio.url}`}><Online /></a>
                  </OnlineWrapper>
                )}
              </AvatarWrap>
            </Avatar>
            <Title>
              {/* Using titleimg flag to use image as title or text */}
              {bio.titleImg !== false ?
                <img src={bio.titleImg} className="handle" onContextMenu={(e) => e.preventDefault()} /> :
                <h1>{bio.name}</h1>
              }
            </Title>
          </LinkHeader>

          <LinkBio>
            {bio.description && <h1>{bio.descriptionText} </h1>}
            {bio.subdesc && <h4>{bio.subdescText}</h4>}
          </LinkBio>

          <WebLinkWrap>
            {/* Social Icons Section */}
            <LinkSection className="social">
              <div className="iconsonly">
                {
                  socialIcons.map((i) => (
                    <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                      <LinkBox className="socialIcon">
                        <Icon icon={i.icon} height={20} width={20} style={{ filter: 'var(--icon)'}} onContextMenu={(e) => e.preventDefault()} />
                      </LinkBox>
                    </a>
                  ))
                }
              </div>
             </LinkSection>

             {/* Spotify Section */}
             <LinkSection>
             {(bio.spotify) ?
                <a href={bio.spotifyUrl} target="_blank" rel="noreferrer"><h3>{bio.spotifyText}</h3>
                  <img
                    src={`${bio.spotifyImg}`}
                    width="400px"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </a> : ''
              }
              </LinkSection>

              {/* Other Links Section */}
              <LinkSection>
              <h3>{other[0]?.type}</h3>
              {
                other.map((i) => (
                  <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                    <LinkBox>
                      <LinkTitle>
                        <Icon icon={i.icon} height={20} width={20} style={{ filter: 'var(--icon)', marginRight: '10px' }} onContextMenu={(e) => e.preventDefault()}/> {i.title}</LinkTitle> <NewUp />
                    </LinkBox>
                  </a>
                ))
              }
              </LinkSection>

              {/* Accordion Social Embeds */}
              {socialConfig.length > 0 && (
                <EmbedContainer>
                  {socialConfig.map((type, index) => {
                    const embedId = `embed-${index}`;
                    const isOpen = activeEmbed === embedId;
                    const url = socialUrls[index];
                    
                    if (!url) return null;

                    return (
                      <div className="embed-group" key={embedId}>
                        <EmbedToggleButton 
                          onClick={() => toggleEmbed(embedId)}
                          className={isOpen ? 'active' : ''}
                        >
                          <h3>{type.toUpperCase()}</h3>
                          <Icon icon={isOpen ? "akar-icons:chevron-up" : "akar-icons:chevron-down"} />
                        </EmbedToggleButton>
                        
                        {isOpen && (
                          <div className="embed-item">
                             {renderEmbed(type, url, index)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </EmbedContainer>
              )}

              {/* Bluesky Section */}
              <LinkSection>
              {(bio.bsky) ?
                <div className="embed-group">
                  <EmbedToggleButton 
                    onClick={() => toggleEmbed('bsky')}
                    className={activeEmbed === 'bsky' ? 'active' : ''}
                  >
                    <h3>Bluesky Timeline</h3>
                    <Icon icon={activeEmbed === 'bsky' ? "akar-icons:chevron-up" : "akar-icons:chevron-down"} />
                  </EmbedToggleButton>
                  
                  {activeEmbed === 'bsky' && (
                    <div className="embed-item" style={{ marginTop: '10px' }}>
                      <bsky-embed
                        username={bio.bskyUname}
                        mode={bio.bskyTheme}
                        limit="5"
                        link-target="_blank"
                        link-image="true"
                        load-more="true"
                        disable-autoplay="true"
                        custom-styles="* { text-align: left !important; }"
                      ></bsky-embed>
                    </div>
                  )}
                </div> : ''
              }
            </LinkSection>

            {/* NFT Section */}
            {
              nfts.length > 0 ?
                <LinkSection className="social">
                  <h3>{nfts[0].type}s</h3>
                  {
                    nfts.map((i) => (
                      <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                        <LinkBox>
                          <LinkTitle><img src={i.icon} style={{ filter: 'var(--img)' }} onContextMenu={(e) => e.preventDefault()} /> {i.title}</LinkTitle> <NewUp />
                        </LinkBox>
                      </a>
                    ))
                  }
                </LinkSection>
                : ''
            }
          </WebLinkWrap>
        </TopPart>
        <BottomPart>
          <LinkFoot>
            <h4>Powered by <a href="https://charlink-docs.charisprod.xyz/" target="_blank">CharLink</a>.</h4>
          </LinkFoot>
        </BottomPart>
      </LinkContainer>
    </LinkWrapper>
  )
};

export default Links;

const LinkWrapper = styled(Container)``

const LinkContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
`

const LinkHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 12px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
       margin-top: 20px;
    }
`

const Avatar = styled.div`
    height: 90px;
    width: 90px;
    position: relative;
    margin-bottom: 12px;
`

const AvatarWrap = styled.div`
   height: 100%;
   width: 100%;
   position: relative;
   filter: drop-shadow(0px 1px 2px var(--avatar-shadow));
   img{
    height: calc(100% - 6px);
    width: calc(100% - 6px);
   }
   .avatar-border{
        height: 100%;
        width: 100%;
        position: absolute;
        background: ${({ theme }) => theme.bg.primary};
   }
   .avatar-fill{
        height: calc(100% - 6px);
        width: calc(100% - 6px);
        position: absolute;
        background: ${({ theme }) => theme.bg.primary};
   }
`

const OnlineWrapper = styled.div`
    position: absolute;
    bottom: 6px;
    right: 2px;
    z-index: 10;
    
    & > a {
      display: block;
      background: ${({ theme }) => theme.bg.primary};
      border-radius: 50%;
      padding: 2px;
    }
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
      font-size: 38px;
      font-weight: 700;
      letter-spacing: -2px;
      background: linear-gradient(90deg, #4AB1F1 5.71%, #566CEC 33.77%, #D749AF 61.82%, #FF7C51 91.21%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 32px;
      }
    }
    h3{
      margin-top:6px;
      font-size: 18px;
      font-weight: 500;
      color: ${({ theme }) => theme.text.secondary};
      opacity: .5;
    }
    .handle{
      height: 32px;
      margin-top: 6px;
      margin-bottom: 6px;
    }
`

const LinkBio = styled.div`
    display: flex;
    flex-direction: column;
    h1{
      font-size: 22px;
      font-weight: 500;
      padding: 0 20px;
    }
    h4{
      font-size: 18px;
      margin: 10px 0;
      color: ${({ theme }) => theme.text.secondary};
    }
`

const TopPart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

const BottomPart = styled.div`
  padding: 60px 0 40px 0;
  width: 100%;
  margin-top: auto;
`

const LinkFoot = styled.div`
    h4{
      color: ${({ theme }) => theme.text.secondary};
      font-size: 16px;
    }
`

const WebLinkWrap = styled.div`
    width: 100%;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
       padding: 0 12px;
    }
`

const LinkSection = styled.div`
    padding: 12px 0;
    display: flex;
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    flex-direction: column;
    
    &.social{
      max-width: max-content;
      padding: 0;
      margin-bottom: 18px;
    }
    .iconsonly{
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    h3{
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 8px;
      color: ${({ theme }) => theme.text.secondary};
    }
`

const EmbedContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
`


const EmbedToggleButton = styled.div`
    padding: 18px 20px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.bg.secondary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background: transparent;
    transition: all 0.3s ease;

    h3 {
      font-size: 14px !important;
      margin: 0 !important;
      letter-spacing: 1px !important;
      text-transform: uppercase;
      color: ${({ theme }) => theme.text.primary} !important;
    }

    &:hover {
      background: ${({ theme }) => theme.bg.hover};
    }

    &.active {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background: ${({ theme }) => theme.bg.secondary};
    }
`

const EmbedItemWrap = styled.div`
    width: 100%;
    border: 1px solid ${({ theme }) => theme.bg.secondary};
    border-top: none;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    overflow: hidden;
    background: white;
`

const LinkBox = styled.div`
    padding: 18px 20px;
    border-radius: 12px;
    margin: 8px 0;
    border: 1px solid ${({ theme }) => theme.bg.secondary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    
    &:hover{
      background: ${({ theme }) => theme.bg.hover};
    }
    
    &.socialIcon{
      padding: 16px;
      border-radius: 50%;
      border: none;
      margin: 4px;
    }
`

const LinkTitle = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  img{
    height: 20px;
    margin-right: 10px;
  }
`
