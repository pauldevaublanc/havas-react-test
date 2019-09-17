import React, { Component } from 'react';
import './index.css';
import config from '../../config/index';

// PROJECT COMPONENT
import Loader from '../Loader';


// BOOTSTRAP COMPONENTS
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';



class CharactersList extends Component {

    state = {
        characters : {},
        totalPage: null,
        currentPage: 1,
        inputValue: ''
    }

    getCharacters = (pageNumber) => {
        fetch(`${config.urlApi}?page=${pageNumber}`)
        .then(response => response.json())
        .then(characters => 
            this.setState({ 
                characters,
                totalPage: Math.round(characters.count/10),
            })
        );
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }
    
    searchCharacters = (event) => {
        fetch(`${config.urlApi}?search=${this.state.inputValue}`)
        .then(response => response.json())
        .then(characters => 
            this.setState({ 
                characters,
            }));
        event.preventDefault();
    }

    resetSearch = () => {
        this.setState({
            inputValue: ''
        }, ()=> this.getCharacters(this.state.currentPage));
    }


    getPage = (pageNumber) => { 
        this.setState({
            currentPage: pageNumber
        }, ()=> this.getCharacters(this.state.currentPage))  
    }


    componentDidMount() {
       this.getCharacters(this.state.currentPage)
    }
    

    render() {
        let pagesNumbers = [];
        for (let i = 1; i <= this.state.totalPage; i++) {
            pagesNumbers.push(
                <li 
                key={i} 
                className={`${this.state.currentPage === i ? 'active' : ''}`} 
                onClick={()=>this.getPage(i)}>{i}
                </li>
            );
        }

        return(
            
            <div className="list-container">
                
                <div className={`character-list-wrapper ${this.state.characters.results === undefined ? 'loader-wrapper' : ''}`}>
                    {
                        this.state.characters.results === undefined ? 
                        <Loader/> : 

                        <div>
                            <InputGroup style={{margin:'20px 0px 30px', maxWidth:'650px'}}>
                                <FormControl
                                placeholder="Rechercher un personnage"
                                aria-label="Rechercher un personnage"
                                value={this.state.value}
                                onChange={this.handleChange}
                                />
                                <InputGroup.Append>
                                <Button variant="outline-secondary" style={{color:'var(--white)'}} onClick={this.searchCharacters}>Rechercher</Button>
                                <Button variant="outline-secondary" style={{color:'var(--yellow)'}} onClick={this.resetSearch}>Reset</Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <ListGroup as="ul">
                                <ListGroup.Item 
                                    action 
                                    as="li" 
                                    style={{
                                        backgroundColor:'var(--yellow)', 
                                        padding: ".70rem 0.20rem", 
                                        fontWeight:'bold'
                                    }}>
                                    <Container>
                                        <Row>
                                            <Col md={4} xs={6}>Nom</Col>
                                            <Col md={4} xs={3} >Taille</Col>
                                            <Col md={4} xs={3}>Poids</Col>
                                        </Row>
                                        
                                    </Container>
                                </ListGroup.Item>
                            { this.state.characters.results.map((character, key)=> {
                                return (
                                    <ListGroup.Item action as="li" key={key} style={{padding: ".70rem 0.20rem"}}>
                                        <Container>
                                            <Row>
                                                <Col md={4} xs={6}>{character.name}</Col>
                                                <Col md={4} xs={3} >{character.height === "unknown" ? '?' : character.height + 'cm'}</Col>
                                                <Col md={4} xs={3}>{character.mass === "unknown" ? '?' : character.height + 'kg'}</Col>
                                            </Row>
                                        </Container>
                                    </ListGroup.Item>
                                )
                            })}
                            </ListGroup>
                        </div>
                    }{} 
                </div>
                <ul className="pagination-wrapper">
                    {pagesNumbers}
                </ul>
            </div>
        )
    }
}

export default CharactersList;