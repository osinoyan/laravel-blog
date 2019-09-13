import React from 'react'
import axios from 'axios'

class CommentCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
    }
  }

  handleSubmit(){
    const payload = {
      post_id: this.props.post_id,
      name: this.state.name,
      message: this.state.message,
    }
    console.log(payload)
    axios.post('/comment/create', payload).then(res => {
      console.log('---------- COMMENT/CREATE -------------')
      console.log(res)
      // alert('CREATED SUCCESSFULLY!')
      this.setState({
        name: '',
        message: '',
      })
    }).catch(err => {
      console.log(err)
    })
  }

  handleChangeName(e) {
    let name = this.state.name
    name = e.target.value
    this.setState({ name })
  }

  handleChangeMessage(e) {
    let message = this.state.message
    message = e.target.value
    this.setState({ message })
  }

  render () {
    const {name, message} = this.state
    return (
      <div>
        <h2 className='mt-2 mt-5'>New comment ...</h2>
        <form>
          <div className="form-group">
            <label for="formName">Name</label>
            <input
              type="text"
              className="form-control"
              id="formName"
              value={name}
              onChange={e => this.handleChangeName(e)}></input>
          </div>

          <div className="form-group">
            <label for="formMessage">message</label>
            <textarea 
              className="form-control" 
              id="formMessage" 
              rows="3" 
              value={message}
              onChange={e => this.handleChangeMessage(e)}></textarea>
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.handleSubmit()}>
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}


export default CommentCreate