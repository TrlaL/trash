import React from 'react'
import updates from './updates.json'
import './assets/App.css';
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isUpdateLogActive: false,
      observer: null,
      updates: updates,
      viewedUpdateIds: []
    }
  }

  get hasUnviewedUpdates () {
    return this.state.updates.some(update => {
      return !this.state.viewedUpdateIds.includes(update.id.toString())
    })
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

  componentWillMount () {
    this.setState({
      observer: new IntersectionObserver(this.onIntersectionObserver.bind(this), {
        root: document.getElementById('list'),
        rootMargin: '0px',
        threshold: 1.0
      }),
      viewedUpdateIds: JSON.parse(
        localStorage.getItem('viewedUpdateIds') || '[]'
      )
    })
  }

  componentWillUpdate () {
    document.querySelectorAll('.update-log__item').forEach(item => {
      if (!item.isObservable) {
        this.state.observer.observe(item)
        return item.isObservable = true
      }
    })
  }

  formatDate (date) {
    return new Date(date).toLocaleString()
  }

  onIntersectionObserver (entries) {
    entries.forEach(entry => {
      const id = entry.target.dataset.id
      if (entry.isIntersecting && !this.state.viewedUpdateIds.includes(id)) {
        this.state.viewedUpdateIds.push(id)
        return localStorage.setItem('viewedUpdateIds', JSON.stringify(this.state.viewedUpdateIds))
      }
    })
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
            {this.hasUnviewedUpdates && (
              <span className="update-log__icon-label"></span>
            )}
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
        <div
          className="update-log__list"
          id="list"
          style={this.updateLogListStyle}>
          {this.state.updates.map(update => {
            return (
              <div className="update-log__item" data-id={update.id} key={update.id}>
                <div className="update-log__item-title">
                  {!this.state.viewedUpdateIds.includes(update.id.toString()) && (
                    <span className="update-log__item-label"></span>
                  )}
                  [{update.version}] {update.title}
                </div>
                <div className="update-log__item-date">{this.formatDate(update.date)}</div>
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