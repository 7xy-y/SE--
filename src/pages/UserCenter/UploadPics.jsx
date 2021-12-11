import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Upload, Button ,Form,Input,message} from 'antd';
import { UploadOutlined,InboxOutlined } from '@ant-design/icons';
import { handleMediaFile } from 'image-process';
import axios from 'axios';

const {Dragger} = Upload


var code;
var msg;
var k=0;
var dd;

var options = {
  mimeType: 'image/jpeg',
  width: 600,
  height: 400,
  quality: 1,
  currentTime:1,
}

const transformFormData = (obj) => {
  let formData = new FormData()

  for (let k in obj) {
      formData.append(k, obj[k])
      console.log(k,obj[k])
  }

  console.log(formData)
  return formData
}





export default class findcourse extends Component{

  constructor(){
    super()
    this.state={
      
      name: '',
      tag:'人',
      bpath: '',
      preview: null,
      img1:null,
      img2:null,
      img3:null,
      img4:null,
      img5:null,
      data: null,
      showpreview:false,
      startTime:'1',
      frameStep:'1',
      fileList:[],
      uploading:false,
      username:""
    }

    console.log(this.props)
}
  componentWillMount(){
    var id = this.props.location.state.username;
    var passw = this.props.location.state.psw;
   console.log(this.props)
    this.setState({
        username: id,
    });

    console.log(this.props)
}



previewFile = (e) => {
    
  // Your process logic. Here we just mock to the same file

  const{status}=e.file
  const{tag}=this.state.tag
  if (status !== 'uploading') {
    console.log(e.file, e.fileList);
  }
  if(status=='done'&&tag!=''){
  message.success(`${e.file.name} file uploaded successfully.`);
  console.log("aaaaaaaaaaaaaaaa")
  //const file = e.target.files[k];
  const file=e.file
  console.log('e',e)
  console.log('Your upload file:', e.file);
  if (!file) {
      return;
  }

  let src,preview,type=file.type;
  console.log('type',type)
  var sdata
  if (/^image\/\S+$/.test(type)) {
    const self=this;
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = function(e) {
        console.log('result1',e.target.result)
        src=e.target.result
        console.log('src',src)
        self.setState({ data: src})
        self.upload()
    }

  } else if (/^video\/\S+$/.test(type)) {

      const self=this
      var videolength
      options.currentTime=1
       handleMediaFile(file.originFileObj, options)
         .then(res => {

          // src = URL.createObjectURL(file)
           //preview = <video src={src} autoPlay loop controls />
           videolength=res.duration
           sdata=res.base64
           self.setState({
               data:sdata
           })
           self.upload()
             /*处理预览图2*/
              options.currentTime=Number(videolength)/4
              handleMediaFile(file.originFileObj, options)
              .then(res => {
              sdata=res.base64
              videolength=res.duration
              self.setState({
                   data:sdata
              })
              self.upload()
                  /*处理预览图3*/
                  options.currentTime=Number(videolength)/2
                  console.log('options3',options)
                  handleMediaFile(file.originFileObj, options)
                  .then(res => {
                  sdata=res.base64
                  videolength=res.duration
                  self.setState({
                      data:sdata
                  })
                  self.upload()
                      /*处理预览图4*/
                      options.currentTime=3*Number(videolength)/4
                      console.log('options4',options)
                      handleMediaFile(file.originFileObj, options)
                      .then(res => {
                      videolength=res.duration
                      sdata=res.base64
                        self.setState({
                             data:sdata
                        })
                        self.upload()
                                /*处理预览图5*/
                                options.currentTime=Number(videolength)-2
                                console.log('optison5',options)
                                handleMediaFile(file.originFileObj, options)
                                .then(res => {
                                videolength=res.duration
                                sdata=res.base64
                                 self.setState({
                                  data:sdata
                                 })
                                 self.upload()
                                console.log('herrrrre',this.state)
                                })
                                .catch (err => {
                                console.error('err',err)
                               })

                                   })
                             .catch (err => {
                            console.error('err',err)
                              })
                          })
                .catch (err => {
                  console.error('err',err)
                })
            })
            .catch (err => {
              console.error('err',err)
            })
         })
         .catch (err => {
           console.error('err',err)
         })

  } 
  }
  else if (status === 'error'&&tag!='') {
    message.error(`${e.file.name} file too large, try another video`);
  }
  


  //this.setState({ path: src, data: file, preview: preview})

  

}
upload=()=>{

const data=this.state.data
const tag=this.state.tag
console.log('send',data)
if (!data) {
    console.log('未选择文件');
    return;
}
if(!tag)
{
    alert("请输入要标记的标签")
    return;
}

//此处的url应该是服务端提供的上传文件api 
// const url = 'http://localhost:3000/api/upload';
const url = 'http://127.0.0.1:1060/api/auth/upload';

let form = new FormData();
//此处的file字段由服务端的api决定，可以是其它值
form.append('File', data);
form.append('Tag',tag);
form.append('Username',this.state.username)
console.log('aa:',form);
console.log('post')
axios.post(url,transformFormData({
    File:data,
    Tag:tag,
    Username:this.state.username
})).then((response) => {
    // get response
    console.log(response);
    code = response.data.code
    msg = response.data.msg
    if (code==200||code==202)
    {
        return;
    }
    else
    {
    return ;
    }
})
.catch(function(error) {
alert('意外错误');

})
}

changeTag = (e) => {
  this.state.tag=e.target.value
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
    const props={
      name:'file',
      action: 'http://127.0.0.1:1060/api/auth/test',
      listType: 'picture',
      multiple:'true',
      onChange: this.previewFile,
      onDrop(e){
        console.log('Dropped files', e.dataTransfer.files);
      }
    };

    const { name, bpath, preview } = this.state;
    return(
      <div>
      <Form.Item label="标签名" {...formItemLayout}>
        <Input type='text' placeholder='请输入标签名 默认标注"人"' id="tagname" onChange={this.changeTag} />
      </Form.Item>
      <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p>
  </Dragger>




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