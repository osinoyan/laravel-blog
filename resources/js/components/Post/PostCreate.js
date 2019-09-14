import React from 'react'
import axios from 'axios'
import FileUpload from '../FileUpload'

class PostCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      image: '',
    }

    this.onFileChange = this.onFileChange.bind(this)
  }

  handleSubmit(){
    let payload = {
      image: this.state.image,
    }
    let filename = ''
    axios.post('/p/upload', payload).then(res => {
      console.log('---------- P/UPLOAD -------------')
      console.log(res)
      alert('UPLOAD SUCCESSFULLY!')
      filename = res.data.filename

      payload = {
        title: this.state.title,
        content: this.state.content,
        image: filename,
      }
      console.log(payload)
      axios.post('/post/create', payload).then(res => {
        console.log('---------- POST/CREATE -------------')
        console.log(res)
        alert('CREATED SUCCESSFULLY!')
        window.location = '/'
      }).catch(err => {
        console.log(err)
      })

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

  onFileChange(image){
    this.setState({ image })
  }

  render () {
    const {title, content, image} = this.state
    return (
      <div>
        <h2 className='mt-2 mb-5'>Create a new post</h2>
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
            <FileUpload onFileChange={this.onFileChange}/>
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
    )
  }
}


export default PostCreate