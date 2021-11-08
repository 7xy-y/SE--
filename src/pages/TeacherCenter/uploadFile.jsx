import React, { Component } from 'react'
import { Image,Input, Select, Form, Button, AutoComplete } from 'antd'
import Paragraph from 'antd/lib/skeleton/Paragraph';
import axios from 'axios';
import imageToBase64 from 'image-to-base64'
import saveAs from 'file-saver'
import { handleMediaFile } from 'image-process'
//import {frameExtractor} from 'frame-extractor'
//import {extractFrames} from 'ffmpeg-extract-frames'

const extractFrames = require('ffmpeg-extract-frames')
const path = require('path')
const { Option } = Select;
const { TextArea } = Input;

const ffmpeg = require('fluent-ffmpeg')


var code;
var msg;
var offsets;



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

export default class UploadFile extends Component {
    state = {
        name: '',
        tag:'',
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
    }

    sendup1=()=>{
      this.setState({bpath:this.state.img1.props.src})
      console.log('img1 here')
    }

    sendup2=()=>{
      this.setState({bpath:this.state.img2.props.src})
      console.log('img2 here')
    }

    sendup3=()=>{
      this.setState({bpath:this.state.img3.props.src})
      console.log('img3 here')
    }

    sendup4=()=>{
      this.setState({bpath:this.state.img4.props.src})
      console.log('img4 here',this.state.img4.props.src)
    }

    sendup5=()=>{
      this.setState({bpath:this.state.img5.props.src})
      console.log('img5 here')
    }

