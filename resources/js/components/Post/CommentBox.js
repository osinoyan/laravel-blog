import React from 'react'
import axios from 'axios'

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
      user_id: this.props.user_id,
      timezoneOffset: new Date().getTimezoneOffset(),
      now: new Date().getTime() + new Date().getTimezoneOffset() * 60000,
    }
  }

  componentDidMount() {
    setInterval(
      () => {
        this.setState({
          now: new Date().getTime() + this.state.timezoneOffset * 60000
        })
      }, 1000 * 10)
  }

  timeBeforeNow(t) {
    const { now } = this.state
    let then = Date.parse(t)
    let compareSec = (now - then) / 1000
    if (compareSec < 1) {
      return '剛剛'
    } else if (compareSec < 60) {
      return Math.floor(compareSec) + '秒前'
    } else if (compareSec < 60 * 60) {
      return Math.floor(compareSec / 60) + '分鐘前'
    } else if (compareSec < 60 * 24 * 60) {
      return Math.floor(compareSec / 60 / 60) + '小時前'
    } else if (compareSec < 60 * 24 * 60 * 2) {
      return '昨天'
    } else if (compareSec < 60 * 24 * 60 * 7) {
      return Math.floor(compareSec / 60 / 60 / 24) + '天前'
    } else if (compareSec < 60 * 24 * 60 * 7 * 4) {
      return Math.floor(compareSec / 60 / 60 / 24 / 7) + '週前'
    } else {
      return '很久以前'
    }
  }

  handleDelete() {
    const payload = {
      comment_id: this.props.comment_id
    }
    axios.post('/comment/delete', payload).then(res => {
      console.log('--------- COMMENT/DELETE ---------------')
      console.log(res)
      alert('YEEEEE')
    }).catch(err => {
      console.log(err)
    })
  }

  // check if this post is my post
  checkIfMyPost() {
    const { auth, user_id } = this.state
    return auth.id === user_id
  }

  render () {
    const { name, message, updatedAt } = this.props
    return (
      <div>
        <div className="card my-4">
          { this.checkIfMyPost()
            ?
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-danger m-2"
                onClick={() => this.handleDelete()}>
                delete
                </button>
            </div>
            :
            ''
          }
          <div className="card-header">{name} <br /> 🕒 {this.timeBeforeNow(updatedAt)}</div>
          <div className="card-body">
            <p className="card-text">{message}</p>
          </div>
        </div>
      </div>
    )
  }
}


export default CommentBox