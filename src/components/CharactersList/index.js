import React, { Component } from 'react';
import './index.css';
import config from '../../config/index';

// PROJECT COMPONENTS
import Loader from '../Loader';
import CharacterItem from '../CharacterItem';


// BOOTSTRAP COMPONENTS
import { 
    ListGroup, 
    Container, 
    Row, 
    Col, 
    InputGroup, 
    Button, 
    FormControl 
} from 'react-bootstrap';


class CharactersList extends Component {

    state = {
        characters : {},
        totalPage: null,
        currentPage: 1,
        inputValue: '',
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
    
    searchCharacters = () => {
        fetch(`${config.urlApi}?search=${this.state.inputValue}`)
        .then(response => response.json())
        .then(characters => 
            this.setState({ 
                characters,
            })
        );
    }

    resetSearch = () => {
        this.setState({
            inputValue: ''
        }, ()=> this.getCharacters(this.state.currentPage));
    }

    getPages = () => {
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
        return pagesNumbers;
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
    
        const {characters, value} = this.state
    
        return(
            <div className="list-container">
                
                <div className={`character-list-wrapper ${ !characters.results ? 'loader-wrapper' : ''}`}>
                    {
                        !characters.results ? 
                        <Loader/> : 

                        <div>
                            <InputGroup style={{margin:'20px 0px 30px', maxWidth:'650px'}}>
                                <FormControl
                                placeholder="Rechercher un personnage"
                                aria-label="Rechercher un personnage"
                                value={value}
                                onChange={this.handleChange}
                                />
                                <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary" 
                                    style={{
                                        color:'var(--white)'
                                    }} 
                                    onClick={this.searchCharacters}>
                                        Rechercher
                                </Button>
                                <Button 
                                    variant="outline-secondary" 
                                    style={{
                                        color:'var(--yellow)'
                                    }} 
                                    onClick={this.resetSearch}>
                                        Reset
                                </Button>
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
                            { characters.results.map((character, key)=> {
                                return (
                                    <CharacterItem 
                                        key={key}
                                        name={character.name} 
                                        mass={character.mass} 
                                        height={character.height}
                                    />
                                )
                            })}
                            </ListGroup>
                        </div>
                    }{} 
                </div>
                <ul className="pagination-wrapper">
                    {this.getPages()}
                </ul>
            </div>
        )
    }
}

export default CharactersList;