    changeTime = (e) =>{

        this.setState({startTime:e.target.value})

        let sdata,img,preview,file = this.state.data
        /*处理预览图1 */
        const self=this;
        options.currentTime=Number(e.target.value)
        console.log('optison1',options)
        handleMediaFile(file, options)
        .then(res => {

         // src = URL.createObjectURL(file)
          //preview = <video src={src} autoPlay loop controls />
          
          sdata=res.base64
          const res1 = res.url
          img = <Image width={200} src={res.url} onClick={this.sendup1}/>
          self.setState({
              bpath:sdata,data:file,showpreview:true,img1:img
          })
          console.log('img1',self.state.img1)
            /*处理预览图2*/
             options.currentTime=Number(self.state.startTime)+Number(self.state.frameStep)
             console.log('options2',options)
             handleMediaFile(file, options)
             .then(res => {
             sdata=res.base64
             img = <Image width={200} src={res.url} onClick={this.sendup2}/>
             self.setState({
                  bpath:sdata,data:file,showpreview:true,img2:img
             })
             console.log('img2',self.state.img2)
                 /*处理预览图3*/
                 options.currentTime=Number(self.state.startTime)+2*Number(self.state.frameStep)
                 console.log('options3',options)
                 handleMediaFile(file, options)
                 .then(res => {

                 sdata=res.base64
                 img = <Image width={200} src={res.url} onClick={this.sendup3}/>
                 self.setState({
                     bpath:sdata,data:file,showpreview:true,img3:img
                 })
                 console.log('img3',self.state.img3)
                     /*处理预览图4*/
                     options.currentTime=Number(self.state.startTime)+3*Number(self.state.frameStep)
                     console.log('options4',options)
                     handleMediaFile(file, options)
                     .then(res => {

                     sdata=res.base64
                     img = <Image width={200} src={res.url} onClick={this.sendup4}/>
                       self.setState({
                            bpath:sdata,data:file,showpreview:true,img4:img
                       })
                       console.log('img4',self.state.img4)
                               /*处理预览图5*/
                               options.currentTime=Number(self.state.startTime)+4*Number(self.state.frameStep)
                               console.log('optison5',options)
                               handleMediaFile(file, options)
                               .then(res => {

                               sdata=res.base64
                                img = <Image width={200} src={res.url} onClick={this.sendup5}/>
                                self.setState({
                                 bpath:sdata,data:file,showpreview:true,img5:img
                                })
                               console.log('img5',self.state.img5)
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

    changeFrame =(e)=>{
        console.log('frame')
        this.setState({frameStep:e.target.value})
        let sdata,preview,img,file=this.state.data
         /*处理预览图1 */
         const self=this;
         options.currentTime=Number(self.state.startTime)
         console.log('optison1',options)
         handleMediaFile(file, options)
         .then(res => {

          // src = URL.createObjectURL(file)
           //preview = <video src={src} autoPlay loop controls />
           
           sdata=res.base64
           img = <Image width={200} src={res.url} onClick={this.sendup1}/>
           self.setState({
               bpath:sdata,data:file,showpreview:true,img1:img
           })
           console.log('img1',self.state.img1)
             /*处理预览图2*/
              options.currentTime=Number(self.state.startTime)+Number(self.state.frameStep)
              console.log('options2',options)
              handleMediaFile(file, options)
              .then(res => {
              sdata=res.base64
              img = <Image width={200} src={res.url}  onClick={this.sendup2}/>
              self.setState({
                   bpath:sdata,data:file,showpreview:true,img2:img
              })
              console.log('img2',self.state.img2)
                  /*处理预览图3*/
                  options.currentTime=Number(self.state.startTime)+2*Number(self.state.frameStep)
                  console.log('options3',options)
                  handleMediaFile(file, options)
                  .then(res => {

                  sdata=res.base64
                  img = <Image width={200} src={res.url}  onClick={this.sendup3}/>
                  self.setState({
                      bpath:sdata,data:file,showpreview:true,img3:img
                  })
                  console.log('img3',self.state.img3)
                      /*处理预览图4*/
                      options.currentTime=Number(self.state.startTime)+3*Number(self.state.frameStep)
                      console.log('options4',options)
                      handleMediaFile(file, options)
                      .then(res => {

                      sdata=res.base64
                      img = <Image width={200} src={res.url}  onClick={this.sendup4}/>
                        self.setState({
                             bpath:sdata,data:file,showpreview:true,img4:img
                        })
                        console.log('img4',self.state.img4)
                                /*处理预览图5*/
                                options.currentTime=Number(self.state.startTime)+4*Number(self.state.frameStep)
                                console.log('optison5',options)
                                handleMediaFile(file, options)
                                .then(res => {

                                sdata=res.base64
                                 img = <Image width={200} src={res.url}  onClick={this.sendup5}/>
                                 self.setState({
                                  bpath:sdata,data:file,showpreview:true,img5:img
                                 })
                                console.log('img5',self.state.img5)
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

    changeTag = (e) => {
        this.setState({ tag: e.target.value })
    }

    changePath = async(e) => {
        console.log('path')
        const file = e.target.files[0];
        console.log('file',file)
        var sdata;

        handleMediaFile(file, options)
        .then(res => {
          console.log('res',res)
          sdata=res.base64
        })
        .catch (err => {
          console.error('err',err)
        })
        


        console.log('a',file)
        if (!file) {
            return;
        }
        

        
  
        let vsrc,src,img,preview,type=file.type;
        if (/^image\/\S+$/.test(type)) {


            /*传image64*/ 
            const self=this;
            const reader = new FileReader();
            self.setState({showpreview:false})
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                console.log('result1',e.target.result)
                src=e.target.result
                console.log('src',src)
                preview = <img src={e.target.result} alt='' />
                self.setState({ bpath: src, data: file, preview: preview })
            }




            


            /*传本地URL*/
            /*
            src = URL.createObjectURL(file)
            console.log('result2',src)
            preview = <img src={src} alt='' />
            */

        } else if (/^video\/\S+$/.test(type)) {

            /*传单张image64*/
            this.setState({showpreview:true})
            src = URL.createObjectURL(file)
            preview = <video src={src} autoPlay loop controls />
           /*处理预览图1 */
         const self=this;
         options.currentTime=Number(self.state.startTime)
         console.log('optison1',options)
         handleMediaFile(file, options)
         .then(res => {

          // src = URL.createObjectURL(file)
           //preview = <video src={src} autoPlay loop controls />
           
           sdata=res.base64
           let res1 = res.url
           img = <Image width={200} src={res.url}  onClick={this.sendup1}/>
           self.setState({
               bpath:sdata,data:file,showpreview:true,img1:img
           })
           console.log('img1',self.state.img1)
             /*处理预览图2*/
              options.currentTime=Number(self.state.startTime)+Number(self.state.frameStep)
              console.log('options2',options)
              handleMediaFile(file, options)
              .then(res => {
              sdata=res.base64
              let res2 =res.url
              img = <Image width={200} src={res.url}  onClick={this.sendup2}/>
              self.setState({
                   bpath:sdata,data:file,showpreview:true,img2:img
              })
              console.log('img2',self.state.img2)
                  /*处理预览图3*/
                  options.currentTime=Number(self.state.startTime)+2*Number(self.state.frameStep)
                  console.log('options3',options)
                  handleMediaFile(file, options)
                  .then(res => {

                  sdata=res.base64
                  img = <Image width={200} src={res.url} onClick={this.sendup3}/>
                  self.setState({
                      bpath:sdata,data:file,showpreview:true,img3:img
                  })
                  console.log('img3',self.state.img3)
                      /*处理预览图4*/
                      options.currentTime=Number(self.state.startTime)+3*Number(self.state.frameStep)
                      console.log('options4',options)
                      handleMediaFile(file, options)
                      .then(res => {

                      sdata=res.base64
                      img = <Image width={200} src={res.url} onClick={this.sendup4}/>
                        self.setState({
                             bpath:sdata,data:file,showpreview:true,img4:img
                        })
                        console.log('img4',self.state.img4)
                                /*处理预览图5*/
                                options.currentTime=Number(self.state.startTime)+4*Number(self.state.frameStep)
                                console.log('optison5',options)
                                handleMediaFile(file, options)
                                .then(res => {

                                sdata=res.base64
                                 img = <Image width={200} src={res.url} onClick={this.sendup5}/>
                                 self.setState({
                                  bpath:sdata,data:file,showpreview:true,img5:img
                                 })
                                console.log('img5',self.state.img5)
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
 

 

            /*传本地URL*/
            /*
            src = URL.createObjectURL(file)
            preview = <video src={src} autoPlay loop controls />
            */

        } else if (/^text\/\S+$/.test(type)) {
            const self = this;
            self.setState({showpreview:false})
            const reader = new FileReader();
            reader.readAsText(file);
            //注：onload是异步函数，此处需独立处理
            reader.onload = function (e) {
                preview = <textarea value={this.result} readOnly></textarea>
                self.setState({ bpath: src, data: file, preview: preview })

               
            }
            return;
        } 


        this.setState({ bpath: src, data: sdata, preview: preview})

        /*imageToBase64(src) // Image URL
    .then(
        (response) => {
            console.log('adaa',response); // "iVBORw0KGgoAAAANSwCAIA..."
        }
    )
    .catch(
        (error) => {
            console.log('asdasd',error); // Logs an error if there was one
        }
    )*/

        console.log(this.state)
    }


     upload = () => {

        console.log('send',this.state.bpath)
        const data = this.state.bpath;
        const stag=this.state.tag
        if (!data) {
            console.log('未选择文件');
            return;
        }
        if(!stag)
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
        form.append('Tag',stag);
        console.log('aa:',form);
        axios.post(url,transformFormData({
            File:data,
            Tag:stag,
        })).then((response) => {
            // get response
            console.log(response);
            code = response.data.code
            msg = response.data.msg
            if (code==200||code==202)
            {
                alert(msg)
                return;
            }
            else
            {
            alert(msg)
            return ;
            }
        })
        .catch(function(error) {
    alert('意外错误');

    })
};

    cancel = () => {
        this.props.closeOverlay();
    }

    render() {

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
      
        const { name, bpath, preview,img1,img2,img3,img4,img5 } = this.state;

        
        /*return (
            <div>
                <h4>上传文件</h4>
                <div className='row'>
                    <label>文件名称</label>
                    <Input type='text' placeholder='请输入文件名' value={name} onChange={this.changeName} />
                </div>
                <div className='row'>
                    <label>文件路径</label>
                    <div className='row-input'>
                        <span>{path ? path : '请选择文件路径'}</span>
                        <Input type='file' accept='video/*,image/*,text/plain' onChange={this.changePath} />
                    </div>
                </div>
                <div className='media'>
                    {preview}
                </div>
                <Button className='primary upload' onClick={this.upload}>上传</Button>
                <Button className='primary cancel' onClick={this.cancel}>取消</Button>
            </div>
        )*/
    return(
        <>
      <br/><br/><br/>
      <span style={{ color: '#000', fontSize: '1.9em' }}>上传文件</span>
      <br/><br/>
        <Form.Item label="标签名" {...formItemLayout}>
          <Input type='text' placeholder='请输入标签名' id="tagname" onChange={this.changeTag} />
        </Form.Item>

        <Form.Item label="文件路径" {...formItemLayout}>
          <Input type ='file' accept='video/*,image/*,text/plain' id="cname" onChange={this.changePath}></Input>
        </Form.Item>

        <Form.Item label="预览" {...formItemLayout}>
          {preview}
        </Form.Item>
        {
            this.state.showpreview&&<Form.Item label="选择时间戳" {...formItemLayout}>
                <Input type='text' placeholder='默认开始点为1' id="startime" onChange={this.changeTime} />
            </Form.Item>
        }

        {       
            this.state.showpreview&&<Form.Item label="选择截取间隔" {...formItemLayout}>
                <Input type='text' placeholder='默认间隔为1' id="framestep" onChange={this.changeFrame} />
            </Form.Item>
        }
        <br/>
        {this.state.showpreview&&<Image.PreviewGroup>
            {img1}
            {img2}
            {img3}
            {img4}
            {img5}
        </Image.PreviewGroup>
         }
        {this.state.showpreview&&<Form.Item label="当前选择" {...formItemLayout}>
          <Image
            src={this.state.bpath}
          />
        </Form.Item>
        }
        <Form.Item>
          <Button onClick={this.upload} style={{ width: 200,left:650}} l  type="primary" shape="round" size='large'>
            上传任务
          </Button>
        </Form.Item>

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </>

    )
    }
}