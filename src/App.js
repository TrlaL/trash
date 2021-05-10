import React from 'react'
import updates from './updates.json'
import './assets/App.css';
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isUpdateLogActive: false, updates }
  }

  get updateLogStyle () {
    return {
      width: this.props.width
    }
  }

  get updateLogClassNames () {
    return 'update-log ' + (this.state.isUpdateLogActive ? 'update-log_active' : 'update-log_inactive')
  }

  get updateLogListStyle () {
    return {
      height: this.props.height,
      opacity: this.state.isUpdateLogActive ? 1 : 0
    }
  }
  
  toggleUpdateLogActive () {
    this.setState({
      isUpdateLogActive: !this.state.isUpdateLogActive
    })
  }

  render () {
    return (
      <div
        className={this.updateLogClassNames}
        style={this.updateLogStyle}>
        <div className="update-log__header">
          <span
            className="material-icons update-log__icon"
            onClick={this.toggleUpdateLogActive.bind(this)}>
            notifications
          </span>
          {this.state.isUpdateLogActive && (
            <div className="update-log__title">
              <span className="update-log__title-text">What`s new</span>
              <span
                className="material-icons update-log__icon"
                onClick={this.toggleUpdateLogActive.bind(this)}>
                close
              </span>
            </div>
          )}
        </div>
        <div className="update-log__list" style={this.updateLogListStyle}>
          {this.state.updates.map(update => {
            return (
              <div className="update-log__item" key={update.id}>
                <div className="update-log__item-title">{update.title}</div>
                <div className="update-log__item-description">{update.description}</div>
                <button className="update-log__item-button">Try it now</button>
                <a className="update-log__item-link" href="https://vk.com">Learn more</a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;