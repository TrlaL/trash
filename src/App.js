import React from 'react'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date(),
      delay: 1000,
      timer: null,
      value: 0
    }
  }

  componentDidMount () {
    this.setState({
      timer: setInterval(this.onTimerLoop.bind(this), this.state.delay)
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  onTimerLoop () {
    this.setState((state, props) => ({
      value: state.value + +props.increment
    }))
  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.value}</h2>
        {[1, 2, 3].map((number, index) => 
          <div key={index}>{number}</div>
        )}
      </div>
    );
  }
}

export default App;