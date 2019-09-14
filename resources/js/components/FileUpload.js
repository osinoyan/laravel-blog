import React, { Component } from 'react';

export default class FileUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
    }

    this.onChange = this.onChange.bind(this)
    this.createImage = this.createImage.bind(this)
  }

  onFormSubmit(e) {
    this.fileUpload(this.state.image)
  }

  onChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
      return
    this.createImage(files[0])
  }

  createImage(file) {
    let reader = new FileReader()
    reader.onload = (e) => {
      this.setState({
        image: e.target.result
      })
      this.props.onFileChange(e.target.result)
    };
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange} />
      </div>
    )
  }
}