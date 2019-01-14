import React, {Component} from 'react';
import { Container, Row, Col,Form,FormGroup,Label,Input} from 'reactstrap';

export default class FormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded:false,
          teams: [],
          selectedTeam: "",
          
        };
      }
      componentDidMount() {
        fetch("http://localhost:3000/circle")
          .then(res => res.json())
          .then(
            (result) => {
             this.setState({
                isLoaded: true,
                teams: result.results
              });
            },
         (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    render() {
       
        return(
            <Form>
            <FormGroup row>
               <Label for="exampleEmail" sm={2}>Email</Label>
               <Col sm={10}>
                   <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
               </Col>
            </FormGroup>
         
            <FormGroup row>
               <Label for="examplePassword" sm={2}>Password</Label>
               <Col sm={10}>
                  <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
               </Col>
            </FormGroup>
         
            <FormGroup row>
               <Label for="exampleSelect" sm={2}>Select</Label>
               <Col sm={10}>
             
                   <select className="dropdown-content" value={this.state.selectedTeam}
          onChange={(e) => this.setState({selectedTeam: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>
          {this.state.teams.map((team) => <option key={team.circleId} value={team.circleId}>{team.circleName}</option>)}
        </select>
                  
               </Col>
            </FormGroup>
         
            <FormGroup row>
               <Label for="exampleSelectMulti" sm={2}>Select Multiple</Label>
               <Col sm={10}>
                 <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple />
               </Col>
             </FormGroup>
         
           <FormGroup row>
             <Label for="exampleText" sm={2}>Text Area</Label>
             <Col sm={10}>
               <Input type="textarea" name="text" id="exampleText" />
             </Col>
           </FormGroup>
         </Form>
        )
       }
}
