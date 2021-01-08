import React from 'react';
import {connect} from 'react-redux';
import {loadData, setSelectedAnswer} from '../store/homepageReducer';
import { Button, Columns, Content } from 'react-bulma-components';
import FadeIn from 'react-fade-in';
import { ElementClass } from 'enzyme';
import { emojisplosion } from 'emojisplosion';


/**
 * COMPONENT
 */
export class Homepage extends React.Component {
  constructor() {
    super()

    this.onTriviaClick = this.onTriviaClick.bind(this);
  }

  componentDidMount() {
    this.props.setTestData();
  }

  onTriviaClick(answer) {
    this.props.setSelectedAnswer(answer)
  }

  renderButton(idx){
    let answer = this.props.data.trivia.answers[idx];
    let selected = this.props.selectedAnswer;
    let correct = this.props.data.trivia.correct_answer;
    let color = "warning";
    if (selected !== null) {
      if(answer === correct){
        color = "primary";
      }
      else if(selected === answer){
        color = "danger";
      }
      else{
        color = "light";
      }
    }

    return <p className="control">
    <Button className="button" color={color} rounded disabled={selected!==null}
    onClick={() => this.onTriviaClick(answer)}>{answer}</Button>
  </p>
  }

  render() {
    let data = this.props.data;

    if (data == null) {
        return <p>Loading</p>
    }

    let quote = data.quote;

    if(this.props.selectedAnswer === this.props.data.trivia.correct_answer){
      emojisplosion({
        emojiCount: 80,
      });
    }

    return (
      <div id= 'homepage' style={{"backgroundImage": `url(${data.background.url})`}}>
        <Columns className="is-mobile" centered id="quote">
          <Columns.Column size="half" className="has-text-cenetered">
            <Content>
              <FadeIn delay={500} transitionDuration={3000}>
              <p>{quote.text}</p>
              <p className="author"> - {quote.author}</p>
              </FadeIn>
            </Content>
          </Columns.Column>
        </Columns>


        <Columns className="is-mobile" centered id="search">
          <Columns.Column size="three-quarters">
            <div >
              <div className="control has-icons-left has-icons-right">
                <form action="https://www.google.com/search">
                  <input className="input" type="text" placeholder="Search Google" name="q"/>
                </form>
              </div>
            </div>
          </Columns.Column>
        </Columns>



        <Columns  className="is-mobile" centered id="trivia">
        <Columns.Column size="three-quarters" className="has-text-centered">
        <div id = 'answers'>
          <div>
            <p id="questions">{data.trivia.question}</p>

            <div className= "field is-grouped buttons is-centered">
              {this.renderButton(0)}
              {this.renderButton(1)}
              {this.renderButton(2)}
              {this.renderButton(3)}
            </div>
          </div>
        </div>
        </Columns.Column>
      </Columns>
      </div>

    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    data: state.data,
    selectedAnswer: state.selectedAnswer
  }
}

const mapDispatch = (dispatch) =>{
  return {
    setTestData: () => dispatch(loadData()),
    setSelectedAnswer: (answer) => dispatch(setSelectedAnswer(answer)),
  }
}

export default connect(mapState, mapDispatch)(Homepage)

