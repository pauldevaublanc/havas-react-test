import React, { Component } from 'react';
import './index.css';

import PropTypes from 'prop-types';

import { 
    ListGroup, 
    Container, 
    Row, 
    Col
} from 'react-bootstrap';

class CharacterItem extends Component {

    static propTypes = {
        name: PropTypes.string,
        height: PropTypes.string,
        mass: PropTypes.string,
    }
    

    render() {

        const {name, height, mass} = this.props
        
        return(
            <ListGroup.Item action as="li" style={{padding: ".70rem 0.20rem"}}>
                <Container>
                    <Row>
                        <Col md={4} xs={6}>{name}</Col>
                        <Col md={4} xs={3} >{height === "unknown" ? '?' : height + 'cm'}</Col>
                        <Col md={4} xs={3}>{mass === "unknown" ? '?' : mass + 'kg'}</Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        )
    }
}

export default CharacterItem;