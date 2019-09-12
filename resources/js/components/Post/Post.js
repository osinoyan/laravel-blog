import React from 'react'

class Post extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { image, title, user, content } = this.props
    return (
      <div className="card my-4">
        <img className="card-img-top" src={image} alt="Card image cap" />
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <h6 className="card-title">
            <span class="border px-4">
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
