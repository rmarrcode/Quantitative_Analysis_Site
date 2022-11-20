import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer, CDBBox } from 'cdbreact';

import "../matador_components.css"

function MatadorFooter() {

  // We can also add more stuff here.
  return (
    <CDBFooter className="matador-footer">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: '80%' }}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 text-dark">
            {/* <img
              alt="logo"
              src="hero.svg"
              width="30px"
            /> */}
            <span className="ml-4 h5 mb-0 font-weight-bold matador-footer">Disclosures</span>
          </a>
        </CDBBox>
        <CDBBox>
          <small className="ml-2">&copy; Atticus Martin, 2022. All rights reserved.</small>
        </CDBBox>
        <CDBBox display="flex">
          <CDBBtn flat color="light" className="p-2">
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
          <CDBBtn flat color="light" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="light" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </CDBFooter>
  );
};

export default MatadorFooter;