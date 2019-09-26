import React, { Component } from "react"

class UploadImage extends Component {
  uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "bdayv",
        upload_preset: "eahzkyty",
        // multiple: false,
        showAdvancedOptions: false,
      },
      function(error, result) {
        console.log(result)
      }
    )
  }

  render() {
    return (
      <div id="photo">
        <button onClick={this.uploadWidget}>Upload Photo</button>
      </div>
    )
  }
}

export default UploadImage
