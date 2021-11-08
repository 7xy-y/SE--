import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Upload, Button ,Form} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


var k=0
const transformFormData = (obj) => {
  let formData = new FormData()

  for (let k in obj) {
      formData.append(k, obj[k])
      console.log(k,obj[k])
  }

  console.log(formData)
  return formData
}



const props = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  previewFile(file) {
    
    // Your process logic. Here we just mock to the same file



    console.log("aaaaaaaaaaaaaaaa")
    //const file = e.target.files[k];
    console.log('Your upload file:', file);
    /*console.log('path',file)
    if (!file) {
        return;
    }
  
    let src,preview,type=file.type;
    if (/^image\/\S+$/.test(type)) {
  
        src = URL.createObjectURL(file)
        preview = <img src={src} alt='' />
  
    } else if (/^video\/\S+$/.test(type)) {
  
        src = URL.createObjectURL(file)
        preview = <video src={src} autoPlay loop controls />
  
    } else if (/^text\/\S+$/.test(type)) {
        const self = this;
        const reader = new FileReader();
        reader.readAsText(file);
        //注：onload是异步函数，此处需独立处理
        reader.onload = function (e) {
            preview = <textarea value={this.result} readOnly></textarea>
            //self.setState({ path: file.path, data: file, preview: preview })
        }
        return;
    } 
  
    console.log('aab',src)*/
  
    //this.setState({ path: src, data: file, preview: preview})









  
    axios.post('http://127.0.0.1:1060/api/auth/upload', transformFormData({
      File:file,
  }))
      .then(res => res.json())
      .then(({ thumbnail }) => thumbnail)
      .catch(function (error) {
        console.log(error.message);
      });
  }
};

export default class findcourse extends Component{


  
  state = {
    name: '',
    path: '',
    preview: null,
    data: null,
}

/*
changePath = (e) => {
  console.log("aaaaaaaaaaaaaaaa")
  const file = e.target.files[k];
  k++
  console.log('path',file)
  if (!file) {
      return;
  }

  let src,preview,type=file.type;
  if (/^image\/\S+$/.test(type)) {

      src = URL.createObjectURL(file)
      preview = <img src={src} alt='' />

  } else if (/^video\/\S+$/.test(type)) {

      src = URL.createObjectURL(file)
      preview = <video src={src} autoPlay loop controls />

  } else if (/^text\/\S+$/.test(type)) {
      const self = this;
      const reader = new FileReader();
      reader.readAsText(file);
      //注：onload是异步函数，此处需独立处理
      reader.onload = function (e) {
          preview = <textarea value={this.result} readOnly></textarea>
          self.setState({ path: file.path, data: file, preview: preview })
      }
      return;
  } 

  console.log('aab',src)

  this.setState({ path: src, data: file, preview: preview})
}*/




upload = () => {
        
  const data = this.state.path;
  if (!data) {
      console.log('未选择文件');
      return;
  }

  //此处的url应该是服务端提供的上传文件api 
  // const url = 'http://localhost:3000/api/upload';
  const url = 'http://127.0.0.1:1060/api/auth/upload';

  let form = new FormData();
  //此处的file字段由服务端的api决定，可以是其它值
  form.append('File', data);
  console.log('aa:',form);
  fetch(url, {
      method: 'POST',
      body: form
  }).then(res => {
      console.log(res)
  })

}


  
  render(){
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4, offset: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    const { name, path, preview } = this.state;
    return(
      <div>
      <Upload {...props}>
    <Button icon={<UploadOutlined />}  >Upload</Button>
     </Upload>
     <Button  onClick={this.upload} > Send </Button>



  </div>

  

  
    )
  }
}

/*ReactDOM.render(
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>,
  document.getElementById('container'),
);*/