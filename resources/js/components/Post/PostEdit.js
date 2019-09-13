import React from 'react'
import axios from 'axios'

class PostEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      image: '',
      title: '',
      content: '',
      user_id: -1,
      users: [],
      auth: {},
    }
  }

  componentDidMount() {
    const payload = {
      id: this.state.id,
    }
    axios.post('/post/find', payload).then(res => {
      console.log('--------- POST/SHOW ---------------')
      console.log(res)
      this.setState({
        title: res.data.title,
        content: res.data.content,
        image: res.data.image,
        user_id: res.data.user_id,
      })
    }).catch(err => {
      console.log(err)
    })

    axios.post('/user/all').then(res => {
      console.log('--------- USER/ALL ---------------')
      console.log(res)
      this.setState({ users: res.data })
    }).catch(err => {
      console.log(err)
    })

    axios.post('/user/auth').then(res => {
      console.log('--------- USER/AUTH ---------------')
      console.log(res)
      this.setState({ auth: res.data })
    }).catch(err => {
      console.log(err)
    })
  }

  // check if this post is my post
  checkIfMyPost() {
    const { auth, user_id } = this.state
    return auth.id === user_id
  }

  handleSubmit(){
    const payload = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content,
    }
    console.log(payload)
    axios.post('/post/update', payload).then(res => {
      console.log('---------- POST/UPDATE -------------')
      console.log(res)
      alert('UPDATED SUCCESSFULLY!')
      window.location = '/'
    }).catch(err => {
      console.log(err)
    })
  }

  handleChangeContent(e){
    let content = this.state.content
    content = e.target.value
    this.setState({ content })
  }

  handleChangeTitle(e){
    let title = this.state.title
    title = e.target.value
    this.setState({ title })
  }

  render () {
    const {id, title, content} = this.state
    return (
      <div>
        {this.checkIfMyPost()
          ?
          <div>
            <h2 className='mt-2 mb-5'>Edit Post {'#' + id}</h2>
            <form>
              <div className="form-group">
                <label for="formTitle">Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="formTitle" 
                  value={title}
                  onChange={e => this.handleChangeTitle(e)}></input>
              </div>

              <div className="form-group">
                <label for="formContent">content</label>
                <textarea 
                  className="form-control" 
                  id="formContent" 
                  rows="20" 
                  value={content}
                  onChange={e => this.handleChangeContent(e)}></textarea>
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
          :
          ''
        }
      </div>
    )
  }
}


export default PostEdit