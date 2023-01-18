import React from 'react';

import { MDBTabsItem, MDBTabsLink, MDBIcon } from 'mdb-react-ui-kit';

const Tab = (props) => {
  const { name, id, verticalActive, handleVerticalClick } = props;
  return (
    <MDBTabsItem key={id}>
      <MDBTabsLink
        onClick={() => handleVerticalClick(`tab${id}`)}
        active={verticalActive === `tab${id}`}
      >
        <MDBIcon fab icon="slack-hash" className="me-2" />
        {name}
      </MDBTabsLink>
    </MDBTabsItem>
  );
};

export default Tab;
