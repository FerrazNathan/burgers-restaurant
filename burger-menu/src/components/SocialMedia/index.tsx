import React from 'react'

import { SocialMediaData } from './SocialMediaData'
import { SlSocialGithub } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";

import * as S from './styles'

const iconMapping: { [key: string]: React.ComponentType<{ size?: string | number }> } = {
  Instagram: SlSocialInstagram,
  Linkedin: SlSocialLinkedin,
  Facebook: SlSocialFacebook,
  Youtube: SlSocialYoutube,
  Github: SlSocialGithub,
  Twitter: SlSocialTwitter,
}

function SocialMedia() {
  const iconSize = 40;

  return (
    <S.ContainerSocialMedia data-testid='container-social-media'>
      <h2 data-testid='title-section'>Nos siga nas redes socias</h2>
      <S.SocialMediaList data-testid='social-media-list'>
        {SocialMediaData && SocialMediaData.map((item, index) => {
          const IconComponent = iconMapping[item.icon];
          return (
            <S.SocialMediaItem 
              key={index}
              data-testid='social-media-item'
            >
              <S.SocialMediaLink
                href={item.url} 
                target='_blank' 
                rel='noreferrer'
                data-testid={`social-media-item-${item.icon}`}
              >
                {IconComponent && <IconComponent size={iconSize} />}
                <p>{item.icon}</p>
              </S.SocialMediaLink>
            </S.SocialMediaItem>
          );
        })}
      </S.SocialMediaList>
    </S.ContainerSocialMedia>
  )
}

export { SocialMedia }
