import React from 'react'
import CommentCreate from './CommentCreate'
import CommentBox from './CommentBox'

class PostShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      image: null,
      title: '',
      content: '',
      user_id: -1,
      users: [],
      auth: {},
      comments: [],
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

    this.fetchComments()
  }

  fetchComments() {
    const payload = { 
      id: this.state.id,
    }
    setInterval(
      () => {
        axios.post('/comment/get', payload).then(res => {
          console.log('--------- COMMTENT/GET ---------------')
          // console.log(res)
          this.setState({ comments: res.data })
        }).catch(err => {
          console.log(err)
        })
      }, 500)

  }

  // check if this post is my post
  checkIfMyPost() {
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
      id: this.state.id
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
    window.location = '/w/post/edit/' + this.state.id
  }

  render() {
    const { id, image, title, user_id, content, comments, auth } = this.state
    return (
      <div>
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
          {image !== null 
            ? 
            <img className="card-img-top" src={'/images/post/' + image} alt="Card image cap" />
            :
            ''
          }
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
        <div>
          <CommentList comments={comments} auth={auth} user_id={user_id}/>
          <CommentCreate post_id={id}/>
        </div>
      </div>
    )
  }
}


export default PostShow

const CommentList = (props) => {
  return (
    <div>
      <h2 className='mt-2 mt-5'>Comments</h2>
      { props.comments.map( (item, i) => 
          <div key={i}>
            <CommentBox
              auth={props.auth}
              user_id={props.user_id}
              comment_id={item.comment_id}
              name={item.name} 
              message={item.message} 
              updatedAt={item.updated_at}/>
          </div>
      )}
    </div>
  )
}

// const CommentBox = (props) => {
//   const {name, message, updatedAt} = props
//   return (
//     <div>
//       <div className="card my-4">
//         {/* {this.checkIfMyPost()
//           ?
//           <div className="mb-3">
//             <button
//               type="button"
//               className="btn btn-primary m-2"
//               onClick={() => this.handleEdit()}>
//               Edit
//               </button>
//             <button
//               type="button"
//               className="btn btn-danger m-2"
//               onClick={() => this.handleDelete()}>
//               delete
//               </button>
//           </div>
//           :
//           ''
//         } */}
//         <div className="card-header">{name} <br /> {updatedAt}</div>
//         <div className="card-body">
//           <p className="card-text">{message}</p>
//         </div>
//       </div>
//     </div>
//   )
// }