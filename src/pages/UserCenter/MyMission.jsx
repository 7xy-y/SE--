import React, { Component } from 'react'
import { Table, Space } from 'antd';
import { Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom'
import axios from 'axios'



var data = [
    
];
var mid;
var mfile;
var mtag;
var FileSaver = require('file-saver');
const transformFormData = (obj) => {
    let formData = new FormData()
  
    for (let k in obj) {
        formData.append(k, obj[k])
        console.log(k,obj[k])
    }
  
    console.log(formData)
    return formData
  }

export default class MyMission extends Component {

    constructor(){
        super()
        this.state={
            username:"",
            psw:"",
            mission_ID:"",
            file:"",
            tag:""

        }

        console.log(this.props)
    }
    componentWillMount(){
        var id = this.props.location.state.username;
        var passw = this.props.location.state.psw;
       console.log(this.props)
        this.setState({
            username: id,
            psw: passw,
            mission_ID: '',
            file:''
        });

        const _this=this;

        const params={
        }

        console.log(this.props.location.state.username);
        let url='http://127.0.0.1:1060/api/auth/myinfo'
        axios.post(url,transformFormData({
            Username : this.props.location.state.username
        })).then(function (response) {
          _this.setState({
            isLoaded:true
          });
          var datalist=[];
          console.log('response',response)
          datalist=response.data.data.mission_tag;
          console.log('datalist:',response)
          data.length=0;
          let temp=[...data];
          //let temp=[];
          for(const i in datalist){
              temp.push({
                  mission_ID:datalist[i].Mission_ID,
                  publisher:datalist[i].Publisher,
                  solver:datalist[i].Solver,
                  tag:datalist[i].Tag,
                  tag_name: datalist[i].What
              })
          }

          _this.setState({
              missions:temp,
              curSelectMission:temp
          })
          console.log(_this.state.curSelectMission);
        })
        .catch(function (error) {
          console.log(error);
          _this.setState({
            isLoaded:false,
            error:error
          })
        })
    
    }

    getout(record) {
        mid = record.id;
        mfile = record.file;
        mtag = record.tag;
        let blob = new Blob([record.tag],{type:"text/plain;charset=utf-8"})
        FileSaver.saveAs(blob,"out.json")
    }

    



    render() {
        const columns = [
            {
                title: '任务编号',
                dataIndex: 'mission_ID',
                key: 'mission_ID',
            },
            { 
                title: '标签名',
                dataIndex: 'tag_name',
                key: 'tag_name',
            },
            {
                title:'发起人',
                dataIndex:'publisher',
                key:'publisher'
            },
            {
                title:'领取人',
                dataIndex:'solver',
                key:'solver'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                       <Popconfirm
                            title="您确定要导出此文件吗"
                            onConfirm={this.getout.bind(this, record)}
                            onCancel={cancel}
                            okText="是"
                            cancelText="否">
                            <a>
                                导出文件
                            </a>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];

        if(!this.state.isLoaded)
        {
            return <div>Loading</div>
        }
        else
        {
        return (
            <div>
                 <br /><br /><br /><br />
                <span style={{ color: 'black', fontSize: '2em' }}>我的任务</span>
                <Table columns={columns} dataSource={this.state.missions} />
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br />
            </div>
        )
        }
    }
}



function confirm(e) {
    console.log(e);
    message.success('操作确认');
}

function cancel(e) {
    console.log(e);
    message.error('操作取消');
}
