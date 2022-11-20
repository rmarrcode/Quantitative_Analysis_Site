import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import MatadorTransfers from './transfers';
import MatadorSupport from './support';
import MatadorDocuments from './documents';
import MatadorSettings from './settings';
import MatadorProfile from './profile';
import ProtectedRoute from '../auth/ProtectedRoute';

function MatadorAccount() {
  return (
    <ProtectedRoute>
    <div className="matador account">
    <Tab.Container defaultActiveKey="#profile">
      <Row>
        <Col sm={2}>
          <ListGroup>
            <ListGroup.Item variant="light" action href="#profile">
              Profile
            </ListGroup.Item>
            <ListGroup.Item variant="light" action href="#settings">
              Settings
            </ListGroup.Item>
            <ListGroup.Item variant="light" action href="#documents">
              Documents
            </ListGroup.Item>
            <ListGroup.Item variant="light" action href="#transfers">
              Transfers
            </ListGroup.Item>
            <ListGroup.Item variant="light" action href="#support">
              Support
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="#profile">
              <MatadorProfile/>
            </Tab.Pane>
            <Tab.Pane eventKey="#settings">
              <MatadorSettings/>
            </Tab.Pane>
            <Tab.Pane eventKey="#documents">
              <MatadorDocuments/>
            </Tab.Pane>
            <Tab.Pane eventKey="#transfers">
              <MatadorTransfers/>
            </Tab.Pane>
            <Tab.Pane eventKey="#support">
              <MatadorSupport/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
    </ProtectedRoute>
    );
}

export default MatadorAccount;