import React from 'react'

class PostShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      id: this.props.match.params.id
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
  checkIfMyPost(){
    const {auth, user_id} = this.state
    return auth.id === user_id
  }

  findUserNameById(id) {
    let user = {}
    user = this.state.users.find(u => u.id === id)
    if (typeof user === 'undefined') return ''
    return user.name
  }
  
  handleDelete() {
    const payload = {
      id: this.props.match.params.id
    }
    axios.post('/post/delete', payload).then(res => {
      console.log('--------- POST/DELETE ---------------')
      console.log(res)
      alert('YEEEEE')
      window.location = '/'
    }).catch(err => {
      console.log(err)
    })
  }

  handleEdit(){

  }

  render() {
    const { image, title, user_id, content } = this.state
    return (
      <div className="card my-4">
        {this.checkIfMyPost()
          ? 
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => this.handleEdit()}>
              Edit
            </button>
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
        <img className="card-img-top" src={image} alt="Card image cap" />
        <div className="card-body">
          <h1 className="card-title">{title}</h1>
          <h5 className="card-title">
            <span className="border px-4">
              Author:  {this.findUserNameById(user_id)}
            </span>
          </h5>
          <p className="card-text">{content}</p>
        </div>
      </div>
    )
  }
}


export default PostShow
