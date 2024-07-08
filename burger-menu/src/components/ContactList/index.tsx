import React from 'react'

import { ContactListData } from './ContactListData'

import { ImWhatsapp } from "react-icons/im";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiMessengerLine } from "react-icons/ri";

import * as S from './styles'

const iconMapping: { [key: string]: React.ComponentType<{ size?: string | number }> } = {
  Whatsapp: ImWhatsapp,
  Telefone: LuPhone,
  Email: MdOutlineMail,
  Celular: IoIosPhonePortrait,
  Direct: IoPaperPlaneOutline,
  Messenger: RiMessengerLine,
}

function ContactList() {
  const iconSize = 40;

  return (
    <S.ContainerContactList data-testid='container-contact-list'>
      <h2 data-testid='title-section'>Entre em contato conosco</h2>
      <S.ContactListList data-testid='social-media-list'>
        {ContactListData && ContactListData.map((item, index) => {
          const IconComponent = iconMapping[item.icon];
          return (
            <S.ContactListItem 
              key={index}
              data-testid='social-media-item'
            >
              <S.ContactListLink
                href={item.url} 
                target='_blank' 
                rel='noreferrer'
                data-testid={`social-media-item-${item.icon}`}
              >
                {IconComponent && <IconComponent size={iconSize} />}
                <p>{item.icon}</p>
              </S.ContactListLink>
            </S.ContactListItem>
          );
        })}
      </S.ContactListList>
    </S.ContainerContactList>
  )
}

export { ContactList }
