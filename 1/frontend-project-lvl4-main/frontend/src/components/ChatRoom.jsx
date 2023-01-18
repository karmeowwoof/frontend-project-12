import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import routes from '../routes';
import {
  MDBContainer,
  MDBInputGroup,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTabs,
  MDBTabsContent,
  MDBTabsPane,
  MDBIcon,
} from 'mdb-react-ui-kit';

import { useAuth } from '../hooks/index.js';

import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';

import Modal from './Modal.jsx';
import Tab from './Tab.jsx';

const ChatRoom = () => {
  const { t } = useTranslation();
  const { user, getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  const [verticalActive, setVerticalActive] = useState('tab1');
  const [centredModal, setCentredModal] = useState(false);
  const [currentChannelId, setCurrentChannelId] = useState();

  const toggleShow = () => setCentredModal(!centredModal);

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), {
        headers: getAuthHeader(),
      });
      const { channels, messages, currentChannelId } = data;
      setCurrentChannelId(currentChannelId);

      batch(() => {
        dispatch(setChannels(channels));
        dispatch(setMessages(messages));
      });
    };

    fetchData();
  }, []);

  const { channels } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);

  return (
    <>
      <section className="chat-main d-flex flex-fill bg-light">
        <MDBContainer
          breakpoint="lg"
          className="my-5 rounded-3 shadow-2 border"
        >
          <MDBRow className="h-100">
            <MDBCol size={4} md={2} className="p-0 border-end">
              <MDBContainer fluid className="border-bottom">
                <header className="d-flex justify-content-between align-items-center py-3">
                  <h2 className="m-0 h6">{t('chatRoom.title')}</h2>
                  <MDBBtn size="sm" floating onClick={toggleShow}>
                    <MDBIcon fas icon="plus" size="sm" />
                  </MDBBtn>
                </header>
              </MDBContainer>
              <MDBTabs className="flex-column text-start">
                {channels.map(({ id, name }) => (
                  <Tab
                    key={name}
                    id={id}
                    verticalActive={verticalActive}
                    handleVerticalClick={handleVerticalClick}
                    name={name}
                  />
                ))}
                ;
              </MDBTabs>
            </MDBCol>
            <MDBCol size={8} md={10} className="p-0 d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 border-bottom small">
                <p className="m-0">
                  <b># general</b>
                </p>
                <span className="text-muted">0 {t('chatRoom.count')}</span>
              </div>
              <div
                id="messages-box"
                className="chat-messages overflow-auto px-5 "
              >
                <MDBTabsContent>
                  <MDBTabsPane
                    show={verticalActive === `tab${currentChannelId}`}
                  >
                    <ul>
                      {messages
                        .filter(
                          (message) => message.channelId === currentChannelId
                        )
                        .map(({ message }) => (
                          <li>${message}</li>
                        ))}
                      ;
                    </ul>
                  </MDBTabsPane>
                </MDBTabsContent>
              </div>
              <div className="mt-auto px-5 py-3"></div>
              <MDBInputGroup className="mb-3 mx-5 w-auto">
                <input
                  className="form-control"
                  placeholder={t('chatRoom.message')}
                  type="text"
                />
                <MDBBtn>{t('chatRoom.submit')}</MDBBtn>
              </MDBInputGroup>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Modal
        show={centredModal}
        setShow={setCentredModal}
        toggleShow={toggleShow}
      ></Modal>
    </>
  );
};

export default ChatRoom;
