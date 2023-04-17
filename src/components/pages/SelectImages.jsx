import React, { useState, useMemo } from 'react';
import Dropzone, {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

function BookForm() {
  const [images, setImages] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {'image/*': []}});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);


  
 

  // Handle the image upload
  const handleDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  // Render the form
  return (
    <form>
      <label>
        Book Title:
        <input type="text" name="title" />
      </label>
      <Dropzone onDrop={handleDrop}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps({style})}>
            <input {...getInputProps({ multiple: true })} />
            <p>Drag and drop some images here, or click to select images</p>
          </div>
        )}
      </Dropzone>
      {images.map((image, index) => (
        <div key={index}>
            {console.log(image.previewUrl)}
          <img src={image.previewUrl} alt={image.file.name} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default BookForm
