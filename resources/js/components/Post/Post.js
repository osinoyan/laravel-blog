import React from 'react'

class Post extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { id, image, title, user, content, updatedAt } = this.props
    return (
      <div className="card my-4">
        <div className="card-header">updated at: {updatedAt}</div>
        <img className="card-img-top" src={image} alt="Card image cap" />
        <div className="card-body">
          <h3 
            className="card-title" 
            onClick={ () => { window.location = '/w/post/show/' + id } }
            style={{cursor: 'pointer'}}
            >
            {title}</h3>
          <h6 className="card-title">
            <span className="border px-4">
              Author:  {user !== undefined ? user.name : 'user not found'}
            </span>
          </h6>
          <p className="card-text">{content}</p>
        </div>
      </div>
    )
  }
}


export default Post
