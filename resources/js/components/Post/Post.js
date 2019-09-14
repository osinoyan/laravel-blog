/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'

const _link = css`
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`
const _time = css`
  color: #b5babf;
`

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timezoneOffset: new Date().getTimezoneOffset(),
      now: new Date().getTime() + new Date().getTimezoneOffset() * 60000,
    }
  }

  componentDidMount(){
    setInterval(
      () => {
        this.setState({
          now: new Date().getTime() + this.state.timezoneOffset * 60000
        })
      }, 1000*10)
  }

  timeBeforeNow(t){
    const { now } = this.state
    let then = Date.parse(t)
    let compareSec = (now - then)/1000
    if (compareSec < 1) {
      return '剛剛'
    } else if (compareSec < 60) {
      return Math.floor(compareSec) + '秒前'
    } else if (compareSec < 60 * 60) {
      return Math.floor(compareSec / 60) + '分鐘前'
    } else if (compareSec < 60 * 24 * 60) {
      return Math.floor(compareSec / 60 / 60) + '小時前'
    } else if (compareSec < 60 * 24 * 60 * 2) {
      return '昨天'
    } else if (compareSec < 60 * 24 * 60 * 7) {
      return Math.floor(compareSec / 60 / 60 / 24) + '天前'
    } else if (compareSec < 60 * 24 * 60 * 7 * 4) {
      return Math.floor(compareSec / 60 / 60 / 24 / 7) + '週前'
    } else {
      return '很久以前'
    }
  }
  
  render() {
    const { id, image, title, user, content, updatedAt } = this.props

    return (
      <div className="card my-4">
        <div className="card-header" css={_time}>updated at: {this.timeBeforeNow(updatedAt)}</div>
        <img 
          className="card-img-top"
          css={_link}
          onClick={() => { window.location = '/w/post/show/' + id }}
          src={'/images/post/' + image} 
          alt="Card image cap" />
        <div className="card-body">
          <h3 
            className="card-title" 
            onClick={ () => { window.location = '/w/post/show/' + id } }
            css={_link}
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
