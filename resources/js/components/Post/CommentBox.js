import React from 'react'
import axios from 'axios'

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
      user_id: this.props.user_id,
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
          <div className="card-header">{name} <br /> {updatedAt}</div>
          <div className="card-body">
            <p className="card-text">{message}</p>
          </div>
        </div>
      </div>
    )
  }
}


export default CommentBox