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
export default class MyClass extends Component {

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

        console.log(params);
        axios.get('http://127.0.0.1:1060/api/auth/info',
        {params},
        {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }  
        }
        ).then(function (response) {
          _this.setState({
            isLoaded:true
          });
          var datalist=[];
          datalist=response.data.data.mission;
          console.log('datalist:',response)
          data.length=0;
          let temp=[...data];
          //let temp=[];
          for(const i in datalist){
              temp.push({
                  id:datalist[i].ID,
                  file:datalist[i].File,
                  tag:datalist[i].Tag
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

    getMID(record) {
        mid = record.id;
        mfile = record.file;
        mtag = record.tag;
        this.state.mission_ID = mid;
        this.state.file=mfile;
        this.state.tag=mtag;
        this.props.history.push({ pathname: '/TeacherCenter/EditLesson', state:
         { username: this.state.username, 
           psw: this.state.psw, 
           mission_ID: this.state.mission_id,
           file:this.state.file,
           tag:this.state.tag} 
        });
    }

    



    render() {
        const columns = [
            {
                title: '任务编号',
                dataIndex: 'id',
                key: 'id',
            },
            /*{ 
                title: '文件',
                dataIndex: 'file',
                key: 'file',
            },*/
            {
                title: '标签',
                dataIndex: 'tag',
                key: 'tag',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                       <Popconfirm
                            title="您确定要接受此任务吗"
                            onConfirm={this.getMID.bind(this, record)}
                            onCancel={cancel}
                            okText="是"
                            cancelText="否">
                            <a>
                                接受任务
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
                 <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <span style={{ color: 'black', fontSize: '2em' }}>领取一个任务</span>
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
