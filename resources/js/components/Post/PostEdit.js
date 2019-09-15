import React from 'react'
import axios from 'axios'
import FileUpload from '../FileUpload'

class PostEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      image: null,
      title: '',
      content: '',
      user_id: -1,
      users: [],
      auth: {},
      dirty: false,
    }
    this.onFileChange = this.onFileChange.bind(this)
  }

  componentDidMount() {
    const payload = {
      id: this.state.id,
    }
    axios.post('/post/find', payload).then(res => {
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
      this.setState({ users: res.data })
    }).catch(err => {
      console.log(err)
    })

    axios.post('/user/auth').then(res => {
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
    // new picture has been uploaded
    if (this.state.dirty){
      let payload = {
        image: this.state.image,
      }
      let filename = ''
      axios.post('/p/upload', payload).then(res => {
        alert('UPLOAD SUCCESSFULLY!')
        filename = res.data.filename

        payload = {
          id: this.state.id,
          title: this.state.title,
          content: this.state.content,
          image: filename,
        }
        console.log(payload)
        axios.post('/post/update', payload).then(res => {
          alert('UPDATED SUCCESSFULLY!')
          window.location = '/'
        }).catch(err => {
          console.log(err)
        })

      }).catch(err => {
        console.log(err)
      })
    // there is no picture uploaded
    } else {
      const payload = {
        id: this.state.id,
        title: this.state.title,
        content: this.state.content,
        image: 'NULL',
      }
      console.log(payload)
      axios.post('/post/update', payload).then(res => {
        alert('UPDATED SUCCESSFULLY!')
       window.location = '/'
      }).catch(err => {
        console.log(err)
      })
    }

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

  onFileChange(image) {
    this.setState({ 
      image,
      dirty: true,
    })
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
                <label htmlFor="formTitle">Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="formTitle" 
                  value={title}
                  onChange={e => this.handleChangeTitle(e)}></input>
              </div>

              <div className="form-group">
                <label htmlFor="formImage">Picture</label>
                <FileUpload onFileChange={this.onFileChange} />
              </div>

              <div className="form-group">
                <label htmlFor="formContent">content</label>
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