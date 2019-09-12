import React from 'react'
import axios from 'axios'

import Post from './Post'

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: 'ass',
          content: 'apple',
        },
        {
          title: 'bss',
          content: 'bpple',
        },
      ],
      users: [],
    }
  }
  
  componentDidMount(){
    axios.post('/post/getlist').then(res => {
      console.log('--------- POST/GETLIST ---------------')
      console.log(res)
      this.setState({ list: res.data })
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
  }

  findUserById(id) {
    let user = {}
    user = this.state.users.find(u => u.id === id)
    return user
  }

  render () {
    const { list } = this.state
    return (
      <div>
        <div className="mb-3">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => location.assign('/w/post/new') }>
            New Post
          </button>
        </div>
        <div>
        {
          list.map( (item, i) => (
            <Post
              key={i}
              title={item.title}
              content={item.content}
              image={item.image}
              user={this.findUserById(item.user_id)}
            />
          ))
        }
        </div>
      </div>
    )
  }
}


export default PostList